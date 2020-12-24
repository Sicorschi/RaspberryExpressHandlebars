const express = require('express')
const router = express.Router();
const { isLoggedIn } = require('../lib/auth');
const { getAllUsers, createNewUser, createUser, deleteUser, editUser, editSelectedUser } = require('../controllers/users.controller');


// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  console.log('Users routes:');
  const date = new Date().getFullYear();
  console.log('Time: ', date);
  next()
});


router.get('/', isLoggedIn, getAllUsers)
router.get('/add', isLoggedIn, createNewUser)
router.post('/add', isLoggedIn, createUser)
router.get('/delete/:id', isLoggedIn, deleteUser)
router.get('/edit/:id', isLoggedIn, editUser)
router.post('/edit/:id', isLoggedIn, editSelectedUser)


module.exports = router