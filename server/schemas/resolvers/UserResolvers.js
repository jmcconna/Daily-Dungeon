const { User } = require('../../models');
const { signToken } = require('../../utils/auth');
const { AuthenticationError } = require('apollo-server-express');


const userResolvers = {
  Query: {
    getUser: async (_, { _id }) => {
      return await User.findById(_id);
    },
    getUsers: async () => {
      return await User.find();
    },
  },

  Mutation: {
    loginUser: async (_, { email, password }) => {
      const user = await User.findOne({ email }).populate('characters');
      if (!user) {
        throw new AuthenticationError(
          'There is no account associated with that email. Please check and try again.'
        );
      }
      const validPassword = await user.verifyPassword(password);
      if (!validPassword) {
        throw new AuthenticationError(
          'Incorrect password. Please check and try again.'
        );
      }
      const token = signToken(user);
      return { token, user };
    },

    createUser: async (_, { username, password, email }) => {
      const user = await User.create({ username, password, email });
      const token = signToken(user);
      return { token, user };
    },

    updateUser: async (
      _,
      { _id, username, password, email, premiumCurrency }, { userId }
    ) => {

      if (_id !== userId) {
        throw new AuthenticationError(
          'You do not have permission to update this user.'
        );
      }

      return await User.findByIdAndUpdate(
        _id,
        { username, password, email, premiumCurrency },
        // ensure the password is not returned with the query
        { new: true, select: '-password'}
      );
    },
  },
};

module.exports = userResolvers;
