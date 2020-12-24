const passport = require('passport');

function signupForm(req, res) {
    res.render('auth/signup')
}

function signinForm(req, res) {
    res.render('auth/signin')
}

async function signin(req, res, next) {
    passport.authenticate('local.signin', {
        successRedirect: '/',
        failureRedirect: '/auth/signin',
        failureFlash: true
    })(req, res, next)
}


module.exports = {
    signupForm,
    signinForm,
    signin
}