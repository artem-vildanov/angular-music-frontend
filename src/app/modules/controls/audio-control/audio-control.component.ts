import {Component, forwardRef} from '@angular/core';
import {
    AbstractControl,
    ControlValueAccessor,
    NG_VALIDATORS,
    NG_VALUE_ACCESSOR,
    ValidationErrors,
    Validator
} from "@angular/forms";
import {audioFileValidator} from "../../../validators/file.validator";

@Component({
    selector: 'app-audio-control',
    templateUrl: './audio-control.component.html',
    styleUrl: './audio-control.component.css',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => AudioControlComponent),
            multi: true
        }
    ]
})
export class AudioControlComponent implements ControlValueAccessor {
    private _value: File|null = null;

    onChange: any = () => {};
    onTouched: any = () => {};

    get value() {
        return this._value;
    }

    set value(val: any) {
        this._value = val;
        this.onChange(val);
        this.onTouched();
    }

    public onFileChange(event: Event): void {
        const target: HTMLInputElement = event.target as HTMLInputElement;
        const inputFile: File = target.files![0];
        if (inputFile) this.value = inputFile;
    }



    writeValue(value: any): void {
        this._value = value;
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }
}
