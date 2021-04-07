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
    res.render('event', { title: "Events", msg: msg });
});

// group create page
router.get('/create', redirects[0], (req, res) => {
    var msg = req.session.msg;
    req.session.msg = null;
    res.render('event_create', { title: "Create Event", msg: msg });
});

// posts
// group create page
router.post('/create', redirects[0], (req, res) => {
    var msg = req.session.msg;
    req.session.msg = null;
    res.render('event_create');
});

module.exports = router;