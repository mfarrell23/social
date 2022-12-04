const { Types, default: mongoose } = require('mongoose');
const { Thoughts, User, Reactions } = require('../models');

module.exports = {
  // Get all thoughts
  getThoughts(req, res) {
    console.log('getting all thoughts');
    console.log(req.body);
    Thoughts.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },
  // Get a thought
  getSingleThought(req, res) {
    console.log('getting a single thought');
    console.log(req.body);
    Thoughts.findOne({ _id: req.params.thoughtsId })
        .select('-__v')
        .then((thought) =>
          !thought
            ? res.status(404).json({ message: 'No thought with that ID' })
            : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },
  // Add a thought
  addThought(req, res) {
    console.log('adding a thought');
    console.log(req.body);
    Thoughts.create(req.body)
        .then((thought) => res.json(thought))
        .catch((err) => {
          console.log(err);
          return res.status(500).json(err);
        });
    },
  // Delete a thought
  deleteThought(req, res) {
    console.log('remove a thought');
    console.log(req.body);
    Thoughts.findOneAndDelete({ _id: req.params.thoughtsId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with that ID' })
          : User.deleteMany({ _id: { $in: User.userId } }) && User.deleteMany({ _id: { $in: thought.thoughtsId } }) 
      )
      .then(() => res.json({ message: 'Thought deleted!' }))
      .catch((err) => res.status(500).json(err));
  },
  // Update a thought
  updateThought(req, res) {
    console.log('update a thought');
    console.log(req.body);
    Thoughts.findOneAndUpdate(
      { _id: req.params.thoughtsId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with this id!' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
// Add a reaction
  addReaction(req, res) {
    console.log('adding a reaction');
    console.log(req.body);
    const obj = mongoose.Types.ObjectId()
    Thoughts.findOneAndUpdate(
      { _id: req.params.thoughtsId },
      { $addToSet: { reactions: obj } },
      { runValidators: true, new: true }
    )
      .then((thoughts) =>
        !thoughts
          ? res.status(404).json({ message: 'No thought with this id!' })
          : res.json(thoughts)
      )
      .catch((err) => res.status(500).json(err));
    },
    // Delete a reaction
    deleteReaction(req, res) {
      console.log('remove a reaction');
      console.log(req.body);
      Thoughts.findOneAndUpdate(
        { _id: req.params.thoughtsId },
        { $pull: { reactions: req.params.reactionsId } },
        { runValidators: true, new: true }
      )
        .then((thoughts) =>
          !user
            ? res
                .status(404)
                .json({ message: 'No reaction found with that ID' })
            : res.json(thoughts)
        )
        .catch((err) => res.status(500).json(err));
    },
};
