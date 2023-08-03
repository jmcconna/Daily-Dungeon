const Item = require('../models/Item');

const itemSeeds = [
  // Weapons
  {
    name: 'Sword of Valor',
    type: 'weapon',
    description: 'A finely crafted sword imbued with magical energy.',
    physicalAttackBuff: 10,
    price: 250,
  },
  {
    name: 'Mystic Bow',
    type: 'weapon',
    description: 'An enchanted bow that grants superior aim and power.',
    physicalAttackBuff: 5,
    magicalAttackBuff: 5,
    price: 250,
  },
  {
    name: 'Staff of Wisdom',
    type: 'weapon',
    description: 'A staff charged with arcane power, boosting magical prowess.',
    magicalAttackBuff: 10,
    price: 250,
  },
  // Armors
  {
    name: 'Shielded Armor',
    type: 'armor',
    description: 'A heavy armor providing excellent protection.',
    armor: 10,
    price: 150,
  },
  {
    name: 'Cloak of Shadows',
    type: 'armor',
    description: 'A cloak that blends with the shadows, enhancing stealth.',
    armor: 5,
    price: 150,
  },
  {
    name: 'Robe of Insight',
    type: 'armor',
    description: 'A robe enhancing magical defense and wisdom.',
    armor: 7,
    price: 150,
  },
  // Advanced Weapons
  {
    name: 'Greatsword of Heroism',
    type: 'weapon',
    description: 'A mighty sword radiating valor and strength.',
    physicalAttackBuff: 20,
    price: 400,
  },
  {
    name: 'Longbow of the Wind',
    type: 'weapon',
    description: 'A mastercrafted longbow, channeling the force of the wind.',
    physicalAttackBuff: 10,
    magicalAttackBuff: 10,
    price: 400,
  },
  {
    name: 'Arcane Scepter of Power',
    type: 'weapon',
    description: 'A scepter overflowing with raw arcane energy.',
    magicalAttackBuff: 20,
    price: 400,
  },
  // Advanced Armors
  {
    name: 'Plate of the Guardian',
    type: 'armor',
    description: 'An impenetrable plate armor, guarding against all harm.',
    armor: 15,
    price: 250,
  },
  {
    name: 'Cloak of Illusion',
    type: 'armor',
    description: 'A mystical cloak that confounds enemies, increasing evasion.',
    armor: 8,
    price: 250,
  },
  {
    name: 'Robe of Enlightenment',
    type: 'armor',
    description:
      'A robe imbued with ancient wisdom, amplifying magical defense.',
    armor: 12,
    price: 250,
  },

  // Consumables
  {
    name: 'Health Potion',
    type: 'consumable',
    description: 'A potion that restores health.',
    price: 50,
  },
  {
    name: 'Stamina Tonic',
    type: 'consumable',
    description:
      'A tonic that replenishes stamina, allowing for more actions in combat or exploration.',
    price: 60,
  },
  {
    name: 'Golden Dragon Amulet',
    type: 'consumable',
    description:
      'A rare and valuable amulet in the shape of a dragon, made of pure gold. Highly sought after by collectors and can be sold for a considerable amount of gold.',
    price: 1000,
  },
];

const seedItems = async () => {
  try {
    await Item.deleteMany({});
    await Item.insertMany(itemSeeds);

    console.log('Items seeded successfully');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

module.exports = seedItems;
