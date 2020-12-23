const passport = require('passport');

function signup(req, res) {
    res.render('auth/signup')
}

// async function signupUser(req, res) {
//     console.log(req.body);
//     passport.authenticate('local.signup', {
//         successRedirect: '/',
//         failureRedirect: '/auth/signup',
//         failureFlash: true
//     })
//     res.json({
//         message: 'Recibido'
//     })
// }


module.exports = {
    signup,
    // signupUser
}