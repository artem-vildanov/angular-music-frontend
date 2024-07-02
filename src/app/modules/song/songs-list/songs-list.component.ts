import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import SongModel from "../../../models/SongModel";
import {SongStateService} from "../../../services/song/song-state.service";
import LoadingStatus from "../../../enums/LoadingStatus";

@Component({
    selector: 'app-songs-list',
    templateUrl: './songs-list.component.html',
    styleUrl: './songs-list.component.css'
})
export class SongsListComponent implements OnInit {
    private _songs: SongModel[] = [];
    public _status: LoadingStatus = LoadingStatus.initial;
    constructor(private readonly songStateService: SongStateService) {}

    ngOnInit(): void {
        this.subscribeOnSongsList();
        this.subscribeOnSongsListStatus();
        this.songStateService.loadAlbumSongs();
    }

    private subscribeOnSongsList(): void {
        const setSongsList = (songs: SongModel[]) => this._songs = songs;
        this.songStateService
            .songsList$
            .subscribe(setSongsList);
    }

    private subscribeOnSongsListStatus(): void {
        const setSongsListStatus = (status: LoadingStatus) => this._status = status;
        this.songStateService
            .songsListStatus$
            .subscribe(setSongsListStatus);
    }

    get songs(): SongModel[] {
        return this._songs;
    }

    get status(): LoadingStatus {
        return this._status;
    }

    protected readonly LoadingStatus = LoadingStatus;
}
