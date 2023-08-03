require('dotenv').config();
const mongoose = require('mongoose');
const seedUsers = require('./userSeeds');
const seedCharacters = require('./characterSeeds');
const seedItems = require('./itemSeeds');
const seedMonsters = require('./monsterSeeds');
const seedEnvironments = require('./environmentSeeds');
const seedGameboards = require('./gameboardSeeds');

async function seedAll() {
  // await seedUsers();
  await seedCharacters();
  // await seedItems();
  // await seedMonsters();
  // await seedEnvironments();
  // await seedGameboards();

  console.log('Your realm is ready!');
  process.exit(0);
}

async function connectAndSeed() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to the database');
    await seedAll();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

connectAndSeed();
