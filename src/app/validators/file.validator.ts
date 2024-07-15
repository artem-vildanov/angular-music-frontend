import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";
import {max} from "rxjs";

export function audioFileValidator(): ValidatorFn {
    const maximumAudioSize = 10485760; // 10 Mb
    return fileValidator(maximumAudioSize);
}

export function imageFileValidator(): ValidatorFn {
    const maximumImageSize = 5242880; // 5 Mb
    return fileValidator(maximumImageSize);
}

function fileValidator(maxSize: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const file = control.value as File;
        const errors: ValidationErrors = {};

        if (file === null)
            return requiredError();

        if (file.size > maxSize)
            return invalidSizeError(file.size, maxSize);

        return null;
    };
}

function invalidSizeError(actualSize: number, maxSize: number): ValidationErrors {
    return {
        size : {
            actualSize: actualSize,
            maxSize: maxSize
        }
    }
}

function requiredError(): ValidationErrors {
    return {
        required: true
    }
}



