import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

export function userNameValidator(): ValidatorFn {
    return validate;
}

const validate = (control: AbstractControl): ValidationErrors | null => {
    const userName = control.value as string;

    if (firstLetterIsInvalid(userName))
        return getError(userName);

    if (lengthIsInvalid(userName))
        return getError(userName);

    return null;
}

function firstLetterIsInvalid(userName: string): boolean {
    const firstLetter = userName.charAt(0);
    return firstLetter !== firstLetter.toUpperCase();
}

function lengthIsInvalid(userName: string): boolean {
    const minimumNameLength = 5;
    return userName.length < minimumNameLength;
}

function getError(userName: string): ValidationErrors {
    return { userName: userName }
}


