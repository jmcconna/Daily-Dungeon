const { Schema, model } = require('mongoose');

const itemSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['weapon', 'armor', 'consumable'],
    required: true,
  },
  image: {
    type: String,
    default: '',
  },
  description: {
    type: String,
    required: true,
  },
  damage: {
    type: Number,
    default: 0, 
  },
  armor: {
    type: Number,
    default: 0, 
  },
  range: {
    type: Number,
    default: 0, 
  },
  price: {
    type: Number,
    required: true,
  },
});

const Item = model('Item', itemSchema);

module.exports = Item;
