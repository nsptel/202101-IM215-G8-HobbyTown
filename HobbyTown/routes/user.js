const express = require('express');
const router = express.Router();
var upload = multer();

// middleware
router.use(express.json());

// getting user profile
router.get('/:id', redirects[0], (req, res) => {
    res.render('user_profile', { title: "User Profile", msg: msg });
});

// editing the profile
router.get('/:id/edit', redirects[0], (req, res) => {
    res.render('user_edit', { title: "Edit Profile", msg: msg });
});

// editing the profile (post)
router.post('/:id/edit', redirects[0], (req, res) => {
    // to be implemented
});

module.exports = router;