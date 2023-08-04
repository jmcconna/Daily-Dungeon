import { useState } from 'react';
// import { useHistory } from 'react-router-dom';

function CharacterCreate() {
  // const history = useHistory();
  const [name, setName] = useState('');
  const [selectedClass, setSelectedClass] = useState('');

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleClassChange = (event) => {
    setSelectedClass(event.target.value);
  };

  const handleCreateCharacter = () => {
    history.push('/introduction');
  };

  return (
    <div>
      <h2>Create Your Character</h2>
      <div>
        <label htmlFor="name">Adventurer Name:</label>
        <input type="text" id="name" value={name} onChange={handleNameChange} />
      </div>
      <div>
        <label htmlFor="class">Class:</label>
        <select id="class" value={selectedClass} onChange={handleClassChange}>
          <option value="">Select a Class</option>
          <option value="Fighter">Fighter</option>
          <option value="Wizard">Wizard</option>
          <option value="Ranger">Ranger</option>
        </select>
      </div>
      <button onClick={handleCreateCharacter}>Create Character</button>
    </div>
  );
}

export default CharacterCreate;