import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { CREATE_CHARACTER_MUTATION } from '../utils/mutations';


function CharacterCreate() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [selectedClass, setSelectedClass] = useState('');

  const [createCharacter, { loading, error }] = useMutation(CREATE_CHARACTER_MUTATION);

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
        class: selectedClass
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
    <div className='stack'>
      <h2>Create Your Character</h2>
      <div className='stack'>
        <label htmlFor="name">Adventurer Name:</label>
        <input type="text" name="name" id="name" value={name} onChange={handleNameChange} />
      </div>
      <div className='stack'>
        <label htmlFor="class">Class:</label>
        <select id="class" value={selectedClass} name="selectedClass" onChange={handleClassChange}>
          <option value="">Select a Class</option>
          <option value="Fighter">Fighter</option>
          <option value="Wizard">Wizard</option>
          <option value="Ranger">Ranger</option>
        </select>
      </div>
      <button onClick={handleCreateCharacter}>Create Character</button>
  
      {error && <div>{error.message}</div>}
    </div>
  );
}

export default CharacterCreate;