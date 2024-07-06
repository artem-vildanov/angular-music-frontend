import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, tap} from "rxjs";
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
        const setSongsList = (songs: SongModel[]) => this.songsList = songs;
        const setLoadedStatus = () => this.songsListStatus = LoadingStatus.loaded;

        this.setLoadingStatus();
        this.removeSelectedSong();
        this.songApiService
            .getAlbumSongs()
            .pipe(
                tap(setSongsList), // обновляем состояние и помещаем в него загруженные песни
                tap(setLoadedStatus) // после запроса ставим статус loaded
            )
            .subscribe();
    }

    private setLoadingStatus(): void {
        this.songsListStatus = LoadingStatus.loading;
    }

    private removeSelectedSong(): void {
        this.selectedSongSource.next(null);
    }

    /**
     * Состояние загрузки списка песен
     */
    private songsListStatusSource = new BehaviorSubject<LoadingStatus>(LoadingStatus.initial);
    private _songsListStatus$ = this.songsListStatusSource.asObservable();
    set songsListStatus(status: LoadingStatus) {
        this.songsListStatusSource.next(status);
    }

    get songsListStatus$(): Observable<LoadingStatus> {
        return this._songsListStatus$;
    }

    /**
     * Массив песен
     */
    private songsListSource = new BehaviorSubject<SongModel[]>([]);
    private _songsList$ = this.songsListSource.asObservable();
    set songsList(songs: SongModel[]) {
        this.songsListSource.next(songs);
    }

    get songsList$(): Observable<SongModel[]> {
        return this._songsList$;
    }

    public loadSongsList(): void {
        this.updateSongsList();
    }

    /**
     * Выбранная песня
     */
    private selectedSongSource = new BehaviorSubject<ExtendedSongModel|null>(null);
    private _selectedSong$ = new Observable<ExtendedSongModel>;
    set selectedSong(selectedSongId: string) {
        const setSong = (song: ExtendedSongModel) => this.selectedSongSource.next(song);
        const setLoadedStatus = () => this.selectedSongStatusSource.next(LoadingStatus.loaded);

        this.selectedSongStatus = LoadingStatus.loading;
        this.songApiService
            .getSong(selectedSongId)
            .pipe(
                tap(setSong),
                tap(setLoadedStatus)
            )
            .subscribe();
    }

    get selectedSong$(): Observable<ExtendedSongModel|null> {
        return this._selectedSong$;
    }

    /**
     * Состояние загрузки выбранной песни
     */
    private selectedSongStatusSource = new BehaviorSubject<LoadingStatus>(LoadingStatus.initial);
    private _selectedSongStatus$ = this.selectedSongStatusSource.asObservable();
    set selectedSongStatus(status: LoadingStatus) {
        this.selectedSongStatusSource.next(status);
    }

    get selectedSongStatus$(): Observable<LoadingStatus> {
        return this._selectedSongStatus$;
    }
}
