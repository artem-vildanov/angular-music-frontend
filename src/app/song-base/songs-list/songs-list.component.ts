import { Component, OnInit } from '@angular/core';
import { SongService } from '../../services/song.service';
import SongModel from '../../models/SongModel';

@Component({
    selector: 'app-songs-list',
    templateUrl: './songs-list.component.html',
    styleUrl: './songs-list.component.css'
})
export class SongsListComponent implements OnInit {
    private songs!: SongModel[];
    constructor(
        private readonly songService: SongService,
    ) {}

    ngOnInit(): void {
        this.songService
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
        this.songService.selectSong(songId);
    }
}
