const express = require('express');
const { createUser, loginUser, user, updateUser, deleteUser, getUser, getAllUsers } = require('../controllers/userController');
const router = express.Router();

router.route('/').post(createUser).get(getAllUsers);
router.route('/Login').post(loginUser);
router.route('/Filter').post(user);
router.route('/:id').patch(updateUser).delete(deleteUser).get(getUser);

module.exports = router;