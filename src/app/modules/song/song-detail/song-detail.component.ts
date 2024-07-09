import {Component, effect, OnInit, Signal, signal} from '@angular/core';
import ExtendedSongModel from "../../../models/ExtendedSongModel";
import LoadingStatus from "../../../enums/LoadingStatus";
import {SongApiService} from "../../../services/song/song-api.service";
import {SongStateService} from "../../../services/song/song-state.service";
import {EditSongPopupComponent} from "../../popup/edit-song-popup/edit-song-popup.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-song-detail',
  templateUrl: './song-detail.component.html',
  styleUrl: './song-detail.component.css'
})
export class SongDetailComponent implements OnInit {
    private _selectedSong: Signal<ExtendedSongModel | null> = signal(null);
    private _selectedSongStatus: Signal<LoadingStatus> = signal(LoadingStatus.initial);

    constructor(
        private readonly songApiService: SongApiService,
        private readonly songStateService: SongStateService,
        private readonly matDialog: MatDialog,
    ) {}

    ngOnInit() {
        this._selectedSong = this.songStateService.selectedSong;
        this._selectedSongStatus = this.songStateService.selectedSongStatus;
    }

    public openEditSongModal(): void {
        this.matDialog.open(
            EditSongPopupComponent,
            { data:  this.song!.id }
        );
    }

    public deleteSong(): void {
        this.songStateService.setLoadingSelectedSongStatus();
        this.songApiService
            .deleteSong(this.song!.id)
            .subscribe(
                this.songStateService.setLoadedSelectedSongStatus
            );
    }

    get song(): ExtendedSongModel|null {
        return this._selectedSong();
    }

    get status(): LoadingStatus {
        return this._selectedSongStatus();
    }

    public readonly SongDetailStatus = LoadingStatus;
}
