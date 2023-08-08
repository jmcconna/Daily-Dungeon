import styles from './styles.module.css';
import { useNavigate } from 'react-router-dom';
import { GET_CHARACTER_QUERY } from '../../../../utils/queries';
import { UPDATE_CHARACTER_MUTATION } from '../../../../utils/mutations';
import { useMutation, useQuery } from '@apollo/client';

const EndMenu = ({ winner, character }) => {
  const navigate = useNavigate();
  const characterId = JSON.parse(localStorage.getItem('DD_session')).character._id;  
  
  const [mutateGoldXP, { loading, error}] = useMutation(UPDATE_CHARACTER_MUTATION);
const updateGoldXP = async (data) => {
  try {
    //try to update the gold and XP of the character in the db  
    const { data } = await mutateGoldXP({
      variables: {
        _id: characterId,
        gold: data.newGold,
        experience: data.newExperience
      },})

} catch (error) {
  console.error('Error retrieving character data', error.message);
}}
  
  if (winner.name === character.name) {

    //update local storage
    character.experience += 25;
    character.gold += 10;
    const DD_session = JSON.parse(localStorage.getItem('DD_session'));
    DD_session.character = character;
    localStorage.setItem('DD_session', JSON.stringify(DD_session));


    //retrieve the current gold and XP of the character in the db
    const {loading, error, data} = useQuery(GET_CHARACTER_QUERY, {
        variables: {
          _id: characterId,
        },
      });
      let newGold = data.gold +10;
      let newExperience = data.experience +25;
      updateGoldXP({ characterId, newGold, newExperience});
    

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
