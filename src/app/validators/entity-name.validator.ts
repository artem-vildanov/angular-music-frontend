import {Injectable} from "@angular/core";
import {BaseValidator} from "./base-validator";
import {AbstractControl, ValidationErrors} from "@angular/forms";

@Injectable()
export class EntityNameValidator extends BaseValidator {
    protected validateFormControl = (control: AbstractControl): ValidationErrors | null => {
        const entityName = control.value as string;
        const error = {
            entityName: {
                name: entityName
            }
        }

        if (!this.checkNameLength(entityName))
            return error;

        return null;
    }

    private checkNameLength(name: string): boolean {
        const minimumNameLength = 5;
        return name.length >= minimumNameLength;
    }
}
