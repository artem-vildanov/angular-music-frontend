import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SongApiService} from "../../_services/song/song-api.service";

@Component({
  selector: 'app-create-song',
  templateUrl: './create-song.component.html',
  styleUrl: './create-song.component.css'
})
export class CreateSongComponent {
    public createSongForm: FormGroup;
    constructor(
        private readonly formBuilder: FormBuilder,
        private readonly songService: SongApiService
    ) {
        this.createSongForm = this.makeCreateSongForm();
    }

    private makeCreateSongForm(): FormGroup {
        const fields: object = {
            name: ['', Validators.required],
            music: [null, Validators.required]
        };
        return this.formBuilder.group(fields);
    }

    public onFileChange(event: Event): void {
        const target: HTMLInputElement = event.target as HTMLInputElement;
        const inputFile: File = target.files![0];
        inputFile && this.addSongToForm(inputFile);
    }

    private addSongToForm(file: File): void {
        const value: object = { music: file }
        this.createSongForm.patchValue(value);
        this.createSongForm.get('music')?.updateValueAndValidity();
    }

    public onSubmit(): void {
        const formData: FormData = this.makeFormData();
        this.songService
            .createSong(formData)
            .subscribe(response => console.log(response));
    }

    private makeFormData(): FormData {
        const songName = this.createSongForm.get('name')?.value;
        const songFile = this.createSongForm.get('music')?.value;
        const formData: FormData = new FormData();
        formData.append('name', songName);
        formData.append('music', songFile);
        return formData;
    }

    public checkSongNameInvalid(): boolean {
        const nameIsInvalid: boolean = this.createSongForm.get('name')!.invalid;
        const nameIsTouched: boolean = this.createSongForm.get('name')!.touched;
        return nameIsInvalid && nameIsTouched;
    }

    public checkSongFileInvalid(): boolean {
        const fileIsInvalid: boolean = this.createSongForm.get('music')!.invalid;
        const fileIsTouched: boolean = this.createSongForm.get('music')!.touched;
        return fileIsInvalid && fileIsTouched;
    }
}
