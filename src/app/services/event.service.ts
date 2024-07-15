import {Injectable, signal} from '@angular/core';
import {Observable, Subject} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class EventService {
    private sharedWorker: SharedWorker;
    private songsListChangedSource = new Subject<void>();
    private _songsListChanged$ = this.songsListChangedSource.asObservable();

    constructor() {
        console.log('init event service')
        // this.sharedWorker = this.tryInitSharedWorker();
        this.sharedWorker = this.initSharedWorker();
    }

    public tryInitSharedWorker(): void {
        if (typeof SharedWorker !== 'undefined') {
            this.initSharedWorker();
        } else {
            throw Error('shared worker is not supported');
        }
    }

    private initSharedWorker(): SharedWorker {
        const sharedWorker = new SharedWorker(
            new URL('../workers/song.shared.worker.ts', import.meta.url)
        );
        sharedWorker.port.onmessage = this.notifySubscribers;
        return sharedWorker;
    }

    public songsListChanged(): void {
        this.sharedWorker.port.postMessage('notify tabs');
    }

    private notifySubscribers = (workerMessage: any): void => {
        this.songsListChangedSource.next();
    }

    get songsListChanged$(): Observable<void> {
        return this._songsListChanged$;
    }
}
