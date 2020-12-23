const pool = require('../database/database');

async function getAllLinks(req, res) {
    pool.query('SELECT * FROM links').then(links => {
        res.render('links/list', {links})
    }).catch(err => {
        res.json({
            message: err.message
        });
    });
}

async function createNewLink(req, res) {
    res.render('links/add')
}

async function createLink(req, res) {
    const { title, url, description } = req.body;
    const newLink = {
        title,
        url,
        description
    };
    pool.query('INSERT INTO links set ?', [newLink]).then(() => {
        res.redirect('/links');
    }).catch(err => {
        res.json({
            message: err.message
        });
    })
}

async function deleteLink(req, res) {
    console.log(req.params.id);
    const { id } = req.params;
    pool.query('DELETE FROM links WHERE ID = ?', [id]).then(() => {
        res.redirect('/links')
    })
}

async function editLink(req, res) {
    const { id } = req.params;
    pool.query('SELECT * FROM links WHERE ID = ?', [id]).then(link => {
        res.render('links/edit', {link: link[0]})
    }).catch(err => {
        res.json({
            message: err.message
        })
    })
}


async function editSelectedLink(req, res) {
    const { id } = req.params;
    const { title, url, description } = req.body;
    const linkToEdit = {
        title, url, description
    }
    pool.query('UPDATE users set ? WHERE id = ?', [linkToEdit, id]).then(() => {
        res.redirect('/links')
    })
}






module.exports = {
    getAllLinks,
    createNewLink,
    createLink,
    deleteLink,
    editLink,
    editSelectedLink
}
