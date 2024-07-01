import SongModel from "./SongModel";

interface ExtendedSongModel extends SongModel {
    likes: number;
    albumId: string;
    artistId: string;
    albumName: string;
    artistName: string;
}
export default ExtendedSongModel;
