import {Component} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import LoadingStatus from "../../../enums/LoadingStatus";

@Component({
  selector: 'app-create-song',
  templateUrl: './create-song.component.html',
  styleUrl: './create-song.component.css'
})
export class CreateSongComponent {

    /**
    public _status = LoadingStatus.initial;
    constructor(
        private readonly createSongForm: CreateSongForm
    ) {}

    public onFileChange(event: Event): void {
        this.createSongForm.onFileChange(event);
    }

    public onSubmit(): void {
        const setStatusLoaded = () => this._status = LoadingStatus.loaded;
        this._status = LoadingStatus.loading;
        this.createSongForm
            .createSong()
            .subscribe(setStatusLoaded);
    }

    get status(): LoadingStatus {
        return this._status;
    }

    get form(): FormGroup<SongForm> {
        return this.createSongForm.form;
    }

    get checkSongNameInvalid(): boolean {
        return this.createSongForm.checkSongNameInvalid();
    }

    get checkSongFileInvalid(): boolean {
        return this.createSongForm.checkSongFileInvalid();
    }

    get checkFormInvalid(): boolean {
        return this.createSongForm.form.invalid;
    }

    public setStatusInitial($event: Event): void {
        $event.preventDefault();
        this._status = LoadingStatus.initial;
        this.createSongForm.clearForm();
    }

    protected readonly LoadingStatus = LoadingStatus;
        */
}
