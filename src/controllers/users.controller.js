const pool = require('../database/database');

async function getAllUsers(req, res) {
    res.json({
        message: 'Users'
    })
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
        res.json({
            message: 'form data created',
            data: user.insertId
        })
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
