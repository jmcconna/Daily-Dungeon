const Character = require('../models/Character');

const characterSeeds = [
  // User 1
  {
    user: '64cd3b8b27b50f610a199652',
    class: 'Fighter',
    name: 'Thorgar Ironfist',
  },
  {
    user: '64cd3b8b27b50f610a199652',
    class: 'Ranger',
    name: 'Elandrial Swiftwind',
  },
  // User 2
  {
    user: '64cd3b8b27b50f610a199653',
    class: 'Ranger',
    name: 'Faelar Greenleaf',
  },
  {
    user: '64cd3b8b27b50f610a199653',
    class: 'Wizard',
    name: 'Arius Stormcaller',
  },
  // User 3
  {
    user: '64cd3b8b27b50f610a199654',
    class: 'Fighter',
    name: 'Brogan Hammerfall',
  },
  {
    user: '64cd3b8b27b50f610a199654',
    class: 'Wizard',
    name: 'Seraphina Flameheart',
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
