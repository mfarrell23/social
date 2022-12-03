const express = require('express');
let router = express.Router();
const {
  getUsers,
  getSingleUser,
  addUser,
  updateUser,
  deleteUser,
  postFriend,
  deleteFriend,
} = require('../../controllers/usersController.js');

// /api/users
router.route('/').get(getUsers);

router.route('/').post(addUser);

// /api/users/:userId
router.route('/:userId').get(getSingleUser)

// /api/users/:userId
router.route('/:userId').delete(deleteUser);

// /api/users/:userId
router.route('/:userId').put(updateUser);

// /api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId').post(postFriend).delete(removeFriend);

// /api/users/:userId/friends/:friendId
 router.route('/:userId/friends/:friendId').delete(deleteFriend);


module.exports = router;
