import { Component } from '@angular/core';
import { BaseSongPopup } from "../base-song-popup/base-song-popup";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { SongApiService } from "../../../services/song/song-api.service";
import { entityNameValidator } from "../../../validators/entity-name.validator";
import { MatDialogRef } from "@angular/material/dialog";
import { SongStateService } from "../../../services/song/song-state.service";
import LoadingStatus from "../../../enums/LoadingStatus";
import { ISongForm } from '../../../interfaces/forms/ISongForm';

@Component({
    selector: 'app-create-song-popup',
    templateUrl: './create-song-popup.component.html',
    styleUrl: './create-song-popup.component.css'
})
export class CreateSongPopupComponent extends BaseSongPopup {
    constructor(
        private readonly songStateService: SongStateService,
        private readonly songApiService: SongApiService,
        modalRef: MatDialogRef<CreateSongPopupComponent>,
    ) {
        super(modalRef);
    }

    private setCreateSongStatusInitial = () => this.songStateService.createSongStatus = LoadingStatus.initial;

    protected submitForm(): void {
        this.songStateService.createSongStatus = LoadingStatus.loading;
        const formData: FormData = this.buildFormData();
        this.songApiService
            .createSong(formData)
            .subscribe(this.setCreateSongStatusInitial);
    }
}
