import {Injectable, Signal, signal} from '@angular/core';
import {tap} from "rxjs";
import SongModel from "../../models/SongModel";
import {SongApiService} from "./song-api.service";
import {EventService} from "../event.service";
import LoadingStatus from "../../enums/LoadingStatus";
import ExtendedSongModel from "../../models/ExtendedSongModel";

@Injectable({
    providedIn: 'root'
})
export class SongStateService {
    constructor(
        private readonly songApiService: SongApiService,
        private readonly eventService: EventService
    ) {
        this.eventService
            .songsListChanged$
            .subscribe(this.updateSongsList)
    }

    private updateSongsList = (): void => {
        this.setLoadingSongsListStatus();
        this.setSelectedSong(null);
        this.setInitialSelectedSongStatus();
        this.songApiService
            .getAlbumSongs()
            .pipe(
                tap(this.setSongsList), // обновляем состояние и помещаем в него загруженные песни
                tap(this.setLoadedSongsListStatus) // после запроса ставим статус loaded
            )
            .subscribe();
    }

    /**
     * Состояние загрузки списка треков
     */
    private _songsListStatus = signal<LoadingStatus>(LoadingStatus.initial);
    set songsListStatus(status: LoadingStatus) {
        this._songsListStatus.set(status);
    }
    get songsListStatus(): Signal<LoadingStatus> {
        return this._songsListStatus;
    }
    private setLoadingSongsListStatus = () => this.songsListStatus = LoadingStatus.loading;
    private setLoadedSongsListStatus = () => this.songsListStatus = LoadingStatus.loaded;

    /**
     * Список треков
     */
    private _songsList = signal<SongModel[]>([]);
    set songsList(songsList: SongModel[]) {
        this._songsList.set(songsList);
    }

    get songsList(): Signal<SongModel[]> {
        return this._songsList;
    }

    private setSongsList = (songs: SongModel[]) => this.songsList = songs;

    public loadSongsList(): void {
        this.updateSongsList();
    }

    /**
     * Выбранная песня
     */
    private _selectedSong = signal<ExtendedSongModel | null>(null);
    set selectedSongId(selectedSongId: string | null) {
        if (selectedSongId === null) {
            this.unsetSelectedSong();
        } else {
            this.loadSelectedSong(selectedSongId);
        }
    }

    private unsetSelectedSong(): void {
        this.setSelectedSong(null);
        this.setLoadedSelectedSongStatus();
    }

    private loadSelectedSong(selectedSongId: string): void {
        this.setLoadingSelectedSongStatus();
        this.songApiService
            .getSong(selectedSongId)
            .pipe(
                tap(this.setSelectedSong),
                tap(this.setLoadedSelectedSongStatus)
            )
            .subscribe();
    }

    private setSelectedSong = (song: ExtendedSongModel | null) => {
        this._selectedSong.set(song);
    }

    get selectedSong(): Signal<ExtendedSongModel | null> {
        return this._selectedSong;
    }

    /**
     * Состояние загрузки выбранной песни
     */
    private _selectedSongStatus = signal<LoadingStatus>(LoadingStatus.initial);
    set selectedSongStatus(status: LoadingStatus) {
        this._selectedSongStatus.set(status);
    }

    get selectedSongStatus(): Signal<LoadingStatus> {
        return this._selectedSongStatus;
    }

    public setLoadedSelectedSongStatus = () =>
        this.selectedSongStatus = LoadingStatus.loaded;

    public setLoadingSelectedSongStatus = () =>
        this.selectedSongStatus = LoadingStatus.loading;

    public setInitialSelectedSongStatus = () =>
        this.selectedSongStatus = LoadingStatus.initial;

    /**
     * Состояние запроса на создание песни
     */
    private _createSongStatus = signal<LoadingStatus>(LoadingStatus.initial);
    set createSongStatus(status: LoadingStatus) {
        this._createSongStatus.set(status);
    }

    get createSongStatus(): Signal<LoadingStatus> {
        return this._createSongStatus;
    }
}
