import { Injectable } from '@angular/core';
import {FormControl} from "@angular/forms";
import {audioFileValidator} from "../validators/file.validator";
import {entityNameValidator} from "../validators/entity-name.validator";

@Injectable({
    providedIn: 'root'
})
export class ControlFactoryService {

    constructor() { }

    public createAudioControl(): FormControl {
        return new FormControl<File | null>(null, {
            validators: audioFileValidator(),
            updateOn: 'change',
            nonNullable: false
        })
    }

    public createEntityNameControl(): FormControl {
        return new FormControl<string>('', {
            validators: entityNameValidator(),
            updateOn: 'change',
            nonNullable: true
        });
    }
}
