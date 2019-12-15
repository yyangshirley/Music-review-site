var mongoose=require('mongoose');
var schema=mongoose.Schema;
const bcrypt = require('bcryptjs');

var tempUserSchema=new schema({
    username:String,
    password:String,
    saltSecret:String,
    status:String,
    privilege:String,

});

tempUserSchema.pre('save', function (next) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(this.password, salt, (err, hash) => {
            this.password = hash;
            this.saltSecret = salt;
            next();
        });
    });
});

module.exports=mongoose.model('tempUser',tempUserSchema);