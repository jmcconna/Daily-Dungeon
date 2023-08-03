const userResolvers = require('./UserResolvers');
const characterResolvers = require('./CharacterResolvers');
const itemResolvers = require('./ItemResolvers');
const monsterResolvers = require('./MonsterResolvers');
const environmentResolvers = require('./EnvironmentResolvers');
const gameboardResolvers = require('./GameboardResolvers');

module.exports = {
  Query: {
    ...userResolvers.Query,
    ...characterResolvers.Query,
    ...itemResolvers.Query,
    ...monsterResolvers.Query,
    ...environmentResolvers.Query,
    ...gameboardResolvers.Query,
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...characterResolvers.Mutation,
    ...itemResolvers.Mutation,
    ...monsterResolvers.Mutation,
    ...environmentResolvers.Mutation,
    ...gameboardResolvers.Mutation,
  },
};
