export class SongSelectionService {
    private songElement!: HTMLElement;
    constructor(songElement: HTMLElement) {
        this.songElement = songElement;
    }

    public get songIsSelected(): boolean {
        const isSelected = this.songElement.getAttribute('is-selected');
        if (isSelected === 'true')
            return true;
        if (isSelected === 'false')
            return false;
        return false;
    }

    public removePreviousSelected(): void {
        const songsList = this.getSongsElements();
        for (let song of songsList) {
            const isSelected = song.getAttribute('is-selected');
            if (isSelected === 'true') {
                song.setAttribute('is-selected', 'false');
                break;
            }
        }
    }

    private getSongsElements(): Element[] {
        const songsListElement = document.getElementById('songsList')!;
        const unmappedSongsList = Array.from(songsListElement.children);
        return unmappedSongsList.map(songElement => songElement.firstElementChild!);
    }

    public makeSelfSelected(): void {
        this.songElement.setAttribute('is-selected', 'true');
    }
}
