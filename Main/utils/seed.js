const connection = require('../config/connection');
const { Thoughts, User } = require('../models');
const { userName, email, thought, friend, dates } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');

  // Drop existing thoughts
  await Thoughts.deleteMany({});

  // Drop existing users
  await User.deleteMany({});

  // Create empty array to hold the users and thoughts
  const _users = [];
  const _thoughts = [];

  // Loop  -- add users to the users array
  for (let i = 0; i < userName.length; i++) {

    _users.push({
      userName: userName[i],
      email: email[i],
      friends: [],
      thoughts: [],
      __v: 0,
      friendCount: 0
    });

   _thoughts.push({
      thoughtText: thought[i],
      createAt: dates[i],
      name: userName[i],
      thoughtsId: i
   })  
  }

  // Add User and Thoughts to the collection and await the results
  await User.collection.insertMany(_users);
  await Thoughts.collection.insertMany(_thoughts);

  // Log out the seed data to indicate what should appear in the database
  console.table(_users);
  console.table(_thoughts);
  console.info('Seeding complete! 🌱');
  process.exit(0);
});
