import styles from './styles.module.css';
import { useEffect, useState } from 'react';
import { Battle, EndMenu} from 'components';

export const Combat = () => {
  const [winner, setWinner] = useState();
  const [mode, setMode] = useState('battle');

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
          }}
        />
      )}

      {mode === 'gameOver' && !!winner && (
        <EndMenu winner={winner} onStartClick={() => setMode('battle')} />
      )}
    </div>
  );
};
