import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import SongModel from "../../models/SongModel";

@Injectable({
    providedIn: 'root'
})
export class SongStateService {
    /**
     * Массив песен
     */
    private songsListSource = new BehaviorSubject<SongModel[]>([]);
    private _songsList$ = this.songsListSource.asObservable();
    set songsList(songs: SongModel[]) {
        this.songsListSource.next(songs);
    }

    get songsList$(): Observable<SongModel[]> {
        return this._songsList$;
    }

    /**
     * айди Айди выбранной песни
     */
    private selectedSongSource = new BehaviorSubject<string|null>(null);
    private _selectedSong$ = this.selectedSongSource.asObservable();
    set selectedSong(songId: string) {
        this.selectedSongSource.next(songId);
    }

    get selectedSong$(): Observable<string|null> {
        return this._selectedSong$;
    }
}
