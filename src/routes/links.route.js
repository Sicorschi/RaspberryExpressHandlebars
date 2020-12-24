const express = require('express')
const router = express.Router()
const { isLoggedIn } = require('../lib/auth');
const { getAllLinks, createNewLink, createLink, deleteLink, editLink, editSelectedLink } = require('../controllers/links.controller');


// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
    console.log('Links routes:');
    const date = new Date().getFullYear();
    console.log('Time: ', date);
    next()
});


router.get('/', isLoggedIn, getAllLinks)
router.get('/add', isLoggedIn, createNewLink)
router.post('/add', isLoggedIn, createLink)
router.get('/delete/:id', isLoggedIn, deleteLink)
router.get('/edit/:id', isLoggedIn, editLink)
router.post('/edit/:id', isLoggedIn, editSelectedLink)


module.exports = router