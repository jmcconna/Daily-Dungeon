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
  tier: {
    type: Number,
    default: 1,
    enum: [1, 2], 
  },
  physicalAttackBuff: {
    type: Number,
    default: 0,
  },
  magicalAttackBuff: {
    type: Number,
    default: 0,
  },
  armor: {
    type: Number,
    default: 0,
  },
  level: {
    type: Number,
    default: 1,
    max: 50,
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

// spending too long on this for now, will come back to it later
// // made this similar to the levelUp method in Character.js, can adjust as needed
// itemSchema.methods.levelUp = function (character) {
//   const cost = this.levelUpCost();

//   if (character.gold < cost) {
//     throw new Error('Not enough gold');
//   }

//   character.gold -= cost; 
//   this.level += 1;

//   // scales buffs based on tier
//   if (this.tier === 1) {
//     if (this.type === 'weapon') this.physicalAttackBuff += 5;
//     if (this.type === 'armor') this.armor += 5;
//   } else if (this.tier === 2) {
//     if (this.type === 'weapon') this.physicalAttackBuff += 10;
//     if (this.type === 'armor') this.armor += 10;
//   }

//   return true; 
// };

// // sets some scaling level up costs
// itemSchema.methods.levelUpCost = function () {
//   return (this.tier * 100) + (this.level * 50);
// };

const Item = model('Item', itemSchema);

module.exports = Item;
