import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler, HttpHeaders,
    HttpInterceptor,
    HttpRequest
} from '@angular/common/http';
import { catchError, switchMap } from "rxjs/operators";
import {Observable, throwError} from "rxjs";
import {Injectable} from "@angular/core";
import {AuthApiService} from "../_services/auth/auth-api.service";
import {TokenModel} from "../_models/TokenModel";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private readonly authService: AuthApiService) {}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const errorHandler = (error: HttpErrorResponse) =>
            this.catchTokenExpired(error, req, next);

        return next
            .handle(req)
            .pipe(catchError(errorHandler));
    }

    private catchTokenExpired(
        error: HttpErrorResponse,
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        if (this.tokenIsExpired(error)) {
            return this.refreshToken(req, next);
        }
        return throwError(() => error);
    }

    private tokenIsExpired(error: HttpErrorResponse): boolean {
        return (error.status === 403 && error.error.message === 'token expired');
    }

    private refreshToken(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        const retryRequestHandler = (responseToken: TokenModel) =>
            this.retryRequest(responseToken, request, next);

        const errorHandler = (refreshError: HttpErrorResponse) =>
            throwError(() => refreshError);

        return this.authService
            .refreshToken(this.getAuthHeader())
            .pipe(
                switchMap(retryRequestHandler),
                catchError(errorHandler)
            );
    }

    private getAuthHeader(): object {
        const token = localStorage.getItem('token')!;
        const authHeader = { Authorization: `Bearer ${token}` };
        return { headers: new HttpHeaders(authHeader) };
    }

    private retryRequest(
        responseToken: TokenModel,
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        this.setRefreshedToken(responseToken);
        const clonedRequest = req.clone({
            headers: req.headers.set('Authorization', `Bearer ${responseToken.token}`)
        });
        return next.handle(clonedRequest);
    }

    private setRefreshedToken = (responseToken: TokenModel): void => {
        localStorage.setItem('token', responseToken.token);
    }
}
