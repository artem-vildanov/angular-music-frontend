import {Component, OnInit} from '@angular/core';
import ExtendedSongModel from "../../models/ExtendedSongModel";
import {SongApiService} from "../../services/song/song-api.service";
import {SongStateService} from "../../services/song/song-state.service";
import LoadingStatus from "../../enums/LoadingStatus";

@Component({
  selector: 'app-song-detail',
  templateUrl: './song-detail.component.html',
  styleUrl: './song-detail.component.css'
})
export class SongDetailComponent implements OnInit {
    private _song: ExtendedSongModel|null = null;
    public status: LoadingStatus = LoadingStatus.initial;

    constructor(
        private readonly songApiService: SongApiService,
        private readonly songStateService: SongStateService,
    ) {}

    ngOnInit() {
        this.songStateService
            .selectedSong$
            .subscribe(this.changeSong);
    }

    private changeSong = (songId: string|null): void => {
        if (songId) {
            this.status = LoadingStatus.loading;
            this.songApiService
                .getSong(songId)
                .subscribe(this.setSong);
        }
    }

    private setSong = (newSong: ExtendedSongModel): void => {
        this._song = newSong;
        this.status = LoadingStatus.loaded;
    }

    get song(): ExtendedSongModel|null {
        return this._song;
    }

    protected readonly SongDetailStatus = LoadingStatus;
}
