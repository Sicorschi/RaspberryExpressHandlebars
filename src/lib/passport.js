const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const pool = require('../database/database')
const helpers = require('../lib/helpers');

passport.use('local.signin', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) => {
    const appUser = await pool.query('SELECT * FROM appUsers WHERE username = ?', [username]);
    if (appUser.length > 0) {
        const validPassword = await helpers.login(password, appUser[0].password);
        if (validPassword) {
            done(null, appUser[0], req.flash('welcome_message', 'Welcome ' + appUser[0].username))
        } else {
            done(null, false, req.flash('message', 'Incorrect password'))
        }
    } else {
        return done(null, false, req.flash('message', 'Username not found'))
    }
    
}))

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
        return done(err, false);
    })
}))

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser( async (id, done) => {
    pool.query('SELECT * FROM appUsers WHERE id = ?', [id]).then(rows => {
        done(null, rows[0]);
    }).catch(err => {
        done(err, false);
    });
})