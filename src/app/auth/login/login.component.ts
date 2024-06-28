import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthApiService} from "../../_services/auth/auth-api.service";
import {TokenModel} from "../../_models/TokenModel";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
    loginForm: FormGroup;
    constructor(
        private readonly formBuilder: FormBuilder,
        private readonly authService: AuthApiService
    ) {
        this.loginForm = this.makeLoginForm();
    }

    private makeLoginForm(): FormGroup {
        const fields: object = {
            email: ['', Validators.required],
            password: ['', Validators.required]
        };
        return this.formBuilder.group(fields);
    }

    public onSubmit(): void {
        const formData = this.makeFormData();
        this.authService
            .login(formData)
            .subscribe(this.setTokenToStorage);
    }

    private makeFormData(): FormData {
        const email = this.loginForm.get('email')?.value;
        const password = this.loginForm.get('password')?.value;
        const formData = new FormData();
        formData.append('email', email);
        formData.append('password', password);
        return formData;
    }

    private setTokenToStorage = (tokenModel: TokenModel): void => {
        localStorage.setItem('token', tokenModel.token);
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
}
