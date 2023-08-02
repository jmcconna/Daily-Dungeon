const User = require('../models/User');

const userSeeds = [
    {
      username: "dragonSlayer42",
      password: "Dragon$123",
      email: "dragonSlayer42@example.com",
      premiumCurrency: 100,
      characters: []
    },
    {
      username: "elfQueen77",
      password: "Elf@Queen77",
      email: "elfQueen77@example.com",
      premiumCurrency: 50,
      characters: []
    },
    {
      username: "dwarfKing",
      password: "Dwarf%2023",
      email: "dwarfKing@example.com",
      premiumCurrency: 150,
      characters: []
    }
  ];
  
  async function seedUsers() {
    await User.deleteMany({});
    await User.insertMany(userSeeds);
    console.log('Users seeded successfully');
  }
  
  
  module.exports = seedUsers;
  