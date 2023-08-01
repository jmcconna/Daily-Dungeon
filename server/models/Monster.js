const { Schema, model } = require('mongoose');

const monsterSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: '',
  },
  baseHealth: {
    type: Number,
    required: true,
  },
  baseAttack: {
    type: Number,
    required: true,
  },
  loot: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Item',
    },
  ],
});

const Monster = model('Monster', monsterSchema);

module.exports = Monster;
