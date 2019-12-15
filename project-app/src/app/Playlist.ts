export interface Playlist{
    _id:string;
    listTitle:string;
    description:string;
    song:Array<string>;
    username:string;
    status:string;
    details:[{
        songTitle: string,
        songArtist: string,
        albumTitle: string,
        year: number,
        track: number,
        genre: number,
        status: string,
    }]
}