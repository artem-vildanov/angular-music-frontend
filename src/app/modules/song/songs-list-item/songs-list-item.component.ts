import {Component, Input} from '@angular/core';
import {SongStateService} from "../../services/song/song-state.service";
import SongModel from "../../models/SongModel";

@Component({
    selector: 'app-songs-list-item',
    templateUrl: './songs-list-item.component.html',
    styleUrl: './songs-list-item.component.css'
})
export class SongsListItemComponent {
    @Input()
    public song!: SongModel;
    constructor(private readonly songStateService: SongStateService) {}
    public onSelectSong(songId: string): void {
        this.songStateService.selectedSong = songId;
    }
}
