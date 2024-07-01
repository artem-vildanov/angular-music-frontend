import {ArtistModel} from "./ArtistModel";

export interface AccountModel {
    id: string;
    name: string;
    email: string;
    role: string;
    artist: ArtistModel|null;
}
