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

function inventoryLimit(inv) {
  return inv.reduce((acc, curr) => acc + curr.quantity, 0) <= 20; // set to 20 but we can change as needed
}

// this will handle the level up logic. simple for now, but we can add more later
characterSchema.methods.levelUp = function () {
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
