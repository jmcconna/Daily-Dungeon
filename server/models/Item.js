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
  level: {
    type: Number,
    default: 1,
    max: 50,
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
  quantity: {
    type: Number,
    default: 1,
  },
});

// made this similar to the levelUp method in Character.js, can adjust as needed
itemSchema.methods.levelUp = function () {
  const experienceNeeded = this.level * 100;

  if (this.experience >= experienceNeeded) {
    this.level += 1;
    this.experience -= experienceNeeded;

    if (this.type === 'weapon') {
      this.damage += 5;
    } else if (this.type === 'armor') {
      this.armor += 5;
    }

    return true;
  }
  return false;
};

const Item = model('Item', itemSchema);

module.exports = Item;
