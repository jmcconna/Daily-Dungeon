const { gql } = require('apollo-server-express');

const characterTypeDefs = gql`
  type InventoryItem {
    item: Item!
    quantity: Int!
  }

  type Character {
    _id: ID!
    user: User!
    class: String!
    level: Int!
    experience: Int!
    baseHealth: Int!
    currentHealth: Int!
    damage: Int!
    weapon: Item
    armor: Item
    inventory: [InventoryItem]
    gold: Int!
    gameboardState: String
  }

  extend type Query {
    getCharacter(_id: ID!): Character
    getCharacters(user: ID!): [Character]
  }

  extend type Mutation {
    createCharacter(
      user: ID!
      class: String!
      baseHealth: Int!
      currentHealth: Int!
    ): Character!
    updateCharacter(
      _id: ID!
      class: String
      level: Int
      experience: Int
      baseHealth: Int
      currentHealth: Int
      damage: Int
      gold: Int
      gameboardState: String
    ): Character
    deleteCharacter(_id: ID!): Boolean!

    equipWeapon(characterId: ID!, itemId: ID!): Character!
    equipArmor(characterId: ID!, itemId: ID!): Character!
    addItemToInventory(characterId: ID!, itemId: ID!): Character!
    removeItemFromInventory(characterId: ID!, itemId: ID!): Character!

    updateGameState(characterId: ID!, gameState: String!): Character
  }
`;

module.exports = characterTypeDefs;
