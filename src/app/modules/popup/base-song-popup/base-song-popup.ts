import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { EditSongPopupComponent } from "../edit-song-popup/edit-song-popup.component";
import { CreateSongPopupComponent } from "../create-song-popup/create-song-popup.component";
import { ISongForm } from "../../../interfaces/forms/ISongForm";
import { entityNameValidator } from "../../../validators/entity-name.validator";


export abstract class BaseSongPopup {
    protected _form: FormGroup<ISongForm>;
    protected constructor(private readonly modalRef: MatDialogRef<EditSongPopupComponent | CreateSongPopupComponent>) {
        this._form = this.buildForm();
    }

    protected abstract submitForm(): void;

    private buildForm(): FormGroup<ISongForm> {
        this._form = new FormGroup<ISongForm>({
            name: new FormControl<string>('', {
                validators: entityNameValidator(),
                updateOn: 'change',
                nonNullable: true
            }),
            audioId: new FormControl<string>('', {
                validators: Validators.required,
                updateOn: 'change',
                nonNullable: true
            })
        }) as FormGroup<ISongForm>;
        return this._form
    }

    protected buildFormData(): FormData {
        const formData: FormData = new FormData();
        formData.append('name', this._form.value.name!);
        formData.append('audioId', this._form.value.audioId!);
        return formData;
    }

    public onSubmit(): void {
        this.submitForm();
        this.closeModal();
    }

    public onClose($event: Event): void {
        $event.preventDefault();
        this.closeModal();
    }

    protected closeModal(): void {
        this._form.reset();
        this.modalRef.close();
    }

    public onFileChange(event: Event): void {
        const target: HTMLInputElement = event.target as HTMLInputElement;
        const inputFile: File = target.files![0];
        inputFile && this.addSongToForm(inputFile);
    }

    private addSongToForm(file: File): void {
        const value: object = { audio: file }
        this._form.patchValue(value); // setValue - вся форма изменение, pathValue - изменение одного поля
        const audioControl = this._form.get('audio')!;
        audioControl.markAsTouched();
        audioControl.updateValueAndValidity();
    }

    get songNameIsInvalid(): boolean {
        const nameIsInvalid: boolean = this._form.controls.name!.invalid; // not nullable control
        const nameIsTouched: boolean = this._form.get('name')!.touched;
        return nameIsInvalid && nameIsTouched;
    }

    get songFileIsInvalid(): boolean {
        const fileIsInvalid: boolean = this._form.get('audio')!.invalid;
        const fileIsTouched: boolean = this._form.get('audio')!.touched;
        return fileIsInvalid && fileIsTouched;
    }

    get formIsInvalid(): boolean {
        return this._form.invalid;
    }

    get form(): FormGroup<ISongForm> {
        return this._form;
    }
}
