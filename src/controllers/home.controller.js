const pool = require('../database/database');

async function getDashboard(req, res) {
    const links = await pool.query('SELECT * FROM links WHERE user_id = ?', [req.user.id]);
    const users = await pool.query('SELECT * FROM users WHERE appuser_id = ?', [req.user.id]);
    res.render('home/list', {links, users});
}

async function getIndex(req, res) {
    res.render('index')
}





module.exports = {
    getDashboard,
    getIndex
}
