import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import SongModel from '../models/SongModel';
import ExtendedSongModel from "../models/ExtendedSongModel";

const SONG_API: string =
    'http://music.local/api/albums/667aebc1544ce27fc405e1a6/songs';
const TOKEN: string =
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjY2Nzk3YzljNTQ0Y2UyN2ZjNDA1ZTFhMyIsIm5hbWUiOiJhcnRlbSIsImVtYWlsIjoiYXJ0ZW1AbWFpbC5jb20iLCJhcnRpc3RJZCI6IjY2Nzk4NmQ1NTQ0Y2UyN2ZjNDA1ZTFhNCIsImNyZWF0ZWRBdCI6MTcxOTQ4NDUwMCwicmVmcmVzaGFibGVVbnRpbCI6MTcxOTU1NjUwMCwiZXhwaXJlZEF0IjoxNzE5NTIwNTAwfQ.B2Dw3omFU3PpsOcg3IYNx1xmXcYN50pMuJ333fbcHWM';

@Injectable()
export class SongService {
    private selectedSongSource = new BehaviorSubject<string|null>(null);
    selectedSong$ = this.selectedSongSource.asObservable();
    constructor(private readonly http: HttpClient) {}

    public selectSong(songId: string): void {
        this.selectedSongSource.next(songId);
    }

    public getSong(songId: string): Observable<ExtendedSongModel> {
        const options: object = this.getOptions();
        const url: string  = `${SONG_API}/${songId}`;
        return this.http.get<ExtendedSongModel>(url, options);
    }

    public getAlbumSongs(): Observable<SongModel[]> {
        const options: object = this.getOptions();
        const url: string = `${SONG_API}/album-songs`;
        return this.http.get<SongModel[]>(url, options);
    }

    public createSong(formData: FormData): Observable<string> {
        const url: string = `${SONG_API}/create-song`;
        return this.http.post<string>(url, formData, this.getOptions());
    }

    public updateSongName(songId: string, formData: FormData): Observable<void> {
        const url: string = `${SONG_API}/${songId}/update-song-name`;
        return this.http.post<void>(url, formData, this.getOptions());
    }

    public updateSongFile(songId: string, formData: FormData): Observable<void> {
        const url: string = `${SONG_API}/${songId}/update-song-audio`;
        return this.http.post<void>(url, formData, this.getOptions());
    }

    public deleteSong(songId: number): Observable<void> {
        const url: string = `${SONG_API}/${songId}/delete-song`;
        return this.http.delete<void>(url, this.getOptions());
    }

    private getOptions(): object {
        const headers = new HttpHeaders({
            Authorization: `Bearer ${TOKEN}`,
        });
        return { headers: headers };
    }
}
