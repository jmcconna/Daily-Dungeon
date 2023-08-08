import styles from './styles.module.css';
import { useEffect, useState } from 'react';
import { useAIOpponent, useBattleSequence } from '../../hooks/index.js';
import { opponentStats, playerStats, wait } from '../../shared/index.js';
import { BattleMenu, PlayerSummary, BattleAnnouncer } from '../index.js';

const Battle = ({ onGameEnd, character }) => {
  const [sequence, setSequence] = useState({});

  

  const {
    turn,
    inSequence,
    playerHealth,
    opponentHealth,
    playerAnimation,
    opponentAnimation,
    announcerMessage,
  } = useBattleSequence(sequence);

  const aiChoice = useAIOpponent(turn);

  useEffect(() => {
    if (aiChoice && turn === 1 && !inSequence) {
      setSequence({ turn, mode: aiChoice });
    }
  }, [turn, aiChoice, inSequence]);

  useEffect(() => {
    if (playerHealth === 0 || opponentHealth === 0) {
      (async () => {
        await wait(1000);
        onGameEnd(playerHealth === 0 ? opponentStats : character);
      })();
    }
  }, [playerHealth, opponentHealth, onGameEnd]);

  return (
    <>
      <div className={styles.opponent}>
        <div className={styles.summary}>
          <PlayerSummary
            main={false}
            health={opponentHealth}
            name={opponentStats.name}
            level={opponentStats.level}
            maxHealth={opponentStats.maxHealth}
          />
        </div>
      </div>

      <div className={styles.characters}>
        <div className={styles.gameHeader}>
          {character.name} vs {opponentStats.name}
        </div>
        <div className={styles.gameImages}>
          <div className={styles.playerSprite}>
            <img
              alt={playerStats.name}
              src={playerStats.img}
              className={styles[playerAnimation]}
            />
          </div>
          <div className={styles.opponentSprite}>
            <img
              alt={opponentStats.name}
              src={opponentStats.img}
              className={styles[opponentAnimation]}
            />
          </div>
        </div>
      </div>

      <div className={styles.user}>
        <div className={styles.summary}>
          <PlayerSummary
            main={true}
            health={playerHealth}
            name={character.name}
            level={character.level}
            maxHealth={character.baseHealth}
          />
        </div>

        <div className={styles.hud}>
          <div className={styles.hudChild}>
            <BattleAnnouncer
              message={
                announcerMessage || `What will ${character.name} do?`
              }
            />
          </div>
          {!inSequence && turn === 0 && (
            <div className={styles.hudChild}>
              <BattleMenu
                onHeal={() => setSequence({ mode: 'heal', turn })}
                onMagic={() => setSequence({ mode: 'magic', turn })}
                onAttack={() => setSequence({ mode: 'attack', turn })}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Battle;