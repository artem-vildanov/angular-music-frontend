import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";
import {BaseValidator} from "./base-validator";
import {Injectable} from "@angular/core";

@Injectable()
export class UserNameValidator extends BaseValidator {
    protected validateFormControl = (control: AbstractControl): ValidationErrors|null => {
        const userName = control.value as string;
        const error: ValidationErrors = {
            userName: {
                value: userName
            }
        }

        if (!this.checkFirstLetterCapitalized(userName))
            return error;

        if (!this.checkLength(userName))
            return error;

        return null;
    }

    private checkFirstLetterCapitalized(name: string): boolean {
        const firstLetter = name.charAt(0);
        return firstLetter === firstLetter.toUpperCase();
    }

    private checkLength(name: string): boolean {
        const minimumNameLength = 5;
        return name.length >= minimumNameLength;
    }
}

