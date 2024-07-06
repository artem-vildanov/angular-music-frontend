import {FormControl} from "@angular/forms";

export interface IUpdateSongForm {
    name: FormControl<string | null>;
    audio: FormControl<File | null>;
}
