import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

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

        if (file === null)
            return getError();

        if (isSizeInvalid(file, maxSize))
            return getError(file.name);

        return null;
    };
}

function isSizeInvalid(file: File, maxSize: number): boolean {
    return file.size > maxSize;
}

function getError(fileName: string = 'undefinedName'): ValidationErrors {
    return { fileName: fileName };
}


