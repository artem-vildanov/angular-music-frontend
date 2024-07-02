import {FormControl} from "@angular/forms";

export interface ICreateSongForm {
    name: FormControl<string>;
    music: FormControl<File|null>;
}
