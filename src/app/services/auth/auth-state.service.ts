import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {AccountModel} from "../../models/AccountModel";
import {AuthStateStatus} from "../../enums/AuthStateStatus";

@Injectable({
  providedIn: 'root'
})
export class AuthStateService {
    private accountInfoSource = new BehaviorSubject<AccountModel|null>(null);
    private authStateSource = new BehaviorSubject<AuthStateStatus>(AuthStateStatus.loading);

    /**
     * Состояние аутентификации
     */
    private _authState = this.authStateSource.asObservable();

    set authState(newState: AuthStateStatus) {
        this.authStateSource.next(newState);
    }

    get authState$(): Observable<AuthStateStatus> {
        return this._authState;
    }

    /**
     * Данные аккаунта текущего аутентифицированного пользователя
     */
    private _accountInfo = this.accountInfoSource.asObservable();

    get accountInfo$(): Observable<AccountModel|null> {
        return this._accountInfo;
    }

    set accountInfo(newState: AccountModel|null) {
        this.accountInfoSource.next(newState);
    }
}
