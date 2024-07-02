import {Injectable} from "@angular/core";
import {BaseValidator} from "./base-validator";
import {AbstractControl, ValidationErrors} from "@angular/forms";

@Injectable()
export class AudioFileValidator extends BaseValidator {
    protected validateFormControl = (control: AbstractControl): ValidationErrors | null => {
        const audioFile = control.value;

        if (audioFile !== null) {
            const error = {
                audioFile: audioFile.name
            }

            if (!this.validateSize(audioFile))
                return error;
        }

        return null;
    }

    private validateSize(file: File): boolean {
        /**
         * Максимально допустимый размер трека в байтах (10 Mb)
         */
        const maximumAudioSize = 10485760;
        return file.size < maximumAudioSize;
    }
}
