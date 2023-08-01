const { Item } = require('../../models');
const { UserInputError } = require('apollo-server-express');

const itemResolvers = {
  Query: {
    getItems: async () => {
      return await Item.find();
    },
    getItem: async (_, { _id }) => {
      return await Item.findById(_id);
    },
  },

  Mutation: {
    createItem: async (_, args) => {
      return await Item.create(args);
    },
    updateItem: async (_, { _id, ...rest }) => {
      const item = await Item.findById(_id);

      if (!item) {
        throw new UserInputError('Item not found.');
      }

      Object.assign(item, rest);

      if (item.levelUp()) {
        console.log('Item leveled up! Sweet!');
      }

      await item.save();

      return item;
    },
    deleteItem: async (_, { _id }) => {
      const result = await Item.findByIdAndDelete(_id);
      return !!result;
    },

    // handling vendor interactions
    buyItem: async (_, { characterId, itemId }) => {
      const character = await Character.findById(characterId);
      const item = await Item.findById(itemId);

      if (character.gold < item.price) {
        throw new Error('Insufficient gold to complete purchase');
      }

      const inventoryItem = character.inventory.find((invItem) =>
        invItem.item.equals(itemId)
      );

      if (inventoryItem) {
        inventoryItem.quantity += 1;
      } else {
        character.inventory.push({ item: itemId, quantity: 1 });
      }

      character.gold -= item.price;

      await character.save();

      return character;
    },
    sellItem: async (_, { characterId, itemId }) => {
      const character = await Character.findById(characterId);
      const itemIndex = character.inventory.findIndex((invItem) =>
        invItem.item.equals(itemId)
      );

      if (itemIndex === -1) {
        throw new Error('Item not found in inventory');
      }

      const inventoryItem = character.inventory[itemIndex];
      const item = await Item.findById(itemId);
      const sellPrice = Math.floor(item.price / 2); // Assuming you sell for half the buy price

      inventoryItem.quantity -= 1;

      if (inventoryItem.quantity === 0) {
        character.inventory.splice(itemIndex, 1);
      }

      character.gold += sellPrice;

      await character.save();

      return character;
    },
  },
};

module.exports = itemResolvers;
