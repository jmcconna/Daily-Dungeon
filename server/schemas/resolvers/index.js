const userResolvers = require('./UserResolvers');
const characterResolvers = require('./CharacterResolvers');
const itemResolvers = require('./ItemResolvers');
const monsterResolvers = require('./MonsterResolvers');
const environmentResolvers = require('./EnvironmentResolvers');

module.exports = {
  Query: {
    ...userResolvers.Query,
    ...characterResolvers.Query,
    ...itemResolvers.Query,
    ...monsterResolvers.Query,
    ...environmentResolvers.Query,
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...characterResolvers.Mutation,
    ...itemResolvers.Mutation,
    ...monsterResolvers.Mutation,
    ...environmentResolvers.Mutation,
  },
};
