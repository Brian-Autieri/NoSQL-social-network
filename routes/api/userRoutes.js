const router = require("express").Router();
const {
  getAllUsers,
  getUserById,
  postNewUser,
  updateUserById,
  deleteUserById,
  addFriend,
  removeFriend,
} = require("../../controllers/userController.js");

router.route("/").get(getAllUsers).post(postNewUser);

router
  .route("/:id")
  .get(getUserById)
  .put(updateUserById)
  .delete(deleteUserById);

router.route("/:userId/friends/:friendId").post(addFriend).delete(removeFriend);

module.exports = router;
