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

//use nodemailer to verify email address
var nodemailer=require('nodemailer');
var smtpTransport = nodemailer.createTransport({
    service: "Gmail",
    secure: true,
    port:465,
    auth: {
        user: "noreply.musicreview@gmail.com",
        pass: "ece9065-yyan496-project"
    }
});
var rand,mailOptions,host,link;
app.get('/verify',function(req,res){
    var temp_collection=db.collection('tempusers');
    var user_collection=db.collection('users');
    console.log(req.protocol+":/"+req.get('host'));
    if((req.protocol+"://"+req.get('host'))==("http://"+host))
    {
        console.log("Domain is matched. Information is from Authentic email");
        if(req.query.id==rand)
        {
            console.log(mailOptions.to+"email is verified");
            
            temp_collection.find({'username':mailOptions.to},{'username':1,'password':1,'saltSecret':1,'privilege':1,'status':1})
            .toArray(function(err,doc){
                if(err){
                    return err;
                }
                user_collection.insert(doc,function(err,result){
                    if(err){
                        return err;
                    }
                    temp_collection.deleteOne({'username':mailOptions.to},function(err,result){
                        if(err){
                            return err;
                        }
                    })
                })
            })
            res.send("<h1>Email "+mailOptions.to+" is been Successfully verified! Now you could sign in!!!");
        }
        else
        {
            temp_collection.deleteOne({'username':mailOptions.to},function(err,result){
                if(err){
                    return err;
                }
            });
            console.log("email is not verified");
            res.send("<h1>Bad Request</h1>");
        }
    }
    else
    {
        res.send("<h1>Request is from unknown source");
    }
});
router.use((req, res, next) => { // for all routes
  console.log('Request: ', req.method, ' Path: ', req.url, 'Time: ', Date.now());
  next(); // keep going
});
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

app.use('/api',router);

/**
 * Operation on songs
 */
///create a new song
router.route('/song')
.post(function(req,res){
    var song=new Song();
    song.songTitle=req.body.songTitle;
    song.songArtist=req.body.songArtist;
    song.albumTitle=req.body.albumTitle;
    song.year=req.body.year;
    song.track=req.body.track;
    song.genre=req.body.genre;
    song.status="open"
    
    song.save(function(err){
        if(err){
            res.send(err);
        }
        res.json({message:'Song created!!!'});
    });
})
.get(function(req,res){
    Song.find({
        'status':{$ne:"hidden"}
    },(function(err,doc){
        res.json(doc);
    }))
})
.delete(function(req,res){
    Song.remove({_id:req.params.id
    },function(err,song){
    if(err){
        res.send(err);
    }
    res.json({message:'Successfully deleted'});
    })
});
router.route('/allSong')
.get(function(req,res){
    Song.find(function(err,reviews){
        if(err){
            res.send(err);
        };
        res.json(reviews);
    });
});

//set song status
router.route('/song/status')
.post(function(req,res){
    var user_collection=db.collection('songs')
    user_collection.update(
        {
        'songTitle':req.body.songTitle,
        },
        {$set:{
            'status':req.body.status
            }
        })
})
router.post(`/song/search`,function(req,res){
    var keyword=req.body.keyword;
    var song_collection=db.collection('songs')
    var reg={};
    // keyword=keyword.replace(/ /g, '');
    reg=new RegExp(keyword,"i");
    if(keyword){
        song_collection.find(
            {$or:[
            {songTitle:{$regex:reg}},
            {songArtist:{$regex:reg}},
            {albumTitle:{$regex:reg}},
            {year:{$regex:reg}},
            {track:{$regex:reg}},
            {genre:{$regex:reg}}
        ]}
        ).toArray(function(err,doc){
            if(err){
                res.send(err);
            }
            
            res.json(doc);
            console.log(doc)
        })
    }
    else{
        res.json("keyword:"+keyword+" There is no result!!")
    }
})


//show all the latest reviews
router.route('/review')
.get(function(req,res){
    var song_collection=db.collection('songs')
    song_collection.aggregate([
        {$lookup:{
            from:"reviews",
            localField:"songTitle",
            foreignField:"songTitle",
            as:"details"
        }},
    ]).toArray(function(err,doc){
        res.json(doc)
    })
})
//after enter the song title, show the latest review
.post(function(req,res){
    var title=req.body.songTitle;
    var song_collection=db.collection('reviews')
    var reg={};
    // title=title.replace(/ /g, '');
    reg['songTitle']=new RegExp(title,"i");
    if(title){
        song_collection.find(reg).sort({"reviewDate":-1}).limit(1).toArray(function(err,doc){
            if(err){
                res.send(err);
            }
            
            res.json(doc);
            console.log(doc)
        })
    }
})
//show all the review in detail of a song
router.route('/review/detail')
.post(function(req,res){
    var title=req.body.title;
    var song_collection=db.collection('reviews')
    var reg={};
    reg['songTitle']=new RegExp(title,"i");
    if(title){
        song_collection.find(reg).sort({"reviewDate":-1}).toArray(function(err,doc){
            if(err){
                res.send(err);
            }
            res.json(doc);
            console.log(doc)
        })
    }
})

//show all the songs and rating from high to low (top songs)
router.route('/review/rating')
.get(function(req,res){
    var collection=db.collection('reviews');
    collection.aggregate([
        {$group:{
            _id:"$songTitle",
            count:{$sum:1},
            average:{$avg:"$rating"}}},
        {$sort:{average:-1}},
        {$limit:10}
    ]).toArray(function(err,result){
        for(var r in result){
            console.log("name:"+result[r]._id+",count:"+result[r].count+",average rating:"+result[r].average);
        }
        res.json(result)
    })
})

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

// Create a new user
rtauth.route('/user/register')
.post(function (req, res) {
    let username=req.body.username;
    console.log(`Creating user ${username}`);
    var collection=db.collection('users');

    collection.find({"username":username}).toArray(function(err,doc){
        if(err){
            return err;
        }
        if(doc==null||doc==""){
            var temp=new Temp();
            temp.username=req.body.username;
            temp.password=req.body.password;
            temp.privilege="";
            temp.status=";"

            temp.save((err,doc)=>{
                if(!err){
                    res.send(doc);
                }
                else{
                    res.send(err);
                }
            })	

            rand=Math.floor((Math.random() * 100) + 54);
            host=req.get('host');
            link="http://"+req.get('host')+"/verify?id="+rand;
            
            mailOptions={
                to : username,
                subject : "Please confirm your Email account",
                html : "Hello,<br> Please Click on the link to verify your email.<br><a href="+link+">Click here to verify</a>"
            }
            console.log(mailOptions);
            smtpTransport.sendMail(mailOptions, function(error, response){
             if(error){
                    console.log(error);
                res.end("error");
             }else{
                    console.log("Message sent: " + response.message);
                res.end("sent");
                 }
            }); 
        }
        else{
            res.status(400).send(`Username ${req.body.username} has existed!!!`);
        }
    })
})

//user writes comments for the songs
rtauth.route('/review/create')
.post(function(req,res){
    var review=new Review();
    review.reviews=req.body.reviews;
    review.rating=req.body.rating;
    //user does not enter (system automatically)
    review.reviewDate=req.body.reviewDate;
    review.songTitle=req.body.songTitle;
    review.username=req.body.username;
    review.save(function(err,doc){
        if(err){
            res.send(err);
        }
        res.json(doc);
    });
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