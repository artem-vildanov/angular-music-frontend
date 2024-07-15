import { environment } from '../../../enviroments/enviroment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class FileApiService {
    private baseUrl = `${environment.apiUrl}/albums/6693eff94c3c0ddd57066852/songs`;
    constructor(private readonly http: HttpClient) { }

    public saveFile(formData: FormData): Observable<string> {
        const url = `${this.baseUrl}/upload-audio`;
        return this.http.post<string>(url, formData);
    }
}
