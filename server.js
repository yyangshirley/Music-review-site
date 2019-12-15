//server.js

const express = require('express');        // call express
const app = express();                 // define our app using express
const bodyParser = require('body-parser');
const router=express.Router();
const cors = require('cors'); 
const ctrlUser=require('./api/controllers/user.controller');
app.use(cors());
//body parse
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static('static'));
app.use(express.json())

require('./api/config/passportConfig');
const passport = require('passport');
app.use(passport.initialize());

//jwt
const jwt=require('jsonwebtoken');
const secret= process.env.JWT_KEY;
if (typeof secret === 'undefined') { // If not set, exit immediately
	console.log("Please set secret as environment variable. E.g. JWT_KEY=\"Open Sesame\" node index");
	process.exit(1);
}

var Song=require('./api/models/song');
var User=require('./api/models/user');
var Temp=require('./api/models/tempUser');
mongoose=require('mongoose');
nev=require("email-verification")(mongoose);
var Review=require('./api/models/review');
var Playlist=require('./api/models/playlist');

let dev_db_url='mongodb+srv://yyan496:1234@gettingstarted-doctu.mongodb.net/musicReview?retryWrites=true&w=majority';
let mongoDB=process.env.MONGODB_URI|| dev_db_url;
mongoose.connect(mongoDB,
    {useNewUrlParser:true,
    useUnifiedTopology:true,
    useFindAndModify:false});
mongoose.Promise=global.Promise;
const db=mongoose.connection;
db.on('error',console.error.bind(console,'MongoDB connection error:'));



const rtauth=express.Router();
rtauth.use(express.json());

rtauth.use((req, res, next) => { // for all routes
    console.log('Request: ', req.method, ' Path: ', req.url, 'Time: ', Date.now());
    next(); // keep going
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
rtauth.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

//user login
rtauth.post('/user/login',ctrlUser.authenticate);

// calculate the number of users in this site for the admin
rtauth.get('/userProfile', function(req, res) {
	console.log('Data: ' + JSON.stringify(req.body));
	console.log("Auth: " + req.headers.authorization);
	// Extract token from Authorization header. It should be of the form "Bearer xxx.yyy.zzz"
	// Split on whitespace to get {"Bearer", "xxx.yyy.zzz"}

	if (typeof req.headers.authorization === 'undefined')
		return res.status(401).send("Access denied. Missing Auth header.");

	const token = req.headers.authorization.split(" ");
	if (! token[0].startsWith("Bearer")) { // Check first element. Must be "Bearer"
		return res.status(401).send("Access denied. Missing Token.");
	}

	try {
		// Verify the token
		const payload = jwt.verify(token[1], secret,{algorithms:'HS256'});
		console.log("JWT: ", JSON.stringify(payload));
        var collection=db.collection('users');
        collection.find().toArray(function(err,result){
            return res.send(`There are ${result.length} users have registered!!`);
        })
	  } catch (ex) {
        //if invalid token
        console.log(ex);
		return res.status(401).send("Access denied. Invalid token.");
	  }
})



app.use('/auth',rtauth);

app.use(function (req, res) {
    // res.setHeader('Content-Type', 'text/plain')
    res.write('you posted:\n')
    res.end(JSON.stringify(req.body, null, 2))
});

let port =8080;
app.listen(port,()=>{
    console.log('Server is up and running on port numner: ' + port);
});