const express = require('express');
const router = express.Router();
const { signupForm, signinForm, signin, logoutForm } = require('../controllers/auth.controller');
const passport = require('passport');

router.get('/signup', signupForm)
router.post('/signup', passport.authenticate('local.signup', {
    successRedirect: '/',
    failureRedirect: '/auth/signup',
    failureFlash: true
}))

router.get('/signin', signinForm);
router.post('/signin', signin);
router.get('/logout', logoutForm);

module.exports = router;