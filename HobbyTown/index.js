const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const router_user = require('./routes/user');
const redirects = require('./cust_mw');
const conn = require('./db_conn');

// set up
app.set('view engine', 'ejs');

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use('/user', router_user);

// custom middleware
app.use((req, res, next) => {
    res.locals.user = req.session.user;
    next();
});

// gets
// index
app.get('/', (req, res) => {
    res.render('index', { title: "Home", msg: msg  });
});

// login
app.get('/login', redirects[1], (req, res) => {
    res.render('login', { title: "Login", msg: msg });
});

// register
app.get('/register', redirects[1], (req, res) => {
    res.render('register', { title: "Register", msg: msg });
});

// forgot password
app.get('/forgot_password', redirects[1], (req, res) => {
    var msg = req.session.msg;
    req.session.msg = null;
    res.render('forgot_password', { title: "Forgot Password", msg: msg });
});

// posts
// creating a new user
app.post('/register', redirects[1], (req, res) => {
    // to be implemented
});

// logging in the user
app.post('/login', redirects[1], (req, res) => {
    // to be implemented
});

// Forgot password
app.post('/forgot_password', redirects[1], (req, res) => {
    res.redirect('/forgot_password');
});

// Logging out
app.post('/logout', redirects[0], (req, res) => {
    res.redirect('/');
});

// listening on the port
app.listen('1234', function () {
    console.log('server running on 1234');
});

module.exports = redirects;