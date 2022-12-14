const { User } = require('../models');

module.exports = {
  // Get all users
  getUsers(req, res) {
    console.log('getting all users');
    console.log(req.body);
    User.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },
  // Get a user
  getSingleUser(req, res) {
    console.log('getting a user');
    console.log(req.body);
    User.findOne({ _id: req.params.userId })
        .select('-__v')
        .then((user) =>
          !user
            ? res.status(404).json({ message: 'No user with that ID' })
            : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },
  // Add a user
  addUser(req, res) {
    console.log('Adding a user');
    console.log(req.body);
    User.create(req.body)
        .then((users) => res.json(users))
        .catch((err) => {
          console.log(err);
          return res.status(500).json(err);
        });
  },
  // Delete a user
  deleteUser(req, res) {
    console.log('removed as user');
    console.log(req.body);
    User.findOneAndDelete({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : User.deleteMany({ _id: { $in: user.Friends } })
      )
      .then(() => res.json({ message: 'User and thoughts deleted!' }))
      .catch((err) => res.status(500).json(err));
  },
  // Update a user
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with this id!' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
   // Post a friend to a user
    postFriend(req, res) {
      console.log('adding a friend');
      console.log(req.body);
      User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.params.friendId } },
        { runValidators: true, new: true }
      )
      .then((user) =>
        !user
          ? res
              .status(404)
              .json({ message: 'No user found with that ID' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
    },
  //delete friend
  deleteFriend(req, res) {
    console.log('deleted a friend');
    console.log(req.body);
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res
              .status(404)
              .json({ message: 'No friend found with that ID' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
};
