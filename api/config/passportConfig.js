const passport = require('passport');
const localStrategy = require('passport-local').Strategy;

var Temp=require('../models/tempUser');
var User=require('../models/user'),
mongoose=require('mongoose'); 
passport.use(
    new localStrategy({ usernameField: 'username' },
        (username, password, done) => {
            User.findOne({ username: username },
                (err, user) => {
                    if (err)
                        return done(err);
                    // unknown user
                    else if (!user){
                        Temp.findOne({username:username},
                            (err,tempuser)=>{
                                if(err) return err;
                                //not register
                                else if(!tempuser){
                                    return done(null, false, { message: 'Email is not registered' });
                                }
                                //not verify
                                else return done(null, false, { message: 'Please verify your email' });
                            })
                    }

                    // wrong password
                    else if (!user.verifyPassword(password))
                        return done(null, false, { message: 'Wrong password.' });
                    // authentication succeeded
                    else
                        return done(null, user,{message:'Successfully sign in!!!'});
                });
        })
);