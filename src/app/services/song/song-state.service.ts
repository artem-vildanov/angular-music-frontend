import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, tap} from "rxjs";
import SongModel from "../../models/SongModel";
import {SongApiService} from "./song-api.service";
import {EventService} from "../event.service";
import LoadingStatus from "../../enums/LoadingStatus";

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
        const removeSelectedSong = () => this.selectedSongSource.next(null);
        const setLoadedStatus = () => this.songsListStatus = LoadingStatus.loaded;

        this.songsListStatus = LoadingStatus.loading; // перед запросом ставим статус loading
        this.songApiService
            .getAlbumSongs()
            .pipe(
                tap(setSongsList), // обновляем состояние и помещаем в него загруженные песни
                tap(removeSelectedSong), // убираем выделенную песню
                tap(setLoadedStatus) // после запроса ставим статус loaded
            )
            .subscribe();
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

    public loadAlbumSongs(): void {
        this.updateSongsList();
    }

    /**
     * Айди выбранной песни
     */
    private selectedSongSource = new BehaviorSubject<string|null>(null);
    private _selectedSong$ = this.selectedSongSource.asObservable();
    set selectedSong(songId: string) {
        this.selectedSongSource.next(songId);
    }

    get selectedSong$(): Observable<string|null> {
        return this._selectedSong$;
    }
}
