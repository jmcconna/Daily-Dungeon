const Item = require('../models/Item');

const itemSeeds = [
  // Weapons
  {
    name: 'Longsword',
    type: 'weapon',
    description: 'A finely crafted sword, foes beware.',
    physicalAttackBuff: 10,
    price: 250,
  },
  {
    name: 'Short Bow',
    type: 'weapon',
    description: 'An sturdy bow that reliably fires arrows.',
    physicalAttackBuff: 5,
    magicalAttackBuff: 5,
    price: 250,
  },
  {
    name: 'Quarterstaff',
    type: 'weapon',
    description: 'A wooden staff charged with arcane power.',
    magicalAttackBuff: 10,
    price: 250,
  },
  // Armors
  {
    name: 'Scale Mail',
    type: 'armor',
    description: 'Heavy armor providing excellent protection.',
    armor: 10,
    price: 150,
  },
  {
    name: 'Leather Cloak',
    type: 'armor',
    description: 'A cloak that blends in with nature, providing minor camoflage.',
    armor: 5,
    price: 150,
  },
  {
    name: 'Linen Robes',
    type: 'armor',
    description: 'Basic robes enchanted to enhance magical defenses.',
    armor: 7,
    price: 150,
  },

  // Advanced Weapons

  {
    name: 'Greataxe of the Ancients',
    type: 'weapon',
    description: 'An unnaturaly sharp battle axe that fills you with the heroism of your ancestors.',
    physicalAttackBuff: 20,
    price: 400,
  },
  {
    name: 'Everburning Blade',
    type: 'weapon',
    description: 'A mighty sword, emitting a flame that can never be extinguished.',
    physicalAttackBuff: 15,
    magicalAttackBuff: 5,
    price: 400,
  },
  {
    name: 'Longbow of the West Wind',
    type: 'weapon',
    description: 'A masterfully crafted longbow, channeling the force of raw wind.',
    physicalAttackBuff: 10,
    magicalAttackBuff: 10,
    price: 400,
  },
  {
    name: 'Greatstaff of Arcane Power',
    type: 'weapon',
    description: 'A scepter overflowing with pure arcane energy.',
    magicalAttackBuff: 20,
    price: 400,
  },

  // Advanced Armors
  {
    name: 'Plate of the Holy Guardian',
    type: 'armor',
    description: 'An impenetrable plate armor, guarding against all harm.',
    armor: 15,
    price: 250,
  },
  {
    name: 'Cloak of Twilight Illusion',
    type: 'armor',
    description: 'A mystical cloak that confounds enemies, increasing evasion.',
    armor: 8,
    price: 250,
  },
  {
    name: 'Robes of Greater Enlightenment',
    type: 'armor',
    description:
      'A robe imbued with ancient wisdom, amplifying magical and physical defense.',
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
