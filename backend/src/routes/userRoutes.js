const express = require('express');
const UserController = require('../controllers/userController');

const router = express.Router();
const {createUser, getUser, updateUser, deleteUser} = require("../controllers/userController");
router.post('/users', createUser);
router.get('/users/:id', getUser);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

module.exports = router;