const { Environment } = require('../../models');

const environmentResolvers = {
  Query: {
    getEnvironments: async () => {
      return await Environment.find()
        .populate('resources')
        .populate('monsters');
    },
    getEnvironment: async (_, { _id }) => {
      return await Environment.findById(_id)
        .populate('resources')
        .populate('monsters');
    },
  },
  Mutation: {
    createEnvironment: async (
      _,
      { name, image, description, resources, badOutcomes, monsters }
    ) => {
      const environment = await Environment.create({
        name,
        image,
        description,
        resources,
        badOutcomes,
        monsters,
      });
      return environment;
    },
    updateEnvironment: async (
      _,
      { _id, name, image, description, resources, badOutcomes, monsters }
    ) => {
      return await Environment.findByIdAndUpdate(
        _id,
        { name, image, description, resources, badOutcomes, monsters },
        { new: true }
      );
    },
    deleteEnvironment: async (_, { _id }) => {
      const result = await Environment.findByIdAndDelete(_id);
      return !!result;
    },
  },
};

module.exports = environmentResolvers;
