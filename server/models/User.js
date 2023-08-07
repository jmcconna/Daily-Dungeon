const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: [8, 'Password must be at least 8 characters long'],
    maxlength: [50, 'Password must not exceed 50 characters'],
    validate: {
      validator: function (v) {
        return /^(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,50}$/.test(v);
      },
      message:
        'Password must contain at least one number and one special character',
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  premiumCurrency: {
    type: Number,
    default: 0,
  },
  characters: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Character',
    },
  ],
});

// hash password before saving to database
userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
  next();
});

// verify password
userSchema.methods.verifyPassword = function (password) {
  console.log(password +" vs the DB password "+ this.password);
  return bcrypt.compare(password, this.password);
};

const User = model('User', userSchema);

module.exports = User;
