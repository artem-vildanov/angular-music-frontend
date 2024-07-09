import {SongCanvasManager} from "./song-canvas.service";

export class SongMutationObserverManager {
    private songElement!: HTMLElement;
    private songCanvasManager!: SongCanvasManager

    constructor(songElement: HTMLDivElement, canvasElement: HTMLCanvasElement) {
        this.songCanvasManager = new SongCanvasManager(canvasElement);
        this.songElement = songElement;
        const observer = this.makeMutationObserver();
        observer.observe(songElement, { attributes: true });
    }

    private makeMutationObserver(): MutationObserver {
        return new MutationObserver(this.findMutation);
    }

    private findMutation = (mutations: MutationRecord[], observer: MutationObserver) => {
        for (let mutation of mutations) {
            if (this.isSelectedMutation(mutation)) {
                this.handleMutation();
                break;
            }
        }
    }

    private isSelectedMutation(mutation: MutationRecord): boolean {
        return mutation.type === 'attributes' && mutation.attributeName === 'is-selected';
    }

    private handleMutation(): void {
        const isSelected = this.songElement.getAttribute('is-selected');
        if (isSelected === 'true') {
            this.songCanvasManager.fillCanvas();
        } else if (isSelected === 'false') {
            console.log(`${this.songElement.id} unselected`);
            this.songCanvasManager.clearCanvas();
        }
    }
}
