var mongoose=require('mongoose');
const bcrypt = require('bcryptjs');
var schema=mongoose.Schema;
const jwt = require('jsonwebtoken');

var userSchema=new schema({
    username:String,
    password:String,
    saltSecret:String,
    privilege:String,
    status:String
});
// Events
userSchema.pre('save', function (next) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(this.password, salt, (err, hash) => {
            this.password = hash;
            this.saltSecret = salt;
            next();
        });
    });
});
// Methods
userSchema.methods.verifyPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

userSchema.methods.generateJwt = function () {
    return jwt.sign({ 
        _id: this._id
    },process.env.JWT_KEY,
    {
        expiresIn: "5m"
    });
}

module.exports=mongoose.model('user',userSchema);