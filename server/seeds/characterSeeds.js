const Character = require('../models/Character');

const characterSeeds = [
  // User 1
  {
    user: '64caac74133998df2aace5a7',
    class: 'Fighter',
  },
  {
    user: '64caac74133998df2aace5a7',
    class: 'Ranger',
  },
  // User 2
  {
    user: '64caac74133998df2aace5a8',
    class: 'Ranger',
  },
  {
    user: '64caac74133998df2aace5a8',
    class: 'Wizard',
  },
  // User 3
  {
    user: '64caac74133998df2aace5a9',
    class: 'Fighter',
  },
  {
    user: '64caac74133998df2aace5a9',
    class: 'Wizard',
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
