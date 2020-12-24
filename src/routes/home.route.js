const express = require('express')
const router = express.Router();
const { isLoggedIn } = require('../lib/auth');
const { getDashboard, getIndex } = require('../controllers/home.controller');

router.get('/home', isLoggedIn, getDashboard)
router.get('/', getIndex)


module.exports = router