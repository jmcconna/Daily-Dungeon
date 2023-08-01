const { User } = require('../../models');
const jwt = require('jsonwebtoken');
const { AuthenticationError } = require('apollo-server-express');
require('dotenv').config();
const { JWT_SECRET } = process.env;

const userResolvers = {
  Query: {
    getUser: async (_, { _id }) => {
      return await User.findById(_id);
    },
  },

  Mutation: {
    loginUser: async (_, { email, password }) => {
      const user = await User.findOne({ email });
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
      const token = jwt.sign({ _id: user._id }, JWT_SECRET);
      return { token, user };
    },

    createUser: async (_, { username, password, email }) => {
      const user = await User.create({ username, password, email });
      const token = jwt.sign({ _id: user._id }, JWT_SECRET);
      return { token, user };
    },

    updateUser: async (
      _,
      { _id, username, password, email, premiumCurrency }
    ) => {
      return await User.findByIdAndUpdate(
        _id,
        { username, password, email, premiumCurrency },
        { new: true }
      );
    },
  },
};

module.exports = userResolvers;
