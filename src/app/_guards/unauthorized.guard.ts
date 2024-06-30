import {CanActivateFn, Router} from '@angular/router';
import {Injectable} from "@angular/core";
import {BaseAuthGuard} from "./base-auth-guard.service";
import {AuthStateService} from "../_services/auth/auth-state.service";

/**
 * гард, который контролирует допуск к маршрутам не авторизированных пользователей
 */
@Injectable({
    providedIn: 'root'
})
export class UnauthorizedGuard extends BaseAuthGuard {
    constructor(
        authStateService: AuthStateService,
        private readonly router: Router
    ) {
        super(authStateService);
    }

    protected handleAuthenticatedState(): boolean {
        this.router.navigate(['/home']);
        return false;
    }

    protected handleUnauthorizedState(): boolean {
        return true;
    }
}
