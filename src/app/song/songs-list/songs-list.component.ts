import { Component, OnInit } from '@angular/core';
import { SongApiService } from '../../_services/song/song-api.service';
import SongModel from '../../_models/SongModel';
import {SongStateService} from "../../_services/song/song-state.service";
import {BehaviorSubject, Observable} from "rxjs";
import {TokenModel} from "../../_models/TokenModel";

@Component({
    selector: 'app-songs-list',
    templateUrl: './songs-list.component.html',
    styleUrl: './songs-list.component.css'
})
export class SongsListComponent implements OnInit {
    private _songs!: Observable<SongModel[]>;
    constructor(
        private readonly songApiService: SongApiService,
        private readonly songStateService: SongStateService
    ) {}

    ngOnInit(): void {
        this._songs = this.songApiService.getAlbumSongs();
    }

    get songs(): Observable<SongModel[]> {
        return this._songs;
    }

    public onSelectSong(songId: string): void {
        this.songStateService.selectedSong$ = songId;
    }
}
