import {Component, computed, OnInit, signal, Signal} from '@angular/core';
import SongModel from "../../../models/SongModel";
import {SongStateService} from "../../../services/song/song-state.service";
import LoadingStatus from "../../../enums/LoadingStatus";
import {CreateSongPopupComponent} from "../../popup/create-song-popup/create-song-popup.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
    selector: 'app-songs-list',
    templateUrl: './songs-list.component.html',
    styleUrl: './songs-list.component.css'
})
export class SongsListComponent implements OnInit {
    private _songsList: Signal<SongModel[]> = signal([]);
    private _songsListStatus: Signal<LoadingStatus> = signal(LoadingStatus.initial);
    private _createSongStatus: Signal<LoadingStatus> = signal(LoadingStatus.initial);
    constructor(
        private readonly songStateService: SongStateService,
        private readonly matDialog: MatDialog
    ) {}

    ngOnInit(): void {
        this._songsList = this.songStateService.songsList;
        this._songsListStatus = this.songStateService.songsListStatus;
        this._createSongStatus = this.songStateService.createSongStatus;
        this.songStateService.loadSongsList();
    }

    public openCreateSongModal($event: Event): void {
        $event.preventDefault();
        this.matDialog.open(CreateSongPopupComponent);
    }

    get songsList(): SongModel[] {
        return this._songsList() as SongModel[];
    }

    get songsListStatus(): LoadingStatus {
        return this._songsListStatus();
    }

    get createSongStatus(): LoadingStatus {
        return this._createSongStatus();
    }

    readonly LoadingStatus = LoadingStatus;
}
