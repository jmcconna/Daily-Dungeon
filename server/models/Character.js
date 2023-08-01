const { Schema, model } = require('mongoose');

const characterSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  class: {
    type: String,
    required: true,
  },
  level: {
    type: Number,
    default: 1,
  },
  experience: {
    type: Number,
    default: 0,
  },
  baseHealth: {
    type: Number,
    required: true,
  },
  currentHealth: {
    type: Number,
    required: true,
  },
  damage: {
    type: Number,
    default: 10, 
  },
  weapons: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Item',
    },
  ],
  armor: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Item',
    },
  ],
  inventory: {
    type: [
      {
          type: Schema.Types.ObjectId,
          ref: 'Item',
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
    default: '',
  },
});

function inventoryLimit(inv) {
  return inv.length <= 20; // set to 20 but we can change if needed
}

// this will handle the level up logic. simple for now, but we can add more later   
characterSchema.methods.levelUp = function() {
  const experienceNeeded = this.level * 100;

  if (this.experience >= experienceNeeded) {
    this.level += 1;
    this.experience -= experienceNeeded;
    this.baseHealth += 10;
    this.damage += 5;

    return true; // Successful level up
  }

  return false; // No level up
};

const Character = model('Character', characterSchema);

module.exports = Character;
