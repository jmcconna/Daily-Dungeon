import styles from './styles.module.css';
import { useNavigate } from 'react-router-dom';

const EndMenu = ({ winner, character }) => {
  const navigate = useNavigate();
  
  if (winner.name === character.name) {
    
    character.experience += 25;
    character.gold += 10;
    const DD_session = JSON.parse(localStorage.getItem('DD_session'));
    DD_session.character = character;
    localStorage.setItem('DD_session', JSON.stringify(DD_session));
  } else {
    localStorage.removeItem('gameState')
    localStorage.removeItem('randomTilesGenerated')
  }

  return (
    <div className={styles.main}>
      <h1 className={styles.style}>{winner.name} has won!</h1>
      
      {winner.name === character.name ? (
        <>
          <p className={styles.style}>Congratulations! You gained the following:</p>
          <ul className={styles.list}>
            <li className={styles.style}>25 Experience</li>
            <li className={styles.style}>10 Gold</li>
          </ul>
          <button className={styles.startButton} onClick={() => navigate('/gameplay')}>
            Back to your adventure...
          </button>
        </>
      ) : (
        <>
          <p className={styles.style}>You lost. Better luck next time!</p>
          <button className={styles.startButton} onClick={() => navigate('/introduction')}>
            Return home to heal...
          </button>
        </>
      )}
    </div>
  );
};

export default EndMenu;
