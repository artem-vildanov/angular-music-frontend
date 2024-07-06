import { Component } from '@angular/core';
import {BaseSongPopup, SongForm} from "../base-song-popup/base-song-popup";
import {FormControl, FormGroup} from "@angular/forms";
import {SongApiService} from "../../../services/song/song-api.service";
import {entityNameValidator} from "../../../validators/entity-name.validator";
import {audioFileValidator} from "../../../validators/file.validator";
import {ICreateSongForm} from "../../../interfaces/forms/ICreateSongForm";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-create-song-popup',
  templateUrl: './create-song-popup.component.html',
  styleUrl: './create-song-popup.component.css'
})
export class CreateSongPopupComponent extends BaseSongPopup {
    constructor(
        private readonly songApiService: SongApiService,
        modalRef: MatDialogRef<CreateSongPopupComponent>,
    ) {
        super(modalRef);
    }

    protected buildForm(): FormGroup<SongForm> {
        const nameField = new FormControl<string>('', {
            validators: entityNameValidator(),
            updateOn: 'change',
            nonNullable: true
        });
        const audioField = new FormControl<File | null>(null, {
            validators: audioFileValidator(),
            updateOn: 'change',
            nonNullable: true
        })
        this._form = new FormGroup<ICreateSongForm>({
            name: nameField,
            audio: audioField
        }) as FormGroup<SongForm>;
        return this._form
    }

    protected submitForm(): void {
        const formData: FormData = this.buildFormData();
        this.songApiService
            .createSong(formData)
            .subscribe();
    }

    private buildFormData(): FormData {
        const songName = this._form.get('name')!.value as string;
        const songFile = this._form.get('audio')!.value!;
        const formData: FormData = new FormData();
        formData.append('name', songName);
        formData.append('audio', songFile);
        return formData;
    }
}
