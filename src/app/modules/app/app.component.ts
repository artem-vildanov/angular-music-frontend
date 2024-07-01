import {Component, OnInit} from '@angular/core';
import {AuthApiService} from "../../services/auth/auth-api.service";
import {AccountModel} from "../../models/AccountModel";
import {AuthStateService} from "../../services/auth/auth-state.service";
import {AuthStateStatus} from "../../enums/AuthStateStatus";
import {Router} from "@angular/router";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
    private currentAuthState: AuthStateStatus = AuthStateStatus.loading;

    constructor(
        private readonly authApiService: AuthApiService,
        private readonly authStateService: AuthStateService,
        private readonly router: Router
    ) {}

    get authStateIsAuthenticated(): boolean {
        return this.currentAuthState === AuthStateStatus.authenticated;
    }

    get authStateIsUnauthorized(): boolean {
        return this.currentAuthState === AuthStateStatus.unauthorized;
    }

    get authStateIsLoading(): boolean {
        return this.currentAuthState === AuthStateStatus.loading;
    }

    ngOnInit(): void {
        this.subscribeAuthState();
        if (this.tokenExists()) {
            this.authenticateAccount();
        } else {
            this.setAuthStateUnauthorized();
        }
    }

    private subscribeAuthState(): void {
        const setAuthState = (authState: AuthStateStatus) => this.currentAuthState = authState;
        this.authStateService
            .authState$
            .subscribe(setAuthState);
    }

    private authenticateAccount(): void {
        const makeAuthenticated = (accountInfo: AccountModel) => {
            this.authStateService.accountInfo = accountInfo;
            this.authStateService.authState = AuthStateStatus.authenticated;
        }

        const makeUnauthorized = () => this.setAuthStateUnauthorized();

        const handleAuthentication = {
            next: makeAuthenticated,
            error: makeUnauthorized
        }

        this.authApiService
            .getAccountInfo()
            .subscribe(handleAuthentication);
    }

    private tokenExists(): boolean {
        const token = localStorage.getItem('token');
        return token !== null;
    }

    public logout(): void {
        this.removeTokenFromStorage();
        this.setAuthStateUnauthorized();
        this.redirectToPublic();
    }

    private removeTokenFromStorage(): void {
        localStorage.removeItem('token');
    }

    private setAuthStateUnauthorized(): void {
        this.authStateService.authState = AuthStateStatus.unauthorized;
        this.authStateService.accountInfo = null;
    }

    private redirectToPublic(): void {
        this.router.navigate(['/public']);
    }
}
