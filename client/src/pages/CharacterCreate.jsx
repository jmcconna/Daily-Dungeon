import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { CREATE_CHARACTER_MUTATION } from '../utils/mutations';
import background from '../utils/images/dungeon-background.png';

function CharacterCreate() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [selectedClass, setSelectedClass] = useState('');

  const [createCharacter, { loading, error }] = useMutation(
    CREATE_CHARACTER_MUTATION
  );

  const windowSize = useRef([window.innerWidth, window.innerHeight]);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleClassChange = (event) => {
    setSelectedClass(event.target.value);
  };

  const handleCreateCharacter = async () => {
    try {
      const userId = JSON.parse(localStorage.getItem('DD_session')).user._id;

      const { data } = await createCharacter({
        variables: {
          user: userId,
          name: name,
          class: selectedClass,
        },
      });

      if (data) {
        const character = data.createCharacter;
        const DD_session = JSON.parse(localStorage.getItem('DD_session'));
        DD_session.character = character;
        localStorage.setItem('DD_session', JSON.stringify(DD_session));
        navigate('/introduction');
      }
    } catch (err) {
      console.error('Error creating character:', err);
    }
  };

  return (
    <div
      className="bkground"
      style={{
        backgroundImage: `url(${background})`,
        width: windowSize.current[0],
        height: windowSize.current[1],
        alignSelf: 'center',
        color: 'yellow',
      }}>
      <div className='center' style={{ minBlockSize: '90vh'}}>
        <div className="stack" style={{ height: '100%', backgroundColor: 'rgba(255, 255, 255, 0.3)',
          borderRadius: '10px', padding: '2em' }}>
          <h2>Create Your Character</h2>
          <div className="stack">
            <label htmlFor="name">Adventurer Name:</label>
            <input
              type="text"
              name="name"
              id="name"
              value={name}
              onChange={handleNameChange}
              style={{ border: '1px solid red', borderRadius: '5px' }}
            />
          </div>
          <div className="stack">
            <label htmlFor="class">Class:</label>
            <select
              id="class"
              value={selectedClass}
              name="selectedClass"
              onChange={handleClassChange}
              style={{ border: '1px solid red', borderRadius: '5px' }}
            >
              <option value="">Select a Class</option>
              <option value="Fighter">Fighter</option>
              <option value="Wizard">Wizard</option>
              <option value="Ranger">Ranger</option>
            </select>
          </div>
          <button onClick={handleCreateCharacter}>Create Character</button>
      </div>
      </div>
      {error && <div>{error.message}</div>}
    </div>
);

}

export default CharacterCreate;
