import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AudioControlComponent } from './audio-control/audio-control.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";



@NgModule({
    declarations: [
        AudioControlComponent
    ],
    exports: [
        AudioControlComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ]
})
export class ControlsModule { }
