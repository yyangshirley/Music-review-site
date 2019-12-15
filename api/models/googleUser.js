var mongoose=require('mongoose');
var schema=mongoose.Schema;

var googleUserSchema=new schema({
    name:String,
    email:String,
    provider:String,
    provider_id:String,
    provider_pic:String,
    token:String,
});

module.exports=mongoose.model('googleUser',googleUserSchema);