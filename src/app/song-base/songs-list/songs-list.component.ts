import { Component, OnInit } from '@angular/core';
import { SongApiService } from '../../_services/song/song-api.service';
import SongModel from '../../_models/SongModel';
import {SongStateService} from "../../_services/song/song-state.service";

@Component({
    selector: 'app-songs-list',
    templateUrl: './songs-list.component.html',
    styleUrl: './songs-list.component.css'
})
export class SongsListComponent implements OnInit {
    private songs!: SongModel[];
    constructor(
        private readonly songApiService: SongApiService,
        private readonly songStateService: SongStateService
    ) {}

    ngOnInit(): void {
        this.songApiService
            .getAlbumSongs()
            .subscribe(this.setSongs);
    }

    private setSongs = (songs: SongModel[]): void => {
        this.songs = songs;
    };

    public getSongs(): SongModel[] {
        return this.songs;
        // return [];
    }

    public onSelectSong(songId: string): void {
        this.songStateService.selectSong(songId);
    }
}
