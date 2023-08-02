const { Schema, model } = require('mongoose');

const gameboardSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  background: {
    type: String,
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
});

const Gameboard = model('Gameboard', gameboardSchema);

module.exports = Gameboard;
