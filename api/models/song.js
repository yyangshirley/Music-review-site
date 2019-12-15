var mongoose=require('mongoose');
var schema=mongoose.Schema;

var songSchema=new schema({
    header:String,
    songTitle:String,
    songArtist:String,
    albumTitle:String,
    year:Number,
    comment:String,
    zero_byte:Number,
    track:Number,
    genre:Number,
    reviews:String,
    status:String, //hidden
    
});

module.exports=mongoose.model('song',songSchema);