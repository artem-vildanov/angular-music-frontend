import {Component, OnInit} from '@angular/core';
import ExtendedSongModel from "../../models/ExtendedSongModel";
import {SongService} from "../../services/song.service";
import SongDetailStatus from "../../enums/SongDetailStatus";

@Component({
  selector: 'app-song-detail',
  templateUrl: './song-detail.component.html',
  styleUrl: './song-detail.component.css'
})
export class SongDetailComponent implements OnInit {
    private _song: ExtendedSongModel|null = null;
    public status: SongDetailStatus = SongDetailStatus.initial;

    constructor(private readonly songService: SongService) {}

    ngOnInit() {
        this.songService
            .selectedSong$
            .subscribe(this.changeSong);
    }

    private changeSong = (songId: string|null): void => {
        if (songId) {
            this.status = SongDetailStatus.loading;
            this.songService
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
