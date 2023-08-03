const Environment = require('../models/Environment');

const environmentSeeds = [
  {
    name: 'Haunted Forest',
    description: 'A dark and eerie forest filled with ominous whispers and unseen threats.',
    resources: ['64caad495be60356d84127b7', '64caad495be60356d84127b8'],
    badOutcomes: [
      'Attacked by a ghostly apparition, lose 15 health.',
      'Caught in a mysterious trap, lose 10 health.',
      'Lost in the forest and injured, lose 20 health.',
    ],
  },
  {
    name: 'Desert Wasteland',
    description: 'A barren desert that stretches beyond the horizon, hot and merciless.',
    resources: ['64caad495be60356d84127b7', '64caad495be60356d84127b9'],
    badOutcomes: [
      'Dehydrated and weak, lose 15 health.',
      'Attacked by a desert serpent, lose 20 health.',
      'Caught in a sandstorm, lose 10 health.',
    ],
  },
  {
    name: 'Icy Tundra',
    description: 'A freezing, windswept land covered in snow and ice, with hidden dangers.',
    resources: ['64caad495be60356d84127b8', '64caad495be60356d84127b9'],
    badOutcomes: [
      'Frostbite due to severe cold, lose 15 health.',
      'Slipped on ice, lose 10 health.',
      'Caught in a blizzard, lose 20 health.',
    ],
  },
];

const seedEnvironments = async () => {
  try {
    await Environment.deleteMany({});
    await Environment.insertMany(environmentSeeds);

    console.log('Environments seeded successfully');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

module.exports = seedEnvironments;
