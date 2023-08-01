const { gql } = require('apollo-server-express');

const monsterTypeDefs = gql`
  type Monster {
    _id: ID!
    name: String!
    image: String
    baseHealth: Int!
    baseAttack: Int!
    loot: [Item]
  }

  extend type Query {
    getMonsters: [Monster]
    getMonster(_id: ID!): Monster
  }

  extend type Mutation {
    createMonster(
      name: String!
      image: String
      baseHealth: Int!
      baseAttack: Int!
      loot: [ID]
    ): Monster!
    updateMonster(
      _id: ID!
      name: String
      image: String
      baseHealth: Int
      baseAttack: Int
      loot: [ID]
    ): Monster
    deleteMonster(_id: ID!): Boolean!
  }
`;

module.exports = monsterTypeDefs;
