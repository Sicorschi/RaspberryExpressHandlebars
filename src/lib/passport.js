const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const pool = require('../database/database')
const helpers = require('../lib/helpers');

passport.use('local.signup', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) => {
    console.log('request body in use method:', req.body);
    const { fullname } = req.body;
    const newAppUser = {
        username,
        password,
        fullname
    }
    newAppUser.password = await helpers.encryptPassword(password)
    pool.query('INSERT INTO appUsers SET ?', [newAppUser]).then(result => {
        newAppUser.id = result.insertId;
        return done(null, newAppUser);
    }).catch(err => {
        return done(err, null);
    })
}))

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser( async (id, done) => {
    pool.query('SELECT * FROM appUsers WHERE id = ?', [id]).then(rows => {
        done(null, rows[0]);
    }).catch(err => {
        done(err, null);
    });
})