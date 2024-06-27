import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import SongModel from '../models/SongModel';

const SONG_API: string =
    'http://music.local/api/albums/667aebc1544ce27fc405e1a6/songs';
const TOKEN: string =
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjY2Nzk3YzljNTQ0Y2UyN2ZjNDA1ZTFhMyIsIm5hbWUiOiJhcnRlbSIsImVtYWlsIjoiYXJ0ZW1AbWFpbC5jb20iLCJhcnRpc3RJZCI6IjY2Nzk4NmQ1NTQ0Y2UyN2ZjNDA1ZTFhNCIsImNyZWF0ZWRBdCI6MTcxOTQ3MjYzMiwicmVmcmVzaGFibGVVbnRpbCI6MTcxOTQ3OTgzMiwiZXhwaXJlZEF0IjoxNzE5NDc2MjMyfQ.w9CTrKEJYyjePhWTYUa2AdY7o1GBpHgx4MsW0skVPQQ';

@Injectable()
export class SongService {
    constructor(private readonly http: HttpClient) {}

    public getAlbumSongs(): Observable<SongModel[]> {
        const options: object = this.getOptions();
        const url: string = `${SONG_API}/album-songs`;
        return this.http.get<SongModel[]>(url, options);
    }

    public createSong(formData: FormData): Observable<string> {
        const options: object = this.getOptions();
        const url: string = `${SONG_API}/create-song`;
        return this.http.post<string>(url, formData, options);
    }

    private getOptions(): object {
        const headers = new HttpHeaders({
            Authorization: `Bearer ${TOKEN}`,
        });
        return { headers: headers };
    }
}
