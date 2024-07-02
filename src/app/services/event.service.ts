import { Injectable } from '@angular/core';
import {Observable, Subject} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class EventService {
    private songsListChangedSource = new Subject<void>();
    private _songsListChanged$ = this.songsListChangedSource.asObservable();
    public songsListChanged(): void {
        this.songsListChangedSource.next();
    }
    get songsListChanged$(): Observable<void> {
        return this._songsListChanged$;
    }
}
