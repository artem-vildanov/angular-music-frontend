import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

export abstract class BaseValidator {
    public getValidator(): ValidatorFn {
        return this.validateFormControl;
    }

    protected abstract validateFormControl: (control: AbstractControl) => ValidationErrors|null;
}
