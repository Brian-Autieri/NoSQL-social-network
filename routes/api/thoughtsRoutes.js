const router = require("express").Router();
const {
  getAllThoughts,
  getThoughtById,
  createNewThought,
  updateThoughtById,
  deleteThoughtById,
  addReaction,
  removeReaction,
} = require("../../controllers/thoughtsController.js");

router.route("/").get(getAllThoughts).post(createNewThought);

router
  .route("/:id")
  .get(getThoughtById)
  .put(updateThoughtById)
  .delete(deleteThoughtById);

// router.route("/:thoughtId/reactions").post(addReaction);

// router.route("/:thoughtId/reactions/:reactionId").delete(removeReaction);

module.exports = router;
