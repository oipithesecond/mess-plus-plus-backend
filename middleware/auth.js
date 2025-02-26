const passport = require('passport');

exports.googleAuth = passport.authenticate('google', {
    scope: ['profile', 'email'],
});

exports.googleCallback = passport.authenticate('google', {
    failureRedirect: '/',
});

exports.ensureAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/auth/google'); 
};

exports.logout = (req, res) => {
    req.logout(() => {
        res.redirect('/');
    });
};
