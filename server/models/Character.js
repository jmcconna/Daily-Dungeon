const { Schema, model } = require('mongoose');

const characterSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  class: {
    type: String,
    required: true,
    enum: ['Fighter', 'Ranger', 'Wizard'],
    set: function (className) {
      const attributes = classAttributes[className];
      this.baseHealth = attributes.baseHealth;
      this.currentHealth = this.baseHealth;
      this.basePhysicalAttack = attributes.basePhysicalAttack;
      this.baseMagicalAttack = attributes.baseMagicalAttack;
      this.skills = attributes.skills;
      return className;
    },
  },
  baseHealth: {
    type: Number,
  },
  currentHealth: {
    type: Number,
  },
  basePhysicalAttack: {
    type: Number,
  },
  baseMagicalAttack: {
    type: Number,
  },
  skills: [
    {
      name: String,
      type: {
        type: String,
        enum: ['Physical', 'Magical'],
      },
      damage: Number,
    },
  ],
  level: {
    type: Number,
    default: 1,
  },
  experience: {
    type: Number,
    default: 0,
  },
  weapon: {
    type: Schema.Types.ObjectId,
    ref: 'Item',
  },
  armor: {
    type: Schema.Types.ObjectId,
    ref: 'Item',
  },
  inventory: {
    type: [
      {
        item: {
          type: Schema.Types.ObjectId,
          ref: 'Item',
        },
        level: {
          type: Number,
          default: 1,
          max: 50,
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
    validate: [inventoryLimit, 'Exceeds inventory limit'],
  },
  gold: {
    type: Number,
    default: 0,
  },
  gameboardState: {
    type: String, // need to discuss this one, possibly save state as a string
    default: null,
    validate: [gameStateValidator, 'Invalid game state format'],
  },
});

// setting the base attributes for classes. we can change as we see fit
const classAttributes = {
  Fighter: {
    baseHealth: 100,
    basePhysicalAttack: 20,
    baseMagicalAttack: 15,
    skills: [
      { name: 'Quick Strike', type: 'Physical', damage: 25 },
      { name: 'Flame Blade', type: 'Magical', damage: 20 },
    ],
  },
  Ranger: {
    baseHealth: 80,
    basePhysicalAttack: 15,
    baseMagicalAttack: 10,
    skills: [
      { name: 'Arrow Shot', type: 'Physical', damage: 18 },
      { name: 'Entangling Roots', type: 'Magical', damage: 15 },
    ],
  },
  Wizard: {
    baseHealth: 70,
    basePhysicalAttack: 10,
    baseMagicalAttack: 20,
    skills: [
      { name: 'Magic Missile', type: 'Physical', damage: 12 },
      { name: 'Lightning Bolt', type: 'Magical', damage: 25 },
    ],
  },
};

// makes sure they don't exceed their inventory limit
function inventoryLimit(inv) {
  return inv.reduce((acc, curr) => acc + curr.quantity, 0) <= 20; // set to 20 but we can change as needed
}

// checks for a character level up and bumps their stats based on the defined amounts in following object
characterSchema.methods.levelUp = function () {
  const experienceNeeded = this.level * 100;

  if (this.experience >= experienceNeeded) {
    const attributes = levelUpAttributes[this.class];

    this.level += 1;
    this.experience -= experienceNeeded;
    this.baseHealth += attributes.healthIncrease;
    this.basePhysicalAttack += attributes.physicalAttackIncrease;
    this.baseMagicalAttack += attributes.magicalAttackIncrease;

    return true; // Successful level up
  }

  return false; // No level up
};

// sets how much a level up increases stats
const levelUpAttributes = {
  Fighter: {
    healthIncrease: 10,
    physicalAttackIncrease: 5,
    magicalAttackIncrease: 3,
  },
  Ranger: {
    healthIncrease: 8,
    physicalAttackIncrease: 4,
    magicalAttackIncrease: 4,
  },
  Wizard: {
    healthIncrease: 6,
    physicalAttackIncrease: 3,
    magicalAttackIncrease: 5,
  },
};


// this will ensure gamestate is read correctly, assuming we go the JSON route
function gameStateValidator(gameState) {
  try {
    JSON.parse(gameState);
    return true;
  } catch (e) {
    return false;
  }
}

const Character = model('Character', characterSchema);

module.exports = Character;
