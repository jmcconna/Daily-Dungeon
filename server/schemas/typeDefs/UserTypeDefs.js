const { gql } = require('apollo-server-express');

const userTypeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    premiumCurrency: Int
    characters: [Character]
  }

  type Auth {
    token: String!
    user: User!
  }

  type Query {
    getUser(_id: ID!): User
    getUsers: [User]
  }

  type Mutation {
    loginUser(email: String!, password: String!): Auth
    createUser(username: String!, password: String!, email: String!): Auth
    updateUser(
      _id: ID!
      username: String
      password: String
      email: String
      premiumCurrency: Int
    ): User
  }
`;

module.exports = userTypeDefs;
