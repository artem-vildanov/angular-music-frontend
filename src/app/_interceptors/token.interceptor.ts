import {HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest} from '@angular/common/http';
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.isExcludedRoute(req)) {
            return next.handle(req);
        }

        return next.handle(this.cloneRequest(req));
    }
    private isExcludedRoute = (request: HttpRequest<any>): boolean => {
        const excludedRoutes = [
            '/login',
            '/refresh',
        ];
        return excludedRoutes.some(
            url => request.url.includes(url)
        );
    }

    private cloneRequest = (request: HttpRequest<any>): HttpRequest<any> => {
        const token = this.getTokenFromStorage();
        const authHeader: object = {
            headers: request.headers.set('Authorization', `Bearer ${token}`)
        };
        return request.clone(authHeader);
    }

    private getTokenFromStorage(): string {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('no token in storage');
        return token;
    };
}
