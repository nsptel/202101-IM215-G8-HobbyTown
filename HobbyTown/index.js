const express = require('express');
const session = require('express-session');
const app = express();
const bodyParser = require('body-parser');
const multer = require('multer');
var upload = multer();
const router_user = require('./routes/user');
const redirects = require('./cust_mw');
const conn = require('./db_conn');

// set up
app.set('view engine', 'ejs');

// middleware
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(upload.array());
app.use(express.json());
app.use(session({
    secret: 'SimplySalted',
    resave: false,
    saveUninitialized: false,
}));
app.use('/user', router_user);

// custom middleware
app.use((req, res, next) => {
    res.locals.user = req.session.user;
    next();
});

// gets
// index
app.get('/', (req, res) => {
    var msg = req.session.msg;
    req.session.msg = null;
    res.render('index', { title: "Home", msg: msg  });
});

// login
app.get('/login', redirects[1], (req, res) => {
    var msg = req.session.msg;
    req.session.msg = null;
    res.render('login', { title: "Login", msg: msg });
});

// register
app.get('/register', redirects[1], (req, res) => {
    var msg = req.session.msg;
    req.session.msg = null;
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
    const { email, username, first_name, last_name, password, _, hobby } = req.body;
    var profile_pic = '/profile_pics/sample_profile.png';
    // creating queries
    var queries = `INSERT INTO user (first_name, last_name, email, username, password, profile_pic) VALUES ('${first_name}', '${last_name}', '${email}', '${username}', '${password}', '${profile_pic}');`;
    var others = hobby[hobby.length - 1].split(',');
    for (let j = 0; j < others.length; j++) {
        queries += `INSERT IGNORE INTO hobby (name) VALUES ('${others[j]}');`;
    }

    // query id
    user_id = -1;

    // running queries
    conn.query(queries, (err, result, fields) => {
        if (err) {
            if (err.errno == 1062) {
                req.session.msg = ["Email or username is already in use. Please try different.", "danger"];
                res.redirect('/register');
            } else {
                res.sendStatus(500);
            }
        } else {
            user_id = result[0].insertId;
            // getting the latest data
            var all_hobbies = (hobby.length == 1) ? others : hobby.slice(0, hobby.length - 1).concat(others);
            var query = `SELECT id FROM hobby WHERE name IN (?)`;
            var q_data = [all_hobbies];

            conn.query(query, q_data, (err, result, fields) => {
                if (err) {
                    console.error(err);
                    res.sendStatus(500);
                } else {
                    uh_ids = result.map(x => '('+ user_id.toString() +', '+ x.id.toString() +')');
                    uh_q = `INSERT INTO user_hobby (user_id, hobby_id) VALUES ` + uh_ids.join(',');
                    conn.query(uh_q, (err, result, fields) => {
                        if (err) {
                            console.error(err);
                            res.sendStatus(500);
                        } else {
                            req.session.msg = ["Registration Successful", "success"];
                            res.redirect('/login');
                        }
                    });
                }
            });
        }
    });
});

// logging in the user
app.post('/login', redirects[1], (req, res) => {
    const { email, password } = req.body;

    // query
    var query = ``;

    // checking if the user entered email or username
    if (email.match(/^[a-zA-Z0-9]+@[a-zA-Z]{3,}.[a-zA_Z]{2,3}$/)) {
        query += `SELECT * FROM user WHERE email = '${email}' AND password = '${password}'`;
    } else {
        query += `SELECT * FROM user WHERE username = '${email}' AND password = '${password}'`;
    }

    // running the query
    conn.query(query, (err, row, fields) => {
        if (err) {
            console.error(err);
            res.sendStatus(500);
        } else {
            if (!row || row.length == 0) {
                req.session.msg = ["No user found with such credentials. Please try again.", "danger"];
                res.redirect('/login');
            } else {
                req.session.user = row[0];
                // updating the last login timestamp
                var update_q = `UPDATE user SET timestamp = FROM_UNIXTIME('${Date.now() * 0.001}') WHERE id = '${row[0].id}'`;
                conn.query(update_q, (uerr, urow, ufield) => {
                    if (uerr) {
                        console.log(uerr);
                        res.sendStatus(500);
                    }
                });
                res.redirect('/');
            }
        }
    });
});

// Forgot password
app.post('/forgot_password', redirects[1], (req, res) => {
    // getting data
    const { email } = req.body;

    // query
    var query = `SELECT * FROM user WHERE email = '${email}';`;
    conn.query(query, (err, result, field) => {
        if (err) {
            console.error(err);
            res.sendStatus(500);
        } else {
            if (result.length === 0) {
                req.session.msg = ['This email address is not registered with HobbyTown.', 'danger'];
                res.redirect('/forgot_password');
            } else {
                req.session.msg = ['An email has been sent to you with your username and password.', 'success'];
                res.redirect('/');
            }
        }
    });
});

// Logging out
app.post('/logout', redirects[0], (req, res) => {
    req.session.user = null;
    res.redirect('/');
});

// listening on the port
app.listen('1234', function () {
    console.log('server running on 1234');
});

module.exports = redirects;