const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// middleware
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));

// gets
// index
app.get('/', (req, res) => {
    res.render('index', { title: "Home"});
});

// listening on the port
app.listen('1234', function () {
    console.log('server running on 1234');
});