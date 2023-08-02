const { Environment } = require('../../models');

const environmentResolvers = {
  Query: {
    getEnvironments: async () => {
      return await Environment.find()
        .populate('resources')
    },
    getEnvironment: async (_, { _id }) => {
      return await Environment.findById(_id)
        .populate('resources')
    },
  },
  Mutation: {
    createEnvironment: async (
      _,
      { name, image, description, resources, badOutcomes }
    ) => {
      const environment = await Environment.create({
        name,
        image,
        description,
        resources,
        badOutcomes,
      });
      return environment;
    },
    updateEnvironment: async (
      _,
      { _id, name, image, description, resources, badOutcomes }
    ) => {
      return await Environment.findByIdAndUpdate(
        _id,
        { name, image, description, resources, badOutcomes },
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
