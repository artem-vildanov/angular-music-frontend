import {Injectable} from "@angular/core";
import {BaseValidator} from "./base-validator";
import {AbstractControl, ValidationErrors} from "@angular/forms";

@Injectable()
export class ImageFileValidator extends BaseValidator {
    protected validateFormControl = (control: AbstractControl): ValidationErrors | null => {
        const imageFile = control.value as File;
        const error = {
            imageFile: {
                value: imageFile.name
            }
        }

        if (!this.checkFileSize(imageFile))
            return error;

        return null;
    }

    private checkFileSize(file: File): boolean {
        /**
         * Максимально допустимый размер загружаемого изображения (5 Mb)
         */
        const maximumImageSize = 5242880;
        return file.size < maximumImageSize;
    }
}
