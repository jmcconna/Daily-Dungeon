const { gql } = require('apollo-server-express');

const gameboardTypeDefs = gql`
  type Gameboard {
    _id: ID!
    name: String!
    background: String!
    terrainImages: [String]
    environments: [Environment]
    monsters: [Monster]
    loot: [Item]
  }

  extend type Query {
    getGameboard(_id: ID!): Gameboard
    getGameboards: [Gameboard]
  }

  extend type Mutation {
    createGameboard(
      name: String!
      background: String!
      terrainImages: [String]
      environments: [ID]
      monsters: [ID]
      loot: [ID]
    ): Gameboard!
    updateGameboard(
      _id: ID!
      name: String
      background: String
      terrainImages: [String]
      environments: [ID]
      monsters: [ID]
      loot: [ID]
    ): Gameboard
    deleteGameboard(_id: ID!): Boolean!
  }
`;

module.exports = gameboardTypeDefs;
