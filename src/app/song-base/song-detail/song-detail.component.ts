import {Component, OnInit} from '@angular/core';
import ExtendedSongModel from "../../_models/ExtendedSongModel";
import {SongApiService} from "../../_services/song/song-api.service";
import SongDetailStatus from "../../_enums/SongDetailStatus";
import {SongStateService} from "../../_services/song/song-state.service";

@Component({
  selector: 'app-song-detail',
  templateUrl: './song-detail.component.html',
  styleUrl: './song-detail.component.css'
})
export class SongDetailComponent implements OnInit {
    private _song: ExtendedSongModel|null = null;
    public status: SongDetailStatus = SongDetailStatus.initial;

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
            this.status = SongDetailStatus.loading;
            this.songApiService
                .getSong(songId)
                .subscribe(this.setSong);
        }
    }

    private setSong = (newSong: ExtendedSongModel): void => {
        this._song = newSong;
        this.status = SongDetailStatus.loaded;
    }

    get song(): ExtendedSongModel|null {
        return this._song;
    }

    protected readonly SongDetailStatus = SongDetailStatus;
}
