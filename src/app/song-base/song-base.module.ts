import { NgModule } from '@angular/core';
import {CommonModule, NgFor, NgOptimizedImage} from '@angular/common';
import { SongsListComponent } from './songs-list/songs-list.component';
import { SongService } from '../services/song.service';
import { provideHttpClient } from '@angular/common/http';
import { CreateSongComponent } from './create-song/create-song.component';
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
    declarations: [SongsListComponent, CreateSongComponent],
    imports: [CommonModule, NgFor, ReactiveFormsModule],
    providers: [SongService, provideHttpClient()],
    exports: [SongsListComponent, CreateSongComponent],
})
export class SongBaseModule {}
