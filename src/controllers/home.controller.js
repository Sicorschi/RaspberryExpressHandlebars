const pool = require('../database/database');

async function getDashboard(req, res) {
    const links = await pool.query('SELECT * FROM links');
    console.log(links);
    const users = await pool.query('SELECT * FROM users');
    console.log(users);
    res.render('home/list', {links, users});
    // pool.query('SELECT * FROM links').then(links => {
    //     res.render('home/list', {links})
    //     // pool.query('SELECT * FROM users').then(users => {
    //     //     res.render('home/list', {links}, {users})
    //     // }).catch(err => {
    //     //     console.log(err);
    //     //     res.json({
    //     //         message: err.message
    //     //     })
    //     // })
       
    // }).catch(err => {
    //     res.json({
    //         message: err.message
    //     });
    // });
}





module.exports = {
    getDashboard
}
