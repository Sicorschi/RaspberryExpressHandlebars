const express = require('express')
const router = express.Router()
const { getAllLinks, createNewLink, createLink, deleteLink, editLink, editSelectedLink } = require('../controllers/links.controller');


// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
    console.log('Links routes:');
    const date = new Date().getFullYear();
    console.log('Time: ', date);
    next()
});


router.get('/', getAllLinks)
router.get('/add', createNewLink)
router.post('/add', createLink)
router.get('/delete/:id', deleteLink)
router.get('/edit/:id', editLink)
router.post('/edit/:id', editSelectedLink)


module.exports = router