var mongoose=require('mongoose');
var schema=mongoose.Schema;

var playlistSchema=new schema({
    listTitle:String,
    description:String,
    song:Array,
    username:String,
    status:String,
});

module.exports=mongoose.model('playlist',playlistSchema);