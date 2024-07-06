import {IUpdateSongForm} from "../../../interfaces/forms/IUpdateSongForm";
import {ICreateSongForm} from "../../../interfaces/forms/ICreateSongForm";
import {FormControl, FormGroup} from "@angular/forms";
import {entityNameValidator} from "../../../validators/entity-name.validator";
import {audioFileValidator} from "../../../validators/file.validator";
import {MatDialogRef} from "@angular/material/dialog";
import {EditSongPopupComponent} from "../edit-song-popup/edit-song-popup.component";
import {CreateSongPopupComponent} from "../create-song-popup/create-song-popup.component";

export type SongForm = IUpdateSongForm | ICreateSongForm;

export abstract class BaseSongPopup {
    protected _form: FormGroup<SongForm>;
    protected constructor(private readonly modalRef: MatDialogRef<EditSongPopupComponent | CreateSongPopupComponent>) {
        this._form = this.buildForm();
    }

    protected abstract buildForm(): FormGroup<SongForm>;

    public onSubmit(): void {
        this.submitForm();
        this.closeModal();
    }

    protected abstract submitForm(): void;

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
        const nameIsInvalid: boolean = this._form.get('name')!.invalid;
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

    get form(): FormGroup<SongForm> {
        return this._form;
    }
}
