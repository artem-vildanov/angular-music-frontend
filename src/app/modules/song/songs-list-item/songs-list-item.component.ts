import {
    AfterViewInit,
    Component,
    effect,
    ElementRef,
    input,
    Input,
    OnInit,
    Signal,
    signal,
    ViewChild
} from '@angular/core';
import SongModel from "../../../models/SongModel";
import {SongStateService} from "../../../services/song/song-state.service";
import ExtendedSongModel from "../../../models/ExtendedSongModel";
import {SongCanvasManager} from "../../../services/song/song-canvas.service";
import {SongSelectionManager} from "../../../services/song/song-selection.service";
import {SongMutationObserverManager} from "../../../services/song/song-mutation-observer.service";

@Component({
    selector: 'app-songs-list-item',
    templateUrl: './songs-list-item.component.html',
    styleUrl: './songs-list-item.component.css'
})
export class SongsListItemComponent implements AfterViewInit, OnInit {
    // @ViewChild('canvas') canvasRef!: ElementRef<HTMLCanvasElement>;
    // @ViewChild('songElement') songElementRef!: ElementRef<HTMLDivElement>;
    private songCanvasManager!: SongCanvasManager;
    private songSelectionManager!: SongSelectionManager;
    private songMutationObserverManager!: SongMutationObserverManager;
    private canvasElement!: HTMLCanvasElement;
    public songElement!: HTMLDivElement;
    @Input() _song!: SongModel;
    public _selectedSong: Signal<ExtendedSongModel | null> = signal(null);

    constructor(
        private readonly songStateService: SongStateService,
    ) {}

    ngOnInit(): void {
        this._selectedSong = this.songStateService.selectedSong;
    }

    ngAfterViewInit(): void {
        this.initElements();
        this.songCanvasManager = new SongCanvasManager(this.canvasElement);
        this.songSelectionManager = new SongSelectionManager(this.songElement);
        this.songMutationObserverManager = new SongMutationObserverManager(this.songElement, this.canvasElement);
    }

    private initElements(): void {
        this.canvasElement = document.getElementById(`canvas_${this.song.id}`)! as HTMLCanvasElement;
        this.songElement = document.getElementById(`song_${this.song.id}`)! as HTMLDivElement;
    }

    get song(): SongModel {
        return this._song;
    }

    public onSelectSong(songId: string): void {
        if (this.songSelectionManager.songIsSelected)
            return;

        this.songSelectionManager.removePreviousSelected();
        this.songSelectionManager.makeSelfSelected();
        this.songStateService.selectedSongId = songId;
    }
}
