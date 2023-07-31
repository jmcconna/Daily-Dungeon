import jwt  from 'jsonwebtoken';

const secret = 'mysecretssshhhhhhh';
const expiration = '2h';

export default {
  signToken: function ({ email, name, _id }) {
    const payload = { email, name, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
