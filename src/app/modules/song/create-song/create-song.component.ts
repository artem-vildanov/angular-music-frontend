import {Component} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {SongApiService} from "../../../services/song/song-api.service";
import LoadingStatus from "../../../enums/LoadingStatus";
import {ICreateSongForm} from "../../../interfaces/ICreateSongForm";
import {EntityNameValidator} from "../../../validators/entity-name.validator";
import {AudioFileValidator} from "../../../validators/audio-file.validator";

@Component({
  selector: 'app-create-song',
  templateUrl: './create-song.component.html',
  styleUrl: './create-song.component.css'
})
export class CreateSongComponent {
    public createSongForm: FormGroup;
    public _status = LoadingStatus.initial;
    constructor(
        private readonly songApiService: SongApiService,
        private readonly songNameValidator: EntityNameValidator,
        private readonly audioFileValidator: AudioFileValidator
    ) {
        this.createSongForm = this.makeCreateSongForm();
    }

    /**
    private _buildForm(): FormGroup<ILoginForm> {
        const form = new FormGroup<ILoginForm>({
            email: new FormControl<string>(this._route.snapshot.queryParams['email'], {
                validators: userRules.emailValidators,
                nonNullable: true
            }),
            password: new FormControl<string>('', {
                validators: userRules.passwordValidators,
                nonNullable: true
            })
        });
        */

    /**
    private _makeCreateSongForm(): FormGroup {
        const fields: object = { // сделать ICreateSongForm - интерфейс формы
            name: ['', Validators.required], // использовать FormControl
            music: [null, Validators.required]
        }; // сделать свой валидатор, чтобы имя с большой буквы и не менее 5 символов; песня не более 10 мб
        return this.formBuilder.group(fields);
    } // типы валидации, момент валидации onChange, blur, submit
    */

    private makeCreateSongForm(): FormGroup<ICreateSongForm> {
        const nameField = new FormControl<string>('', {
            validators: this.songNameValidator.getValidator(),
            updateOn: 'blur',
            nonNullable: true
        });
        const audioField = new FormControl<File|null>(null, {
            validators: this.audioFileValidator.getValidator(),
            updateOn: undefined,
            nonNullable: false
        })
        const form = new FormGroup<ICreateSongForm>({
            name: nameField,
            music: audioField
        });
        form.markAsPristine();
        form.markAsUntouched();
        return form;
    }

    public onFileChange(event: Event): void {
        const target: HTMLInputElement = event.target as HTMLInputElement;
        const inputFile: File = target.files![0];
        inputFile && this.addSongToForm(inputFile);
    }

    private addSongToForm(file: File): void {
        const value: object = { music: file }
        this.createSongForm.patchValue(value); // setValue - вся форма изменение, pathValue - изменение одного поля
        const audioControl = this.createSongForm.get('music')!;
        audioControl.markAsTouched();
        audioControl.updateValueAndValidity();
    }

    public onSubmit(): void {
        const setStatusLoaded = () => this._status = LoadingStatus.loaded;
        const formData: FormData = this.makeFormData();
        this._status = LoadingStatus.loading;
        this.songApiService
            .createSong(formData)
            .subscribe(setStatusLoaded);
    }

    private makeFormData(): FormData {
        const songName = this.createSongForm.get('name')?.value;
        const songFile = this.createSongForm.get('music')?.value;
        const formData: FormData = new FormData();
        formData.append('name', songName);
        formData.append('music', songFile);
        return formData;
    }

    public checkSongNameInvalid(): boolean {
        const nameIsInvalid: boolean = this.createSongForm.get('name')!.invalid;
        const nameIsTouched: boolean = this.createSongForm.get('name')!.touched;
        return nameIsInvalid && nameIsTouched;
    }

    public checkSongFileInvalid(): boolean {
        const fileIsInvalid: boolean = this.createSongForm.get('music')!.invalid;
        const fileIsTouched: boolean = this.createSongForm.get('music')!.touched;
        return fileIsInvalid && fileIsTouched;
    }

    get status(): LoadingStatus {
        return this._status;
    }

    public setStatusInitial($event: Event): void {
        $event.preventDefault();
        this._status = LoadingStatus.initial;
        this.clearForm();
    }

    private clearForm(): void {
        this.createSongForm.reset();
    }

    protected readonly LoadingStatus = LoadingStatus;
}
