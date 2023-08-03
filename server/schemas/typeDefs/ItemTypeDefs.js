const { gql } = require('apollo-server-express');

const itemTypeDefs = gql`
  type Item {
    _id: ID!
    name: String!
    type: String!
    image: String
    description: String!
    tier: Int!          
    physicalAttackBuff: Int 
    magicalAttackBuff: Int  
    armor: Int
    level: Int!
    range: Int
    price: Int!
    quantity: Int
  }

  extend type Query {
    getItems: [Item]
    getItem(_id: ID!): Item
  }

  extend type Mutation {
    createItem(
      name: String!
      type: String!
      image: String
      description: String!
      tier: Int!           
      physicalAttackBuff: Int 
      magicalAttackBuff: Int  
      armor: Int
      level: Int
      range: Int
      price: Int!
      quantity: Int
    ): Item!
    updateItem(
      _id: ID!
      name: String
      type: String
      image: String
      description: String
      tier: Int           
      physicalAttackBuff: Int 
      magicalAttackBuff: Int  
      armor: Int
      level: Int
      range: Int
      price: Int
      quantity: Int
    ): Item
    deleteItem(_id: ID!): Boolean!
    buyItem(characterId: ID!, itemId: ID!): Character!
    sellItem(characterId: ID!, itemId: ID!): Character!
    
  }
`;

module.exports = itemTypeDefs;
