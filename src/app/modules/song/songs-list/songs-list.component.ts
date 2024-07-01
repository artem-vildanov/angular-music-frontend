import { Component, OnInit } from '@angular/core';
import { SongApiService } from '../../services/song/song-api.service';
import SongModel from '../../models/SongModel';
import {BehaviorSubject, Observable} from "rxjs";

@Component({
    selector: 'app-songs-list',
    templateUrl: './songs-list.component.html',
    styleUrl: './songs-list.component.css'
})
export class SongsListComponent implements OnInit {
    private _songs: BehaviorSubject<SongModel[]> = new BehaviorSubject<SongModel[]>([]);
    constructor(private readonly songApiService: SongApiService) {}

    ngOnInit(): void {
        this.songApiService.getAlbumSongs().subscribe(this._songs);
    }

    get songs(): Observable<SongModel[]> {
        return this._songs;
    }
}
