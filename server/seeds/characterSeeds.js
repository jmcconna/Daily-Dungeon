const Character = require('../models/Character');

const characterSeeds = [
  // User 1
  {
    user: '64caac74133998df2aace5a7',
    class: 'Paladin',
    baseHealth: 100,
    currentHealth: 100,
  },
  {
    user: '64caac74133998df2aace5a7',
    class: 'Ranger',
    baseHealth: 80,
    currentHealth: 80,
  },
  // User 2
  {
    user: '64caac74133998df2aace5a8',
    class: 'Ranger',
    baseHealth: 80,
    currentHealth: 80,
  },
  {
    user: '64caac74133998df2aace5a8',
    class: 'Sorcerer',
    baseHealth: 70,
    currentHealth: 70,
  },
  // User 3
  {
    user: '64caac74133998df2aace5a9',
    class: 'Paladin',
    baseHealth: 100,
    currentHealth: 100,
  },
  {
    user: '64caac74133998df2aace5a9',
    class: 'Sorcerer',
    baseHealth: 70,
    currentHealth: 70,
  },
];

const seedCharacters = async () => {
  try {
    await Character.deleteMany({});
    await Character.insertMany(characterSeeds);

    console.log('Characters seeded successfully');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

module.exports = seedCharacters;
