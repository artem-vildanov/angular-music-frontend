import { Component, Input, OnInit, Optional, Self, forwardRef } from '@angular/core';
import {
    AbstractControl,
    ControlValueAccessor,
    FormControl,
    NG_VALIDATORS,
    NG_VALUE_ACCESSOR,
    NgControl,
    ValidationErrors,
    Validator
} from "@angular/forms";
import { audioFileValidator } from "../../../validators/file.validator";
import LoadingStatus from '../../../enums/LoadingStatus';
import { FileApiService } from '../../../services/file/file-api.service';
import { tap } from 'rxjs';


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
    private _value: string = '';
    public status: LoadingStatus = LoadingStatus.initial;
    public audioInput: FormControl<File | null>;
    private isChanged = false;

    onChange: any = () => { };
    onTouched: any = () => { };

    constructor(private readonly fileApiSerivce: FileApiService) {
        this.audioInput = this.initAudioControl();
    }

    private initAudioControl(): FormControl {
        return new FormControl(null, {
            validators: audioFileValidator(),
            updateOn: 'change',
            nonNullable: false
        });
    }

    private get value(): string {
        return this._value;
    }

    private set value(val: string) {
        this._value = val;
        this.onChange(val);
        this.onTouched();
    }

    public onInput(event: Event): void {
        this.isChanged = true;
        const target: HTMLInputElement = event.target as HTMLInputElement;
        const inputFile: File = target.files![0];
        if (inputFile) {
            this.validateAndUploadFile(inputFile);
        }
    }

    private validateAndUploadFile(file: File): void {
        if (this.audioInput.valid) {
            this.status = LoadingStatus.loading;
            const formData = this.makeFormData(file);
            this.performFileUpload(formData);
        }
    }

    private performFileUpload(formData: FormData): void {
        this.fileApiSerivce
            .saveFile(formData)
            .pipe(
                tap(fileId => this.value = fileId),
                tap(() => this.status = LoadingStatus.loaded),
            )
            .subscribe();
    }

    private makeFormData(file: File): FormData {
        const formData = new FormData();
        formData.append('audio', file);
        return formData;
    }

    get audioIsInvalid(): boolean {
        const isInvalid = this.audioInput.invalid;
        const isTouched = this.audioInput.touched;
        return isInvalid && isTouched && this.isChanged;
    }

    /** ControlValueAccessor methods implementation */
    writeValue(value: any): void {
        this.value = value;
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }
}
