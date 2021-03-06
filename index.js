// Require .env file's variables
require('dotenv').config();

// Require needed modules
var bodyParser = require('body-parser');
var ejsLayouts = require('express-ejs-layouts');
var express = require('express');
var flash = require('connect-flash')
var passport = require('./config/passportConfig');
var session = require('express-session');


// Declare app variable
var app = express();

// Set and use statements
app.set('view engine', 'ejs');
app.use(ejsLayouts);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
	secret: process.env.SESSION_SECRET,
	resave: false,
	saveUninitialized: true
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

// Custom middleware - FUN!
app.use(function(req, res, next) {
	res.locals.currentUser = req.user;
	res.locals.alerts = req.flash();
	next();
});

// Include controllers and routes
app.use('/auth', require('./controllers/auth'));
app.use('/birds', require('./controllers/birds'));
app.use('/profile', require('./controllers/profile'));

// Define routes

// Home route
app.get('/', function(req, res) {
	res.render('home');
});


// HEY LISTEN NAVI
app.listen(3000, function() {
	console.log('Hey Listen! - Navi')
});