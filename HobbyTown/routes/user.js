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

// getting user profile
router.get('/:id', redirects[0], (req, res) => {
    var msg = req.session.msg;
    req.session.msg = null;
    res.render('user_profile', { title: "User Profile", msg: msg });
});

// editing the profile
router.get('/:id/edit', redirects[0], (req, res) => {
    var msg = req.session.msg;
    req.session.msg = null;
    res.render('user_edit', { title: "Edit Profile", msg: msg });
});

// editing the profile (post)
router.post('/:id/edit', redirects[0], (req, res) => {
    // getting data
    const { first_name, last_name, password } = req.body;
    if (req.files) {
        var file = req.files.profile;
        var filename = req.session.user.id.toString() + path.extname(file.name);

        file.mv('public/profile_pics/' + filename, (err) => {
            if (err) {
                res.sendStatus(500)
            } else {
                profile = filename;
                conn.query(`UPDATE user SET profile_pic = '/profile_pics/${filename}' WHERE id = '${req.session.user.id}';`, (err, results, fields) => {
                    if (err) {
                        console.error(err);
                    }
                });
            }
        });
    }
    var query = `UPDATE user SET first_name = '${first_name}', last_name = '${last_name}', 
    password = '${password}' WHERE id = '${req.session.user.id}';`;

    // running the query
    conn.query(query, (err, result, field) => {
        if (err) {
            console.error(err);
            res.sendStatus(500);
        } else {
            req.session.msg = ["Profile Updated. Changes will be visible the next time you login.", "info"];
            res.redirect('/user/' + req.session.user.id);
        }
    });
});

module.exports = router;