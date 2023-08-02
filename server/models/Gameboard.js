const { Schema, model } = require('mongoose');

const gameboardSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  background: {
    type: String,
    required: true,
  },
  terrainImages: [
    {
      type: String,
    },
  ],
  environments: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Environment',
    },
  ],
  monsters: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Monster',
    },
  ],
  loot: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Item',
    },
  ],
});

const Gameboard = model('Gameboard', gameboardSchema);

module.exports = Gameboard;
