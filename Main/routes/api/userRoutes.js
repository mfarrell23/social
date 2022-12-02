const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  postFriend,
  deleteFriend,
} = require('../../controllers/usersController');

// /api/users
router.route('/').get(getUsers);

router.route('/').post(createUser);

// /api/users/:userId
router.route('/:userId').get(getSingleUser)

router.route('/:userId').delete(deleteUser);

// /api/users/:userId
router.route('/:userId').update(updateUser);

router.route('/:userId/friends/:friendId').post(postFriend);

router.route('/:userId/friends/:friendId').delete(deleteFriend);


module.exports = router;
