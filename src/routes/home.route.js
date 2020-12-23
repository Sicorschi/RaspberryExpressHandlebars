const express = require('express')
const router = express.Router()
const { getDashboard } = require('../controllers/home.controller');



// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
    console.log('Home routes:');
    const date = new Date().getFullYear();
    console.log('Time: ', date);
    next()
});

router.get('/', getDashboard)


module.exports = router