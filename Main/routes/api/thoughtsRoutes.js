const express = require('express');
let router = express.Router();
const {
  getThoughts,
  getSingleThought,
  addThought,
  updateThought,
  deleteThought,
  postReaction,
  deleteReaction
} = require('../../controllers/thoughtsController.js');

// /api/thoughts
router.route('/').get(getThoughts).post(addThought);

// /api/thoughts/:thoughtsId
router.route('/:thoughtsId').get(getSingleThought);

// /api/thoughts/:thoughtsId
router.route('/:thoughtsId').put(updateThought);
// /api/thoughts/:thoughtsId
router.route('/:thoughtsId').delete(deleteThought);

// /api/thoughts/:thoughtsId
// router.route('/:_id/reactions').post(postReaction);

// // /api/thoughts/:thoughtsId
// router.route('/:_id/reactions/:reactionId').delete(deleteReaction);


module.exports = router;
