import {Injectable} from '@angular/core';
import {environment} from "../../../enviroments/enviroment";
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {TokenModel} from "../../_models/TokenModel";

@Injectable({
    providedIn: 'root'
})
export class AuthApiService {
    private readonly baseUrl: string;
    constructor(private readonly http: HttpClient) {
        this.baseUrl = `${environment.apiUrl}/auth`;
    }

    public login(credentials: FormData): Observable<TokenModel> {
        const url = `${this.baseUrl}/login`;
        return this.http.post<TokenModel>(url, credentials);
    }

    public refreshToken(): Observable<TokenModel> {
        const url = `${this.baseUrl}/refresh`;
        return this.http.get<TokenModel>(url);
    }

    public refreshTokenWithAuthHeader(options: object): Observable<TokenModel> {
        const url = `${this.baseUrl}/refresh`;
        return this.http.get<TokenModel>(url, options);
    }
}
