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

async function deleteUser(req, res) {
    console.log(req.params.id);
    const { id } = req.params;
    pool.query('DELETE FROM users WHERE ID = ?', [id]).then(response => {
        res.redirect('/users')
    })
}

async function editUser(req, res) {
    const { id } = req.params;
    pool.query('SELECT * FROM users WHERE ID = ?', [id]).then(user => {
        res.render('users/edit', {user: user[0]})
    }).catch(err => {
        res.json({
            message: err.message
        })
    })
}


async function editSelectedUser(req, res) {
    const { id } = req.params;
    const { username, password, fullname } = req.body;
    const userToEdit = {
        username, password, fullname
    }
    pool.query('UPDATE users set ? WHERE id = ?', [userToEdit, id]).then(response => {
        console.log(response);
        res.redirect('/users')
    })
}






module.exports = {
    getAllUsers,
    createNewUser,
    createUser,
    deleteUser,
    editUser,
    editSelectedUser
}
