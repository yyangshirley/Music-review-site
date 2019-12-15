var mongoose=require('mongoose');
var schema=mongoose.Schema;

var reviewSchema=new schema({
    reviews:String,
    rating:Number,
    reviewDate:Date,
    username:String,
    songTitle:String,
    averageRating:Number
});

module.exports=mongoose.model('review',reviewSchema);