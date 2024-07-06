import {Component, OnInit} from '@angular/core';
import ExtendedSongModel from "../../../models/ExtendedSongModel";
import LoadingStatus from "../../../enums/LoadingStatus";
import {SongApiService} from "../../../services/song/song-api.service";
import {SongStateService} from "../../../services/song/song-state.service";
import {EditSongPopupComponent} from "../../popup/edit-song-popup/edit-song-popup.component";
import {MatDialog} from "@angular/material/dialog";
import {CreateSongPopupComponent} from "../../popup/create-song-popup/create-song-popup.component";

@Component({
  selector: 'app-song-detail',
  templateUrl: './song-detail.component.html',
  styleUrl: './song-detail.component.css'
})
export class SongDetailComponent implements OnInit {
    private _song: ExtendedSongModel|null = null;
    private _status: LoadingStatus = LoadingStatus.initial;

    constructor(
        private readonly songApiService: SongApiService,
        private readonly songStateService: SongStateService,
        private readonly matDialog: MatDialog,
    ) {}

    ngOnInit() {
    }

    private subscribeSelectedSong(): void {
        const showDetailSong = (songId: string|null): void => {
            if (songId) {
                this.loadDetailSong(songId);
            } else {
                this.unsetDetailSong();
            }
        }

        this.songStateService
            .selectedSongId$
            .subscribe(showDetailSong);
    }

    private subscribeSelectedSongStatus(): void {
        const setSelectedSongStatus = (status: LoadingStatus) => this._status = status;

    }

    private loadDetailSong(songId: string): void {
        const setSong = (newSong: ExtendedSongModel): void => {
            this._song = newSong;
            this.status = LoadingStatus.loaded;
        }
        this.status = LoadingStatus.loading;
        this.songApiService
            .getSong(songId)
            .subscribe(setSong);
    }

    private unsetDetailSong(): void {
        this.status = LoadingStatus.initial;
    }

    public openEditSongModal(): void {
        this.matDialog.open(
            EditSongPopupComponent,
            { data:  this._song!.id }
        );
    }

    public deleteSong(): void {
        this.songApiService
            .deleteSong(this._song!.id)
            .subscribe();
    }

    get song(): ExtendedSongModel|null {
        return this._song;
    }

    protected readonly SongDetailStatus = LoadingStatus;
}
