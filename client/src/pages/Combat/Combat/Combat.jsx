import styles from './styles.module.css';
import { useEffect, useState } from 'react';
import { Battle, EndMenu} from '../components/index.js';

const Combat = () => {
  const [winner, setWinner] = useState();
  const [mode, setMode] = useState('battle');

  const character = JSON.parse(localStorage.getItem('DD_session')).character;

  useEffect(() => {
    if (mode === 'battle') {
      setWinner(undefined);
    }
  }, [mode]);

  return (
    <div className={styles.main}>
      {mode === 'battle' && (
        <Battle
          onGameEnd={winner => {
            setWinner(winner);
            setMode('gameOver');
          }} character={character}
        />
      )}

      {mode === 'gameOver' && !!winner && (
        <EndMenu winner={winner} character={character} />
      )}
    </div>
  );
};

export default Combat;
