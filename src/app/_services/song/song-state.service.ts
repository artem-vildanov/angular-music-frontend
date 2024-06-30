import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class SongStateService {
    private selectedSongSource = new BehaviorSubject<string|null>(null);
    private _selectedSong$ = this.selectedSongSource.asObservable();
    set selectedSong$(songId: string) {
        this.selectedSongSource.next(songId);
    }

    get selectedSong$(): Observable<string|null> {
        return this._selectedSong$;
    }
}
