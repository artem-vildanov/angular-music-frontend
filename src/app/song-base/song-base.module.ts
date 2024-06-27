import { NgModule } from '@angular/core';
import {CommonModule, NgFor, NgOptimizedImage} from '@angular/common';
import { SongsListComponent } from './songs-list/songs-list.component';
import { SongService } from '../services/song.service';
import { provideHttpClient } from '@angular/common/http';
import { CreateSongComponent } from './create-song/create-song.component';
import {ReactiveFormsModule} from "@angular/forms";
import { SongDetailComponent } from './song-detail/song-detail.component';
import {ShowIfEmptyDirective} from "../directives/show-if-empty.directive";

@NgModule({
    declarations: [
        SongsListComponent,
        CreateSongComponent,
        SongDetailComponent,
        ShowIfEmptyDirective
    ],
    imports: [CommonModule, NgFor, ReactiveFormsModule],
    providers: [SongService, provideHttpClient()],
    exports: [SongsListComponent, CreateSongComponent, SongDetailComponent],
})
export class SongBaseModule {}
