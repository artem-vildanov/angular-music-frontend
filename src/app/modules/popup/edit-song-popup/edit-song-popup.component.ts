import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {BaseSongPopup, SongForm} from "../base-song-popup/base-song-popup";
import {SongApiService} from "../../../services/song/song-api.service";
import {EventService} from "../../../services/event.service";
import {concat, EMPTY, Observable, tap} from "rxjs";
import {FormControl, FormGroup} from "@angular/forms";
import {entityNameValidator} from "../../../validators/entity-name.validator";
import {audioFileValidator} from "../../../validators/file.validator";
import {IUpdateSongForm} from "../../../interfaces/forms/IUpdateSongForm";
import {SongStateService} from "../../../services/song/song-state.service";
import LoadingStatus from "../../../enums/LoadingStatus";

@Component({
  selector: 'app-edit-song-popup',
  templateUrl: './edit-song-popup.component.html',
  styleUrl: './edit-song-popup.component.css'
})
export class EditSongPopupComponent extends BaseSongPopup {
    constructor(
        modalRef: MatDialogRef<EditSongPopupComponent>,
        @Inject(MAT_DIALOG_DATA) private readonly songId: string,
        private readonly songApiService: SongApiService,
        private readonly eventService: EventService,
        private readonly songStateService: SongStateService,
    ) {
        super(modalRef);
    }

    protected override buildForm(): FormGroup<SongForm> {
        const nameField = new FormControl<string | null>(null, {
            validators: entityNameValidator(),
            updateOn: 'submit',
            nonNullable: false
        });

        const audioField = new FormControl<File | null>(null, {
            validators: audioFileValidator(),
            updateOn: 'submit',
            nonNullable: false
        })
        this._form = new FormGroup<IUpdateSongForm>({
            name: nameField,
            audio: audioField
        });
        return this._form;
    }

    protected override submitForm() {
        const notifyEventService = () => this.eventService.songsListChanged();
        const setSelectedSongInitialStatus = () => this.songStateService.selectedSongStatus = LoadingStatus.initial;
        this.songStateService.selectedSongStatus = LoadingStatus.loading;
        concat(
            this.tryUpdateName(this.songId),
            this.tryUpdateAudio(this.songId)
        )
            .pipe(
                tap(notifyEventService),
                tap(setSelectedSongInitialStatus)
            )
            .subscribe();
    }

    private tryUpdateName(songId: string): Observable<void> {
        const updateNameFormData = this.buildUpdateNameFormData();

        if (!updateNameFormData)
            return EMPTY;

        return this.songApiService.updateSongName(songId, updateNameFormData);
    }

    private tryUpdateAudio(songId: string): Observable<void> {
        const updateAudioFormData = this.buildUpdateAudioFormData();

        if (!updateAudioFormData)
            return EMPTY;

        return this.songApiService.updateSongFile(songId, updateAudioFormData);
    }

    private buildUpdateNameFormData(): FormData | null {
        const songName = this._form.get('name')!.value;

        if (!songName)
            return null;

        const formData = new FormData();
        formData.append('name', songName);
        return formData;
    }

    private buildUpdateAudioFormData(): FormData | null {
        const songFile = this._form.get('audio')!.value;

        if (!songFile)
            return null;

        const formData = new FormData();
        formData.append('audio', songFile);
        return formData;
    }

    public override get formIsInvalid(): boolean {
        return this.songNameIsInvalid
            || this.songFileIsInvalid
            || this._form.untouched;
    }

    public markFormAsTouched(): void {
        if (this._form.untouched)
            this._form.markAsTouched({onlySelf: true});
    }
}
