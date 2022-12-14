const express = require('express');
let router = express.Router();
const {
  getThoughts,
  getSingleThought,
  addThought,
  updateThought,
  deleteThought,
  deleteReaction,
  addReaction
} = require('../../controllers/thoughtsController.js');

// /api/thoughts
router.route('/').get(getThoughts);

router.route('/').post(addThought);
// /api/thoughts/:thoughtsId
router.route('/:thoughtsId').get(getSingleThought);

// /api/thoughts/:thoughtsId
router.route('/:thoughtsId').put(updateThought);

// /api/thoughts/:thoughtsId
router.route('/:thoughtsId').delete(deleteThought);

// /api/thoughts/:thoughtsId/reactions/:reactionsId
router.route('/:thoughtsId/reactions').post(addReaction);

 //api/thoughts/:thoughtsId/reactions/:reactionsId
router.route('/:thoughtsId/reactions/:reactionsId').delete(deleteReaction);


module.exports = router;
