import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AuthStateService} from "../_services/auth/auth-state.service";
import {AuthStateStatus} from "../_enums/AuthStateStatus";
import {filter, firstValueFrom, of, take} from "rxjs";
import {switchMap} from "rxjs/operators";

export abstract class BaseAuthGuard implements CanActivate {
    private currentAuthState!: AuthStateStatus;
    protected constructor (private authStateService: AuthStateService) {
        this.subscribeAuthStatus();
    }

    private subscribeAuthStatus(): void {
        const setAuthState = (newState: AuthStateStatus) => this.currentAuthState = newState;
        this.authStateService
            .authState$
            .subscribe(setAuthState);
    }

    canActivate(): boolean|Promise<boolean> {
        if (this.currentAuthState === AuthStateStatus.authenticated)
            return this.handleAuthenticatedState();

        if (this.currentAuthState === AuthStateStatus.unauthorized)
            return this.handleUnauthorizedState();

        if (this.currentAuthState === AuthStateStatus.loading)
            return this.handleLoadingState();

        throw Error('invalid authentication state');
    }

    protected abstract handleAuthenticatedState(): boolean;

    protected abstract handleUnauthorizedState(): boolean;

    private handleLoadingState(): Promise<boolean> {
        const exceptLoading = (state: AuthStateStatus) => state !== AuthStateStatus.loading;
        const determineAuthState = (state: AuthStateStatus) => {
            if (state === AuthStateStatus.authenticated)
                return of(this.handleAuthenticatedState());

            if (state === AuthStateStatus.unauthorized)
                return of(this.handleUnauthorizedState());

            throw Error('invalid authentication state')
        }

        const authStateObservable = this.authStateService
            .authState$
            .pipe(
                filter(exceptLoading),
                take(1),
                switchMap(determineAuthState)
            );

        return firstValueFrom(authStateObservable);
    }
}
