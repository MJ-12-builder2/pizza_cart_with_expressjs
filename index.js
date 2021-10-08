const express = require('express');
const exphbs  = require('express-handlebars');
const session = require('express-session');

const app = express();
const PORT =  process.env.PORT || 3017;

// enable the req.body object - to allow us to use HTML forms
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// enable the static folder...
app.use(express.static('public'));
 
// add more middleware to allow for templating support

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

	let counter = 0;

 app.get('/', function(req, res) {
	 res.render('index', {
		counter,
 	});
 });

app.post('/count', function(req, res) {
	counter++;
	res.redirect('/')

 console.log(req.body.size);
});
app.post('/count', function(req, res) {
	if(req.session.counter){
		req.session.counter = 0;

		req.session.counter++;
		req.redirect('/');
	}
});

// To reset the counter

app.post('/reset' , function(req, res){
	req.session.counter = 0
	res.redirect('/')
});

// Configure http.session middleware
app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 }}));


// start  the server and start listening for HTTP request on the PORT number specified...
app.listen(PORT, function() {
	console.log(`App started on port ${PORT}`)
});


// Create a new login screen	

app.get('/login', function(req, res) {
	res.render('login', {
	});
})

app.post('/login', function(req, res) {
	
	if(req.body.username){
		req.session.username=req.body.username;
		res.redirect('/');
	} else { 
		res.redirect('/login');
	}
})

function getCart(req) {
      
	const username = req.session.username
	if (username) {
		// note a user might nor have a cart yet - handle that inside the Factory Function.
		return factoryFunction.getCart(username);
	} else {
		// not logged in we can't do much
		// res.redirect('/login');
	}
}