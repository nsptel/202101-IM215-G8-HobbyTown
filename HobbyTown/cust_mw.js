const redirects = [
    function (req, res, next) {
        if (!req.session.user) {
            res.redirect('/login');
        } else {
            next();
        }
    },
    function (req, res, next) {
        if (req.session.user) {
            res.redirect('/');
        } else {
            next();
        }
    }
]

module.exports = redirects;