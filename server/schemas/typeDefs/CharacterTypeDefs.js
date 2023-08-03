const { gql } = require('apollo-server-express');

const characterTypeDefs = gql`
  type InventoryItem {
    item: Item!
    quantity: Int!
    level: Int!
  }

  type Character {
    _id: ID!
    user: User!
    class: String!
    level: Int!
    experience: Int!
    baseHealth: Int
    currentHealth: Int
    basePhysicalAttack: Int!
    baseMagicalAttack: Int!
    skills: [Skill!]!
    weapon: Item
    armor: Item
    inventory: [InventoryItem]
    gold: Int!
    gameboardState: String
  }

  type Skill {
    name: String!
    type: String!
    damage: Int!
  }

  extend type Query {
    getCharacter(_id: ID!): Character
    getCharacters: [Character]
    getCharactersByUserID(user: ID!): [Character]
  }

  extend type Mutation {
    createCharacter(
      user: ID!
      class: String!
    ): Character!
    updateCharacter(
      _id: ID!
      class: String
      level: Int
      experience: Int
      baseHealth: Int
      currentHealth: Int
      basePhysicalAttack: Int
      baseMagicalAttack: Int
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
