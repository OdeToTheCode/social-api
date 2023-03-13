const router = require('express').Router();
const {
  allUsers,
  oneUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend
} = require('../controllers/userController');

router.route('/').get(allUsers).post(createUser);
router.route('/:userId').get(oneUser).put(updateUser).delete(deleteUser);
router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend);

module.exports = router;