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

  // Loop 20 times -- add students to the students array
  for (let i = 0; i < userName.length; i++) {
    // Get some random assignment objects using a helper function that we imported from ./data

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

  // Add courses to the collection and await the results
  // await Thoughts.collection.insertOne({
  //   courseName: 'UCLA',
  //   inPerson: false,
  //   users: [...],
  // });

  // // Add courses to the collection and await the results
  // await Users.collection.insertOne({
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
