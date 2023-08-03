const jwt = require('jsonwebtoken');
require('dotenv').config();
const { JWT_SECRET } = process.env;
const expiration = '2h';

module.exports = {
  authMiddleware: function ({ req }) {
    let token = req.body.token || req.query.token || req.headers.authorization;

    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }

    if (!token) {
      return req;
    }

    try {
      const { data } = jwt.verify(token, JWT_SECRET, { maxAge: expiration });
      req.user = data;
    } catch {
      console.log('Invalid token');
    }

    // return the request object so it can be passed to the resolver as `context`
    return {
      userId: req.user?._id,
      username: req.user?.username,
      email: req.user?.email,
    };
  },
  signToken: function ({ _id, email, username }) {
    const payload = { email, username, userId: _id };
    return jwt.sign({ data: payload }, JWT_SECRET, { expiresIn: expiration });
  },
};
