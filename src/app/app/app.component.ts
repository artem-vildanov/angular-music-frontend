import {Component, OnInit} from '@angular/core';
import {AuthApiService} from "../_services/auth/auth-api.service";
import {AccountModel} from "../_models/AccountModel";
import {AuthStateService} from "../_services/auth/auth-state.service";
import {AuthStateStatus} from "../_enums/AuthStateStatus";
import {Router} from "@angular/router";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
    private currentAccountInfo: AccountModel|null = null;

    constructor(
        private readonly authApiService: AuthApiService,
        private readonly authStateService: AuthStateService,
        private readonly router: Router
    ) {}

    get isAuthenticated(): boolean {
        return this.currentAccountInfo !== null;
    }

    ngOnInit(): void {
        this.subscribeAccountInfo();
        if (this.tokenExists()) {
            this.getAccountInfo();
        } else {
            this.authStateService.authState = AuthStateStatus.unauthorized;
        }
    }

    private subscribeAccountInfo(): void {
        const setAccountInfo = (accountInfo: AccountModel|null) => this.currentAccountInfo = accountInfo;
        this.authStateService.accountInfo$.subscribe(setAccountInfo);
    }

    private getAccountInfo(): void {
        const makeAuthenticated = (accountInfo: AccountModel) => {
            this.authStateService.accountInfo = accountInfo;
            this.authStateService.authState = AuthStateStatus.authenticated;
        }

        const makeUnauthorized = () => {
            this.authStateService.authState = AuthStateStatus.unauthorized;
            console.log('unauthorized')
        }

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
        this.setAccountStateUnauthorized();
        this.redirectToPublic();
    }

    private removeTokenFromStorage(): void {
        localStorage.removeItem('token');
    }

    private setAccountStateUnauthorized(): void {
        this.authStateService.authState = AuthStateStatus.unauthorized;
        this.authStateService.accountInfo = null;
    }

    private redirectToPublic(): void {
        this.router.navigate(['/public']);
    }
}
