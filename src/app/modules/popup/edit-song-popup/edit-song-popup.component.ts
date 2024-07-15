import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { BaseSongPopup } from "../base-song-popup/base-song-popup";
import { SongApiService } from "../../../services/song/song-api.service";
import { SongStateService } from "../../../services/song/song-state.service";
import LoadingStatus from "../../../enums/LoadingStatus";


@Component({
    selector: 'app-edit-song-popup',
    templateUrl: './edit-song-popup.component.html',
    styleUrl: './edit-song-popup.component.css'
})
export class EditSongPopupComponent extends BaseSongPopup {
    constructor(
        modalRef: MatDialogRef<EditSongPopupComponent>,
        @Inject(MAT_DIALOG_DATA) public readonly songData: {
            id: string,
            name: string,
            audioId: string
        },
        private readonly songApiService: SongApiService,
        private readonly songStateService: SongStateService,
    ) {
        super(modalRef);
    }

    private setSelectedSongInitialStatus = () => this.songStateService.selectedSongStatus = LoadingStatus.initial;

    protected override submitForm(): void {
        this.songStateService.selectedSongStatus = LoadingStatus.loading;
        const formData = this.buildFormData();
        this.songApiService
            .updateSong(formData)
            .subscribe(this.setSelectedSongInitialStatus);
    }
}
