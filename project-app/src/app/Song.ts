export interface Song{
    _id:string;
    songTitle:string;
    songArtist:string;
    header:String,
    status:string,
    albumTitle:String,
    year:Number,
    comment:String,
    zero_byte:Number,
    track:Number,
    genre:Number,
    joinedReview:[{
        _id:string;
        songTitle:string;
        averageRating:number;
        userID:string;
        reviews:string;
        rating:number;
        reviewDate:Date;
        count:number;
        average:number
    }],
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