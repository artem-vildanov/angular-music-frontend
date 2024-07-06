import {FormControl} from "@angular/forms";

export interface ICreateSongForm {
    name: FormControl<string>;
    audio: FormControl<File|null>;
}
