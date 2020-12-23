const express = require('express')
const router = express.Router()
const { getAllUsers, createNewUser, createUser, deleteUser, editUser, editSelectedUser } = require('../controllers/users.controller');


// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  console.log('Users routes:');
  const date = new Date().getFullYear();
  console.log('Time: ', date);
  next()
});


router.get('/', getAllUsers)
router.get('/add', createNewUser)
router.post('/add', createUser)
router.get('/delete/:id', deleteUser)
router.get('/edit/:id', editUser)
router.post('/edit/:id', editSelectedUser)


module.exports = router