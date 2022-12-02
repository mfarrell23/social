const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  postReaction,
  deleteReaction
} = require('../../controllers/thoughtsController.js');

// /api/thoughts
router.route('/').get(getThoughts);

// /api/thoughts/:thoughtsId
router.route(':thoughtsId').get(getSingleThought);

// /api/thoughts
router.route('/').create(createThought);

// /api/thoughts/:thoughtsId
router.route('/:thoughtsId').update(updateThought);
// /api/thoughts/:thoughtsId
router.route('/:thoughtsId').delete(deleteThought);

// /api/thoughts/:thoughtsId
router.route('/:thoughtsId/reactions').update(postReaction);

// /api/thoughts/:thoughtsId
router.route('/:thoughtsId/reactions/:reactionId').delete(deleteReaction);


module.exports = router;
