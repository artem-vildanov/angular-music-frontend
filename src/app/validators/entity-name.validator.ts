import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

export function entityNameValidator(): ValidatorFn {
    return validate;
}

const validate = (control: AbstractControl): ValidationErrors | null => {
    const entityName = control.value as string;

    if (entityName === null)
        return getError();

    if (nameIsInvalid(entityName))
        return getError(entityName);

    return null;
}

function nameIsInvalid(entityName: string): boolean {
    const minimumNameLength = 5;
    return entityName.length < minimumNameLength;
}

function getError(entityName: string = 'undefinedName'): ValidationErrors {
    return { entityName: entityName };
}
