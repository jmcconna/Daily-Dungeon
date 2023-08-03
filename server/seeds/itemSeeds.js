const Item = require('../models/Item');

const itemSeeds = [
  // Weapons
  {
    name: 'Sword of Valor',
    type: 'weapon',
    description: 'A finely crafted sword imbued with magical energy.',
    damage: 15,
    price: 200,
  },
  {
    name: 'Mystic Bow',
    type: 'weapon',
    description: 'An enchanted bow that grants superior aim and power.',
    damage: 12,
    range: 50,
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
    price: 180,
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
    description: 'A rare and valuable amulet in the shape of a dragon, made of pure gold. Highly sought after by collectors and can be sold for a considerable amount of gold.',
    price: 1000,
  }
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
