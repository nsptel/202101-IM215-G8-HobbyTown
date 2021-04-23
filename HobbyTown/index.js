const express = require('express');
const session = require('express-session');
const app = express();
const bodyParser = require('body-parser');
const multer = require('multer');
var upload = multer();
const router_user = require('./routes/user');
const router_group = require('./routes/group');
const router_event = require('./routes/event');
const redirects = require('./cust_mw');
const conn = require('./db_conn');

// set up
app.set('view engine', 'ejs');

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({
    secret: 'SimplySalted',
    resave: false,
    saveUninitialized: false,
}));
app.use('/user', router_user);
app.use('/group', router_group);
app.use('/event', router_event);

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
    res.render('index', { title: "Home", msg: msg });
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

// runQuery promise
const runQuery = (query) => {
    return new Promise((resolve, reject) => {
        conn.query(query, (err, rows, fields) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}

// posts
// creating a new user
app.post('/register', redirects[1], upload.array(), (req, res) => {
    const { email, username, first_name, last_name, password, _, hobby } = req.body;
    var user_id = -1;
    var queries = `INSERT INTO user (first_name, last_name, email, username, password, profile_pic) VALUES ('${first_name}', '${last_name}', '${email}', '${username}', '${password}', '/profile_pics/sample_profile.png');`;
    var others;
    if (typeof (hobby) == 'string') {
        others = hobby.split(',');
    } else if (typeof (hobby) == 'object') {
        others = hobby[hobby.length - 1].split(',');
    }
    if (typeof (others) != 'undefined') {
        for (let j = 0; j < others.length; j++) {
            queries += `INSERT IGNORE INTO hobby (name) VALUES ('${others[j].trim()}');`;
        }
    }
    runQuery(queries).then(rows => {
        user_id = (rows.length) ? rows[0].insertId : rows.insertId;
        var all_hobbies;
        if (typeof (hobby) == 'string') {
            all_hobbies = others;
        } else {
            all_hobbies = others.concat(hobby.slice(0, hobby.length - 1));
        }
        var query = `SELECT id FROM hobby WHERE name IN ('${all_hobbies.join("','")}')`;
        return runQuery(query);
    }).then(rows => {
        var uh_ids = rows.map(x => '(' + user_id.toString() + ', ' + x.id.toString() + ')');
        uh_q = `INSERT INTO user_hobby (user_id, hobby_id) VALUES ` + uh_ids.join(',');
        return runQuery(uh_q);
    }).then(rows => {
        req.session.msg = ["Registration Successful", "success"];
        res.redirect('/login');
    }).catch(err => {
        if (err.errno == 1062) {
            req.session.msg = ["Email or username is already in use. Please try different.", "danger"];
            res.redirect('/register');
        } else {
            console.error(err);
            res.sendStatus(500);
        }
    })
});

// logging in the user
app.post('/login', redirects[1], upload.array(), (req, res) => {
    const { email, password } = req.body;

    // query
    var query = ``;

    // checking if the user entered email or username
    if (email.match(/^[a-zA-Z0-9]+@[a-zA-Z]{3,}.[a-zA_Z]{2,3}$/)) {
        query += `SELECT * FROM user WHERE email = '${email}' AND password = '${password}'`;
    } else {
        query += `SELECT * FROM user WHERE username = '${email}' AND password = '${password}'`;
    }

    runQuery(query).then(rows => {
        if (!rows || rows.length == 0) {
            req.session.msg = ["No user found with such credentials. Please try again.", "danger"];
            res.redirect('/login');
        } else {
            req.session.user = rows[0];
            var update_q = `UPDATE user SET timestamp = FROM_UNIXTIME('${Date.now() * 0.001}') WHERE id = '${rows[0].id}'`;
            return runQuery(update_q);
        }
    }).then(rows => {
        res.redirect('/');
    }).catch(err => {
        console.error(err);
        res.sendStatus(500);
    });
});

// Forgot password
app.post('/forgot_password', redirects[1], upload.array(), (req, res) => {
    // getting data
    res.redirect('/forgot_password');
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