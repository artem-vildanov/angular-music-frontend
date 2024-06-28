import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class SongStateService {
    private selectedSongSource = new BehaviorSubject<string|null>(null);
    selectedSong$ = this.selectedSongSource.asObservable();
    public selectSong(songId: string): void {
        this.selectedSongSource.next(songId);
    }
}
