const pool = require('../database/database');

async function getAllUsers(req, res) {
    pool.query('SELECT * FROM users').then(users => {
        res.render('users/list', {users})
    }).catch(err => {
        res.json({
            message: err.message
        });
    });
}

async function createNewUser(req, res) {
    res.render('users/add')
}

async function createUser(req, res) {
    const { username, password, fullname } = req.body;
    const newUser = {
        username,
        password,
        fullname
    };
    pool.query('INSERT INTO users set ?', [newUser]).then(user => {
        res.redirect('/users');
    }).catch(err => {
        res.json({
            message: err.message
        });
    })
}






module.exports = {
    getAllUsers,
    createNewUser,
    createUser
}
