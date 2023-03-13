const connection = require('../config/connections');
const { Thought, User } = require('../models');
const { getRandomUserName, getRandomThought, getRandomeEmail } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');

  // Drop existing courses
  await Thought.deleteMany({});

  // Drop existing students
  await User.deleteMany({});

  // Create empty array to hold the students
  const users = [];
  const thoughts = getRandomThought(2);

  for (let i = 0; i < 4; i++) {
    const thoughts = getRandomThought(2);
    const username = getRandomUserName();
    const email = getRandomeEmail();

    users.push({
      username,
      email,
      thoughts,
    });
  }

  await User.collection.insertMany(users);
  await Thought.collection.insertMany(thoughts);


  // Log out the seed data to indicate what should appear in the database
  console.table(users);
  console.info('Seeding complete! 🌱');
  process.exit(0);
});
