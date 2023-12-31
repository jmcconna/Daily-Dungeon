import knight from './images/JakeKnight.png'
import golem from './images/Golem.png';

const playerStats = {
  level: 1,
  maxHealth: 177,
  name: 'Knight',

  img: knight,


  magic: 32,
  attack: 50,
  defense: 30,
  magicDefense: 30,
};
const opponentStats = {
  level: 2,
  name: 'Golem',
  maxHealth: 188,
  img: golem,

  magic: 50,
  attack: 32,
  defense: 20,
  magicDefense: 48,
};

export { playerStats, opponentStats };
