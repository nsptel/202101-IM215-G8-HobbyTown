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
    var query = `SELECT * FROM \`group\` WHERE creator = ${req.session.user.id} OR id IN (SELECT group_id FROM user_group WHERE user_id = ${req.session.user.id});`;
    conn.query(query, (err, rows, fields) => {
        if (err) {
            console.error(err);
            res.sendStatus(500);
        } else {
            res.render('group', { title: "Groups", msg: msg, data: {groups: rows} });
        }
    });
});

// group create page
router.get('/create', redirects[0], (req, res) => {
    var msg = req.session.msg;
    req.session.msg = null;
    res.render('group_create', { title: "Create Group", msg: msg });
});

// group view page
router.get('/:id', (req, res) => {
    var msg = req.session.msg;
    req.session.msg = null;
    var query = `SELECT * FROM \`group\` WHERE id = ${req.params.id};`;
    conn.query(query, (err1, result1, fields1) => {
        if (err1) {
            console.error(err1);
            res.sendStatus(500);
        } else {
            var query2 = `SELECT * FROM user WHERE id = ${result1[0].creator}; 
                          SELECT * FROM user WHERE id IN (SELECT user_id FROM user_group WHERE group_id = ${req.params.id});
                          SELECT * FROM event WHERE group_id = ${req.params.id};`;
            conn.query(query2, (err2, result2, fields2) => {
                if (err2) {
                    console.error(err2);
                    res.sendStatus(500);
                } else {
                    res.render('group_view', {title: "Group Page", msg: msg, data: {group: result1, users: result2}});
                }
            });
        }
    });
});

// posts
// group create page
router.post('/create', redirects[0], (req, res) => {
    const {name, group_pic, description} = req.body;

    var query = `INSERT INTO \`group\` (name, creator, description, image) VALUES ('${name}', ${req.session.user.id}, '${description}', '/group_pics/sample_group.png')`;

    // running the query
    conn.query(query, (err, result, field) => {
        if (err) {
            console.error(err);
            res.sendStatus(500);
        } else {
            if (req.files) {
                var file = req.files.group_pic;
                var filename = result.insertId.toString() + path.extname(file.name);

                file.mv('public/group_pics/' + filename, (err) => {
                    if (err) {
                        res.sendStatus(500)
                    } else {
                        profile = filename;
                        conn.query(`UPDATE \`group\` SET image = '/group_pics/${filename}' WHERE id = '${result.insertId}';`, (err, row, fields) => {
                            if (err) {
                                console.error(err);
                                res.sendStatus(500);
                            }
                        });
                    }
                });
            }
            req.session.msg = ["Group successfully created.", "success"];
            res.redirect('/group');
        }
    });
});


module.exports = router;