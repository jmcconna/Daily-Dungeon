const wait = ms =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, ms);
  });

const attack = ({ attacker, receiver }) => {
  console.log('here', attacker, receiver)
  const receivedDamage =
    attacker.attack - (attacker.level - receiver.level) * 1.25;

  const finalDamage = receivedDamage - receiver.defense / 2;

  return finalDamage*3;
};
const magic = ({ attacker, receiver }) => {
  const receivedDamage =
    attacker.magic - (attacker.level - receiver.level) * 1.25;

  const finalDamage = receivedDamage - receiver.magicDefense / 2;

  return finalDamage*3;
};
const heal = ({ receiver }) => {
  return receiver.magic + receiver.level * 0.1;
};

export { wait, attack, magic, heal}
