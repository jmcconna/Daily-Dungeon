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
    createCharacter: async (_, { user, class: charClass }) => {
      const existingUser = await User.findById(user);
      if (!existingUser) {
        throw new UserInputError('Invalid user. Please try again.');
      }

      const character = await Character.create({
        user,
        class: charClass,
      });

      return character;
    },
    updateCharacter: async (
      _,
      {
        _id,
        class: charClass,
        experience,
        currentHealth,
        gold,
        gameboardState,
      },
      { userId }
    ) => {
      const character = await Character.findById(_id);

      if (!character) {
        throw new UserInputError('Character not found.');
      }

      if (userId !== character.user.toString()) {
        throw new AuthenticationError(
          'You do not have permission to update this character.'
        );
      }

      // see if this update contains experience or nah
      if (experience) {
        character.experience += experience;

        // ensures that if they get a ton of experience they can level up more than once
        while (character.levelUp()) {}
      }

      const updateObject = {
        level: character.level,
        experience: character.experience,
        baseHealth: character.baseHealth,
        basePhysicalAttack: character.basePhysicalAttack,
        baseMagicalAttack: character.baseMagicalAttack,
        currentHealth,
        gold,
        gameboardState,
      };

      // have to pull out class here because if it's passed the setter will bug out, but still want to give the option for he user to eventually change their class
      if (charClass) {
        updateObject.class = charClass;
      }

      return await Character.findByIdAndUpdate(_id, updateObject, { new: true })
        .populate('inventory.item')
        .populate('weapon')
        .populate('armor');
    },
    deleteCharacter: async (_, { _id }, { userId }) => {
      const character = await Character.findById(_id);

      if (!character) {
        throw new UserInputError('Character not found.');
      }

      if (userId !== character.user.toString()) {
        throw new AuthenticationError(
          'You do not have permission to delete this character.'
        );
      }

      const result = character.remove();
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
    updateGameState: async (_, { characterId, gameState }, { userId }) => {
      const character = await Character.findById(characterId);

      if (!character) {
        throw new UserInputError('Character not found.');
      }

      if (userId !== character.user.toString()) {
        throw new AuthenticationError(
          'You do not have permission to update this state. Go away.'
        );
      }
      await character.update(
        characterId,
        { gameboardState: gameState },
        { new: true, runValidators: true }
      );
      return character;
    },
  },
};

module.exports = characterResolvers;
