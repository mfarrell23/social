const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
} = require('../../controllers/userController');

// /api/users
router.route('/').get(getUsers);

router.route('/').post(createUser);

// /api/users/:userId
router.route('/:userId').get(getSingleUser)

router.route('/:userId').delete(deleteUser);

// /api/students/:studentId/assignments
// router.route('/:studentId/assignments').post(addAssignment);

// /api/users/:userId
router.route('/:userId').update(updateUser);

router.route('/:userId/friends/:friendId');



module.exports = router;
