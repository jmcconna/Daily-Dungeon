const { gql } = require('apollo-server-express');

const environmentTypeDefs = gql`
  type Environment {
    _id: ID!
    name: String!
    image: String
    description: String!
    resources: [Item]
    badOutcomes: [String]
    monsters: [Monster]
  }

  extend type Query {
    getEnvironments: [Environment]
    getEnvironment(_id: ID!): Environment
  }

  extend type Mutation {
    createEnvironment(
      name: String!
      image: String
      description: String!
      resources: [ID]
      badOutcomes: [String]
    ): Environment!
    updateEnvironment(
      _id: ID!
      name: String
      image: String
      description: String
      resources: [ID]
      badOutcomes: [String]
    ): Environment
    deleteEnvironment(_id: ID!): Boolean!
  }
`;

module.exports = environmentTypeDefs;
