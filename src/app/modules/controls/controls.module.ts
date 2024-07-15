import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AudioControlComponent } from './audio-control/audio-control.component';
import {FormsModule} from "@angular/forms";



@NgModule({
    declarations: [
        AudioControlComponent
    ],
    exports: [
        AudioControlComponent
    ],
    imports: [
        CommonModule,
        FormsModule
    ]
})
export class ControlsModule { }
