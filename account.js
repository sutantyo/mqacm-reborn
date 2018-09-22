var Firebase = require('firebase');

var firebase = new Firebase('https://mqacm-reborn.firebaseio.com/');
var users = firebase.child('users');

var router = require('express').Router();

router.use(require('body-parser').json());
router.use(require('cookie-parser')());
router.use(require('express-session')({
	resave: false,
	saveUninitialized: true,
	secret: 'asd'
}));

router.post('/api/signup', function(req, res)}{
	var username = req.body.username;
	var password = req.body.password;

	if(!username || !password)
		return res.json({ signedIn: false, message: 'no username or password' });

	users.child(username).once('value')
});
