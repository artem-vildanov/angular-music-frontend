import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SongApiService} from "../../../services/song/song-api.service";
import LoadingStatus from "../../../enums/LoadingStatus";
import {map, Observable} from "rxjs";
import ExtendedSongModel from "../../../models/ExtendedSongModel";
import {SongStateService} from "../../../services/song/song-state.service";

@Component({
  selector: 'app-create-song',
  templateUrl: './create-song.component.html',
  styleUrl: './create-song.component.css'
})
export class CreateSongComponent {
    public createSongForm: FormGroup;
    public createRequestStatus: LoadingStatus = LoadingStatus.initial;
    constructor(
        private readonly formBuilder: FormBuilder,
        private readonly songApiService: SongApiService,
        private readonly songStateService: SongStateService
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

    private makeCreateSongForm(): FormGroup {
        const fields: object = { // сделать ICreateSongForm - интерфейс формы
            name: ['', Validators.required], // использовать FormControl
            music: [null, Validators.required]
        }; // сделать свой валидатор, чтобы имя с большой буквы и не менее 5 символов; песня не более 10 мб
        return this.formBuilder.group(fields);
    } // типы валидации, момент валидации onChange, blur, submit

    public onFileChange(event: Event): void {
        const target: HTMLInputElement = event.target as HTMLInputElement;
        const inputFile: File = target.files![0];
        inputFile && this.addSongToForm(inputFile);
    }

    private addSongToForm(file: File): void {
        const value: object = { music: file }
        this.createSongForm.patchValue(value); // setValue - вся форма изменение, pathValue - изменение одного поля
        this.createSongForm.get('music')?.updateValueAndValidity();
    }

    public onSubmit(): void {
        const formData: FormData = this.makeFormData();
        this.songApiService
            .createSong(formData) // сделать рут сервис для генерации ивента создания песни и получения по айди
            .subscribe(response => console.log(response));
            // .pipe(
            //     switchMap(this.getCreatedSong),
            //     map(), // мапить
            //     tap() // поместить в
            // )
    }

    private makeFormData(): FormData {
        const songName = this.createSongForm.get('name')?.value;
        const songFile = this.createSongForm.get('music')?.value;
        const formData: FormData = new FormData();
        formData.append('name', songName);
        formData.append('music', songFile);
        return formData;
    }

    private getCreatedSong = (songId: string): Observable<ExtendedSongModel> => {
        return this.songApiService.getSong(songId);
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
}
