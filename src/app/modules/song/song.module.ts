import { NgModule } from '@angular/core';
import {CommonModule, NgFor, NgOptimizedImage} from '@angular/common';
import { SongsListComponent } from './songs-list/songs-list.component';
import { CreateSongComponent } from './create-song/create-song.component';
import {ReactiveFormsModule} from "@angular/forms";
import { SongDetailComponent } from './song-detail/song-detail.component';
import {ShowIfEmptyDirective} from "../../directives/show-if-empty.directive";
import {SongBaseComponent} from "./song-base/song-base.component";
import { SongsListItemComponent } from './songs-list-item/songs-list-item.component';
import {SpinnerModule} from "../spinner/spinner.module";
import {AudioFileValidator} from "../../validators/audio-file.validator";
import {ImageFileValidator} from "../../validators/image-file.validator";
import {EntityNameValidator} from "../../validators/entity-name.validator";

@NgModule({
    declarations: [
        SongsListComponent,
        CreateSongComponent,
        SongDetailComponent,
        SongBaseComponent,
        ShowIfEmptyDirective,
        SongsListItemComponent,
    ],
    imports: [
        CommonModule,
        NgFor,
        ReactiveFormsModule,
        SpinnerModule
    ],
    exports: [SongBaseComponent],
    providers: [
        AudioFileValidator,
        ImageFileValidator,
        EntityNameValidator
    ]
})
export class SongModule {}
