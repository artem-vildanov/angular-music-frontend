import {NgModule, RendererFactory2} from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditSongPopupComponent } from './edit-song-popup/edit-song-popup.component';
import {MatDialogModule} from "@angular/material/dialog";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { CreateSongPopupComponent } from './create-song-popup/create-song-popup.component';

@NgModule({
    declarations: [
        EditSongPopupComponent,
        CreateSongPopupComponent
    ],
    imports: [
        CommonModule,
        MatDialogModule,
        ReactiveFormsModule,
        FormsModule,
    ],
    providers: [
    ]
})
export class PopupModule { }
