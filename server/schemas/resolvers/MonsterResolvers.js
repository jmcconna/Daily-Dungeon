const { Monster, Item } = require('../../models');

const monsterResolvers = {
  Query: {
    getMonsters: async () => {
      return await Monster.find().populate('loot');
    },
    getMonster: async (_, { _id }) => {
      return await Monster.findById(_id).populate('loot');
    },
  },
  Mutation: {
    createMonster: async (_, { name, image, baseHealth, baseAttack, loot }) => {
      const monster = await Monster.create({
        name,
        image,
        baseHealth,
        baseAttack,
        loot,
      });
      return monster;
    },
    updateMonster: async (
      _,
      { _id, name, image, baseHealth, baseAttack, loot }
    ) => {
      return await Monster.findByIdAndUpdate(
        _id,
        { name, image, baseHealth, baseAttack, loot },
        { new: true }
      );
    },
    deleteMonster: async (_, { _id }) => {
      const result = await Monster.findByIdAndDelete(_id);
      return !!result;
    },
  },
};

module.exports = monsterResolvers;
