const express = require('express');
const router = express.Router();
const { signup } = require('../controllers/auth.controller');
const passport = require('passport');

router.get('/signup', signup)
router.post('/signup', passport.authenticate('local.signup', {
    successRedirect: '/',
    failureRedirect: '/auth/signup',
    failureFlash: true
}))

module.exports = router;