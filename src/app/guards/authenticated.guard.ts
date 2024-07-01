import {CanActivateFn, Router} from '@angular/router';
import {Injectable} from "@angular/core";
import {BaseAuthGuard} from "./base-auth-guard";
import {AuthStateService} from "../services/auth/auth-state.service";

/**
 * гард, который контролирует допуск к маршрутам авторизированных пользователей
 */
@Injectable({
    providedIn: 'root'
})
export class AuthenticatedGuard extends BaseAuthGuard {
    constructor(
        authStateService: AuthStateService,
        private readonly router: Router
    ) {
        super(authStateService);
    }
    protected handleAuthenticatedState(): boolean {
        return true;
    }

    protected handleUnauthorizedState(): boolean {
        this.router.navigate(['/auth']);
        return false;
    }
}

