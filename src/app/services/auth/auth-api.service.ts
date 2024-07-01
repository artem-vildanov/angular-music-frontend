import {Injectable} from '@angular/core';
import {environment} from "../../../enviroments/enviroment";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, finalize, map, Observable, shareReplay, throwError} from "rxjs";
import {TokenModel} from "../../models/TokenModel";
import {AccountModel} from "../../models/AccountModel";

@Injectable({
    providedIn: 'root'
})
export class AuthApiService {
    private readonly baseUrl: string;

    /**
     * Флаговая переменная для предотвращения гонки запросов ради обновления токена.
     * Хранит observable первого отправленного запроса на обновление токена.
     * Остальные запросы на обновление будут подписываться на этот observable.
     */
    private refreshRequest$: Observable<TokenModel>|null = null;

    constructor(private readonly http: HttpClient) {
        this.baseUrl = `${environment.apiUrl}/auth`;
    }

    public login(credentials: FormData): Observable<TokenModel> {
        const url = `${this.baseUrl}/login`;
        return this.http.post<TokenModel>(url, credentials);
    }

    public refreshToken(options: object = {}): Observable<TokenModel> {
        if (this.refreshRequest$) {
            return this.refreshRequest$;
        }
        this.refreshRequest$ = this.createRefreshTokenRequest(options);
        return this.refreshRequest$;
    }

    private createRefreshTokenRequest(options: object): Observable<TokenModel> {
        const handleRefreshError = (error: HttpErrorResponse): Observable<never> => {
            this.refreshRequest$ = null;
            return throwError(() => error);
        }

        const resetRefreshRequest = () => this.refreshRequest$ = null;

        const url = `${this.baseUrl}/refresh`;
        return this.http
            .get<TokenModel>(url, options)
            .pipe(
                shareReplay(1),
                catchError(handleRefreshError),
                finalize(resetRefreshRequest)
            );
    }

    public getAccountInfo(): Observable<AccountModel> {
        const url = `${this.baseUrl}/me`;
        return this.http.get<AccountModel>(url);
    }
}
