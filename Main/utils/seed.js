const connection = require('../config/connection');
const { Thoughts, User } = require('../models');
const { userName, email, thought, friend, dates } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');

  // Drop existing courses
  await Thoughts.deleteMany({});

  // Drop existing students
  await User.deleteMany({});

  // Create empty array to hold the students
  const _users = [];
  const _thoughts = [];
  const _friends = [];

  // Loop 20 times -- add students to the students array
  for (let i = 0; i < userName.length; i++) {
    // Get some random assignment objects using a helper function that we imported from ./data

    const _name = userName[i]
    const _email = email[i]
    const _thought = thought[i]
    const _friend = friend[i]

    _users.push({
      _name,
      _email,
      _thought,
      _friend
    });

    const _thoughtId = i;
    const _thoughtText = _thought
    const _createAt = dates[i]
    const _userName = _name


   _thought.push({
      _thoughtId,
      _thoughtText,
      _createAt,
      _userName
   }) 
  
  }

  // Add User and Thoughts to the collection and await the results
  await User.collection.insertMany(_users);
  await Thoughts.connection.insertMany(_thoughts);

  // Add courses to the collection and await the results
  // await Thoughts.collection.insertOne({
  //   courseName: 'UCLA',
  //   inPerson: false,
  //   users: [...],
  // });

  // // Add courses to the collection and await the results
  // await Thoughts.collection.insertOne({
  //   courseName: 'UCLA',
  //   inPerson: false,
  //   users: [...],
  // });

  // Log out the seed data to indicate what should appear in the database
  console.table(_users);
  console.table(_thoughts);
  console.info('Seeding complete! 🌱');
  process.exit(0);
});
