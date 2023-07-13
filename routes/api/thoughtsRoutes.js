const router = require('express').Router();
const {
  getAllThoughts,
  getThoughtById,
  createNewThought,
  updateThoughtById,
  deleteThoughtById,
  deleteReactionById,
  createNewReaction,
} = require('../../controllers/thoughtsController.js');

router.route('/').get(getAllThoughts).post(createNewThought);

router
  .route('/:id')
  .get(getThoughtById)
  .put(updateThoughtById)
  .delete(deleteThoughtById);

router.route('/:thoughtId/reactions').post(createNewReaction);

router.route('/:thoughtId/reactions/:reactionId').get(createNewReaction);

router.route('/:thoughtId/reactions/:reactionId').delete(deleteReactionById);

module.exports = router;
