const express = require('express')
const router = express.Router()
const { getAllUsers, createNewUser, createUser } = require('../controllers/users.controller');


// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next()
})

// define the home page route
router.get('/', getAllUsers)
router.get('/add', createNewUser)
router.post('/add', createUser)

// define the about route
router.get('/about', function (req, res) {
  res.send('About users')
})

module.exports = router