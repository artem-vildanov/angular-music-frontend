import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {BehaviorSubject, Observable, tap} from 'rxjs';
import SongModel from '../../models/SongModel';
import ExtendedSongModel from "../../models/ExtendedSongModel";
import {environment} from "../../../enviroments/enviroment";
import {EventService} from "../event.service";

@Injectable({
    providedIn: 'root'
})
export class SongApiService {
    private baseUrl = `${environment.apiUrl}/albums/667aebc1544ce27fc405e1a6/songs`;
    constructor(
        private readonly http: HttpClient,
        private readonly eventService: EventService
    ) {}

    private notifyEventService = () => this.eventService.songsListChanged();

    public getSong(songId: string): Observable<ExtendedSongModel> {
        const url: string  = `${this.baseUrl}/${songId}`;
        return this.http.get<ExtendedSongModel>(url);
    }

    public getAlbumSongs(): Observable<SongModel[]> {
        const url: string = `${this.baseUrl}/album-songs`;
        return this.http.get<SongModel[]>(url);
    }

    public createSong(formData: FormData): Observable<string> {
        const url: string = `${this.baseUrl}/create-song`;
        return this.http
            .post<string>(url, formData)
            .pipe(tap(this.notifyEventService));
    }

    public updateSongName(songId: string, formData: FormData): Observable<void> {
        const url: string = `${this.baseUrl}/${songId}/update-song-name`;
        return this.http.post<void>(url, formData);
    }

    public updateSongFile(songId: string, formData: FormData): Observable<void> {
        const url: string = `${this.baseUrl}/${songId}/update-song-audio`;
        return this.http.post<void>(url, formData);
    }

    public deleteSong(songId: number): Observable<void> {
        const url: string = `${this.baseUrl}/${songId}/delete-song`;
        return this.http.delete<void>(url);
    }
}
