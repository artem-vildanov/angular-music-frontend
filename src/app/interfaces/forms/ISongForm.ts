import { FormControl } from "@angular/forms";

export interface ISongForm {
    name: FormControl<string>,
    audioId: FormControl<string>
}
