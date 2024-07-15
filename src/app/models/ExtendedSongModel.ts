import SongModel from "./SongModel";

interface ExtendedSongModel extends SongModel {
    audioId: string;
    likes: number;
    albumId: string;
    artistId: string;
    albumName: string;
    artistName: string;
}
export default ExtendedSongModel;
