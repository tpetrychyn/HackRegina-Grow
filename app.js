var express = require('express');
var passport = require('passport');
var Strategy = require('passport-facebook').Strategy;
var mongoose = require('mongoose');
var shortid = require('shortid');

var User = require('./models/users');
var Goal = require('./models/goal');
var Forest = require('./models/forest');
var Tree = require('./models/tree');

var dbURL = 'mongodb://hackregina:hackmebaby@ds047146.mlab.com:47146/heroku_dhxp13b4';

// Configure the Facebook strategy for use by Passport.
//
// OAuth 2.0-based strategies require a `verify` function which receives the
// credential (`accessToken`) for accessing the Facebook API on the user's
// behalf, along with the user's profile.  The function must invoke `cb`
// with a user object, which will be set at `req.user` in route handlers after
// authentication.
passport.use(new Strategy({
    clientID: '1062987243814970',
    clientSecret: 'e54d86629d66f84d66b9662e44d8aec8',
    callbackURL: "https://hackregina-grow.herokuapp.com/login/facebook/return"
  },
  function(accessToken, refreshToken, profile, done) {
  	//Check for user profile based on facebookId
    User.findOne( { facebookId: profile.id },
    	function(err, submission) {
    		if (err) console.log(err);
    		var changed = false;
    		//if not found create a new entry
    		if (!submission) {
    			changed = true;
    			submission = new User({
    				facebookId: profile.id,
    				name: profile.displayName,
    				picture: "https://graph.facebook.com/" + profile.id + "/picture" + "?width=200&height=200" + "&access_token=" + accessToken
    			});
    		} else {
    			//This should update users names if they change it on FB, can't really test
    			if (submission.name != profile.displayName) {
    				changed = true;
    				submission.name = profile.displayName;
    			}
    		}
    		//if changes were made save it
    		if (changed){
    			submission.save(function(err) {
    				if (err) console.log(err);
    			});
    		}
    		//I think nextTick is so we don't return before we've saved
    		process.nextTick(function() {
    			return done(err, submission);
    		});
    	});
  	}
));


// Configure Passport authenticated session persistence.
//
// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.  In a
// production-quality application, this would typically be as simple as
// supplying the user ID when serializing, and querying the user record by ID
// from the database when deserializing.  However, due to the fact that this
// example does not have a database, the complete Twitter profile is serialized
// and deserialized.
passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

var app = express();

// Configure view engine to render EJS templates.
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// Use application-level middleware for common functionality, including
// logging, parsing, and session handling.
app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
mongoose.connect(dbURL);
// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());


// Define routes.
app.get('/',
  function(req, res) {
    res.render('home', { user: req.user });
  });

app.get('/login',
  function(req, res){
    res.render('login');
  });

 app.get('/logout', function (req, res){
  req.session.destroy(function (err) {
    res.redirect('/'); //Inside a callback… bulletproof!
  });
});

app.get('/login/facebook',
  passport.authenticate('facebook'));

app.get('/login/facebook/return',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/profile');
  });

app.get('/profile',
  require('connect-ensure-login').ensureLoggedIn(),
  function(req, res){
    res.render('profile', { user: req.user });
 });

 app.get('/nutrition',
   require('connect-ensure-login').ensureLoggedIn(),
   function(req, res){
     res.render('nutrition', { user: req.user });
  });

app.get('/training',
require('connect-ensure-login').ensureLoggedIn(),
function(req, res){
   Goal.find({'facebookId': req.user.facebookId}).exec(function(err, _goals) {
  		if (err) console.log(err);
        console.log(_goals);
  		res.render('training', {
  		goals: _goals,
  		user: req.user
  		});
  	});
});

app.get('/forest',
require('connect-ensure-login').ensureLoggedIn(),
function(req, res){
    Goal.find({'facebookId': req.user.facebookId}).exec(function(err, _goals) {
           if (err) console.log(err);
         console.log(_goals);
           res.render('training', {
           goals: _goals,
           user: req.user
           });
       });
});

app.post('/training',
    require('connect-ensure-login').ensureLoggedIn(),
    function(req, res){
        var _goalId = shortid.generate();
        console.log(_goalId);
        var goal = new Goal({
            goalId: _goalId,
      		facebookId: req.user.facebookId,
            name: req.body.name,
            days: req.body.days
  	    });

  	goal.save(function(err) {
  		if (err) console.log(err);
  		else res.send(200, _goalId);
  	});
});

app.post('/training/data',
    require('connect-ensure-login').ensureLoggedIn(),
    function(req, res){
        Goal.findOne({'goalId': req.body.goalId}).exec(function(err, goal) {
       		if (err) console.log(err);
            goal.data[req.body.dataId] = req.body.val;
            goal.markModified('data');
            goal.save(function(err) {
          		if (err) console.log(err);
          		else res.sendStatus(200);
          	});
       	});
});

app.use('/static', express.static(__dirname + '/static'));

var port = process.env.PORT || 3000;

app.listen(port, function(){
  console.log('listening on ' + port);
});
