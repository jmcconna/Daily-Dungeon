const Monster = require('../models/Monster');

const monsterSeeds = [
    {
      name: 'Orc Warrior',
      baseHealth: 120,
      baseAttack: 20,
      loot: ['64caad495be60356d84127b7', '64caad495be60356d84127b8'],
    },
    {
      name: 'Goblin Thief',
      baseHealth: 80,
      baseAttack: 15,
      loot: ['64caad495be60356d84127b8', '64caad495be60356d84127b9'],
    },
    {
      name: 'Troll Brute',
      baseHealth: 200,
      baseAttack: 25,
      loot: ['64caad495be60356d84127b9', '64caad495be60356d84127b7'],
    },
    {
      name: 'Cave Spider',
      baseHealth: 60,
      baseAttack: 10,
      loot: ['64caad495be60356d84127b7', '64caad495be60356d84127b8'],
    },
    {
      name: 'Skeleton Archer',
      baseHealth: 100,
      baseAttack: 18,
      loot: ['64caad495be60356d84127b9', '64caad495be60356d84127b8'],
    },
  ];
  
  const seedMonsters = async () => {
    try {
      await Monster.deleteMany({});
      await Monster.insertMany(monsterSeeds);
  
      console.log('Monsters seeded successfully');
    } catch (err) {
      console.error(err);
      process.exit(1);
    }
  };

  module.exports = seedMonsters;
  