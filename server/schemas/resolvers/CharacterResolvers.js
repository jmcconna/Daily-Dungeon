const { Character, User, Item } = require('../../models');
const {
  UserInputError,
  AuthenticationError,
} = require('apollo-server-express');

const characterResolvers = {
  Query: {
    getCharacter: async (_, { _id }) => {
      return await Character.findById(_id)
        .populate('inventory.item')
        .populate('weapon')
        .populate('armor');
    },
    getCharacters: async () => {
      return await Character.find()
        .populate('inventory.item')
        .populate('weapon')
        .populate('armor');
    },
    getCharactersByUserID: async (_, { user }) => {
      return await Character.find({ user })
        .populate('inventory.item')
        .populate('weapon')
        .populate('armor');
    },
  },

  Mutation: {
    createCharacter: async (
      _,
      { user, class: charClass, baseHealth, currentHealth }
    ) => {
      const existingUser = await User.findById(user);
      if (!existingUser) {
        throw new UserInputError('Invalid user. Please try again.');
      }

      const character = await Character.create({
        user,
        class: charClass,
        baseHealth,
        currentHealth,
        currentHealth: baseHealth,
      });

      return character;
    },
    updateCharacter: async (
      _,
      {
        _id,
        class: charClass,
        level,
        experience,
        baseHealth,
        currentHealth,
        damage,
        gold,
        gameboardState,
      }
    ) => {
      return await Character.findByIdAndUpdate(
        _id,
        {
          class: charClass,
          level,
          experience,
          baseHealth,
          currentHealth,
          damage,
          gold,
          gameboardState,
        },
        { new: true }
      );
    },
    deleteCharacter: async (_, { _id }) => {
      const result = await Character.findByIdAndDelete(_id);
      return !!result;
    },
    
    // Inventory specific mutations
    equipWeapon: async (_, { characterId, itemId }) => {
      const character = await Character.findById(characterId);
      const item = await Item.findById(itemId);
      if (item.type !== 'weapon')
        throw new UserInputError('Item is not a weapon.');

      character.weapon = itemId;
      await character.save();
      const populatedCharacter = await Character.findById(characterId).populate(
        'weapon'
      );

      return populatedCharacter;
    },

    equipArmor: async (_, { characterId, itemId }) => {
      const character = await Character.findById(characterId);
      const item = await Item.findById(itemId);
      if (item.type !== 'armor') throw new UserInputError('Item is not armor.');

      character.armor = itemId;
      await character.save();
      const populatedCharacter = await Character.findById(characterId).populate(
        'armor'
      );

      return populatedCharacter;
    },

    addItemToInventory: async (_, { characterId, itemId }) => {
      const character = await Character.findById(characterId);
      const existingItemIndex = character.inventory.findIndex(
        (i) => i.item.toString() === itemId
      );

      if (existingItemIndex !== -1) {
        character.inventory[existingItemIndex].quantity += 1;
      } else {
        character.inventory.push({ item: itemId, quantity: 1 });
      }

      await character.save();
      const populatedCharacter = await Character.findById(characterId).populate(
        'inventory.item'
      );

      return populatedCharacter;
    },

    removeItemFromInventory: async (_, { characterId, itemId }) => {
      const character = await Character.findById(characterId);
      const existingItemIndex = character.inventory.findIndex(
        (i) => i.item.toString() === itemId
      );

      if (existingItemIndex !== -1) {
        if (character.inventory[existingItemIndex].quantity > 1) {
          character.inventory[existingItemIndex].quantity -= 1;
        } else {
          character.inventory.splice(existingItemIndex, 1);
        }
      }

      return await character.save();
    },

    // handle updates to gameboardState
    updateGameState: async (_, { characterId, gameState }) => {
      const character = await Character.findByIdAndUpdate(
        characterId,
        { gameboardState: gameState },
        { new: true, runValidators: true }
      );
      return character;
    },
  },
};

module.exports = characterResolvers;
