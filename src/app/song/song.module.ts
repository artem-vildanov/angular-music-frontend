import { NgModule } from '@angular/core';
import {CommonModule, NgFor, NgOptimizedImage} from '@angular/common';
import { SongsListComponent } from './songs-list/songs-list.component';
import { SongApiService } from '../_services/song/song-api.service';
import { provideHttpClient } from '@angular/common/http';
import { CreateSongComponent } from './create-song/create-song.component';
import {ReactiveFormsModule} from "@angular/forms";
import { SongDetailComponent } from './song-detail/song-detail.component';
import {ShowIfEmptyDirective} from "../_directives/show-if-empty.directive";
import {SongBaseComponent} from "./song-base/song-base.component";

@NgModule({
    declarations: [
        SongsListComponent,
        CreateSongComponent,
        SongDetailComponent,
        SongBaseComponent,
        ShowIfEmptyDirective,
    ],
    imports: [CommonModule, NgFor, ReactiveFormsModule],
    exports: [SongBaseComponent],
})
export class SongModule {}
