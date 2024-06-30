import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthApiService} from "../../_services/auth/auth-api.service";
import {TokenModel} from "../../_models/TokenModel";
import {Router} from "@angular/router";
import {AuthStateService} from "../../_services/auth/auth-state.service";
import {AccountModel} from "../../_models/AccountModel";
import {concatMap, Observable, tap} from "rxjs";
import LoadingStatus from "../../_enums/LoadingStatus";
import {AuthStateStatus} from "../../_enums/AuthStateStatus";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
    loginStatus: LoadingStatus;
    loginForm: FormGroup;
    constructor(
        private readonly formBuilder: FormBuilder,
        private readonly authApiService: AuthApiService,
        private readonly authStateService: AuthStateService,
        private readonly router: Router
    ) {
        this.loginForm = this.makeLoginForm();
        this.loginStatus = LoadingStatus.initial;
    }

    private makeLoginForm(): FormGroup {
        const fields: object = {
            email: ['', Validators.required],
            password: ['', Validators.required]
        };
        return this.formBuilder.group(fields);
    }

    public onSubmit(): void {

        const saveTokenToStorage = (token: TokenModel) => localStorage.setItem('token', token.token);
        const getAccountInfo = (): Observable<AccountModel> => this.authApiService.getAccountInfo();
        const setAccountState = (accountInfo: AccountModel) => {
            this.authStateService.accountInfo = accountInfo;
            this.authStateService.authState = AuthStateStatus.authenticated;
        }
        const redirectToHome = () => this.router.navigate(['/home']);

        const formData = this.makeFormData();
        this.loginStatus = LoadingStatus.loading;
        this.authApiService
            .login(formData)
            .pipe(
                tap(saveTokenToStorage),
                concatMap(getAccountInfo),
                tap(setAccountState),
            )
            .subscribe(redirectToHome);
    }

    private makeFormData(): FormData {
        const email = this.loginForm.get('email')?.value;
        const password = this.loginForm.get('password')?.value;
        const formData = new FormData();
        formData.append('email', email);
        formData.append('password', password);
        return formData;
    }

    public checkEmailInvalid(): boolean {
        const email = this.loginForm.get('email')!;
        const emailIsInvalid = email.invalid;
        const emailIsTouched = email.touched;
        return emailIsInvalid && emailIsTouched;
    }

    public checkPasswordInvalid(): boolean {
        const password = this.loginForm.get('password')!;
        const passwordIsInvalid = password.invalid;
        const passwordIsTouched = password.touched;
        return passwordIsInvalid && passwordIsTouched;
    }

    protected readonly LoadingStatus = LoadingStatus;
}
