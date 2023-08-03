const { Gameboard, Environment, Monster, Item } = require('../../models');

const gameboardResolvers = {
  Query: {
    getGameboard: async (_, { _id }) => {
      const gameboard = await Gameboard.findById(_id)
        .populate('environments')
        .populate('monsters')
      if (!gameboard) {
        throw new Error('Gameboard not found');
      }

      gameboard.environments = await spawnEnvironments(gameboard.environments);
      gameboard.monsters = await spawnMonsters(gameboard.monsters);

      return gameboard;
    },
    getGameboards: async () => {
      return await Gameboard.find()
        .populate('environments')
        .populate('monsters')
    },
  },

  Mutation: {
    createGameboard: async (
      _,
      { name, background, terrainImages, environments, monsters }
    ) => {
      return await Gameboard.create({
        name,
        background,
        terrainImages,
        environments,
        monsters,
      });
    },
    updateGameboard: async (
      _,
      { _id, name, background, terrainImages, environments, monsters }
    ) => {
      return await Gameboard.findByIdAndUpdate(
        _id,
        {
          name,
          background,
          terrainImages,
          environments,
          monsters,
        },
        { new: true }
      );
    },
    deleteGameboard: async (_, { _id }) => {
      const result = await Gameboard.findByIdAndDelete(_id);
      return !!result;
    },
  },
};

// functions to help render random gameboard
function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function spawnEnvironments(environments) {
  return [...Array(randomNumber(4, 5))].map(
    () => environments[Math.floor(Math.random() * environments.length)]
  );
}

async function spawnMonsters(monsters) {
  return [...Array(randomNumber(5, 7))].map(
    () => monsters[Math.floor(Math.random() * monsters.length)]
  );
}

// removing this for now. can look at adding it back if we have time to implement. 
// async function spawnLoot(loot) {
//     const randomValue = Math.random();
  
//     let lootCount = 0; // Default value. loot isn't easy to come by
  
//     if (randomValue < 0.05) {
//       lootCount = 2; // 5% chance for 2 items
//     } else if (randomValue < 0.15) {
//       lootCount = 1; // 10% chance for 1 item
//     }
  
//     return [...Array(lootCount)].map(() => loot[Math.floor(Math.random() * loot.length)]);
//   }
  

module.exports = gameboardResolvers;
