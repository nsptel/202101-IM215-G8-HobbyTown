const express = require('express');
const path = require('path');
const multer = require('multer');
const router = express.Router();
const redirects = require('../cust_mw');
const conn = require('../db_conn');
const fileupload = require('express-fileupload');
var upload = multer();

// middleware
router.use(express.json());
router.use(fileupload());

// custom middleware
router.use((req, res, next) => {
    res.locals.user = req.session.user;
    next();
});

// gets
// group page
router.get('/', redirects[0], (req, res) => {
    var msg = req.session.msg;
    req.session.msg = null;

    // getting groups from db
    var query = `SELECT * FROM event WHERE event.group_id IN (SELECT \`group\`.id FROM \`group\` WHERE creator = ${req.session.user.id} OR id IN (SELECT group_id FROM user_group WHERE user_id = ${req.session.user.id}));`;
    conn.query(query, (err, rows, fields) => {
        if (err) {
            console.error(err);
            res.sendStatus(500);
        } else {
            res.render('event', { title: "Events", msg: msg, data: {events: rows} });
        }
    });
});

// group create page
router.get('/create/:id', redirects[0], (req, res) => {
    var msg = req.session.msg;
    req.session.msg = null;
    res.render('event_create', { title: "Create Event", msg: msg, data: {groupId: req.params.id} });
});

// posts
// group create page
router.post('/create/:group_id', redirects[0], (req, res) => {
    const {name, description, date, time} = req.body;
    var dateParts = date.split('-');
    var timeParts = time.split(':');
    var timestamp = new Date(dateParts[0], parseInt(dateParts[1], 10) - 1, dateParts[2], timeParts[0], timeParts[1]).getTime();
    var query = `INSERT INTO event (name, description, event_date, group_id, image) VALUES ('${name}', '${description}', FROM_UNIXTIME(${timestamp} / 1000), ${req.params.group_id}, '/event_pics/sample_event.png')`;

    // running the query
    conn.query(query, (err, result, field) => {
        if (err) {
            console.error(err);
            res.sendStatus(500);
        } else {
            if (req.files) {
                var file = req.files.event_pic;
                var filename = result.insertId.toString() + path.extname(file.name);

                file.mv('public/event_pics/' + filename, (err) => {
                    if (err) {
                        res.sendStatus(500)
                    } else {
                        profile = filename;
                        conn.query(`UPDATE event SET image = '/event_pics/${filename}' WHERE id = '${result.insertId}';`, (err, row, fields) => {
                            if (err) {
                                console.error(err);
                                res.sendStatus(500);
                            }
                        });
                    }
                });
            }
            req.session.msg = ["Event successfully created.", "success"];
            res.redirect('/event');
        }
    });
});

module.exports = router;