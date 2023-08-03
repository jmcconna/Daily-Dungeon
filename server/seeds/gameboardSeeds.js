const Gameboard = require('../models/Gameboard');

const gameboardSeeds = [
  {
    name: 'Forest Realm',
    background: '',
    terrainImages: [],
    environments: ['64caafc01daefe99a84a63b9', '64caafc01daefe99a84a63ba'],
    monsters: ['64caadcc0c1c37a69b07e9bb', '64caadcc0c1c37a69b07e9bc', '64caadcc0c1c37a69b07e9bd'],
  },
  {
    name: 'Desert Lands',
    background: '',
    terrainImages: [],
    environments: ['64caafc01daefe99a84a63ba', '64caafc01daefe99a84a63bb'],
    monsters: ['64caadcc0c1c37a69b07e9be', '64caadcc0c1c37a69b07e9bf', '64caadcc0c1c37a69b07e9bb'],
  },
  {
    name: 'Frozen Wastes',
    background: '',
    terrainImages: [],
    environments: ['64caafc01daefe99a84a63b9', '64caafc01daefe99a84a63bb'],
    monsters: ['64caadcc0c1c37a69b07e9bc', '64caadcc0c1c37a69b07e9be', '64caadcc0c1c37a69b07e9bf'],
  },
];

const seedGameboards = async () => {
  try {
    await Gameboard.deleteMany({});
    await Gameboard.insertMany(gameboardSeeds);

    console.log('Gameboards seeded successfully');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

module.exports = seedGameboards;
