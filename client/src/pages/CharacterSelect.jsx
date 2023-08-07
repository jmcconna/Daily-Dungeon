import { useQuery } from '@apollo/client';
import { GET_CHARACTERS_QUERY } from '../utils/queries';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

function CharacterSelect() {
  const [characters, setCharacters] = useState([]);
  const navigate = useNavigate();

  const userId = JSON.parse(localStorage.getItem('DD_session')).user._id;
  console.log(userId)
  const { loading, error, data } = useQuery(GET_CHARACTERS_QUERY, {
    variables: {
      user: userId,
    },
  });

  useEffect(() => {
    if (data && data.getCharactersByUserID) {
      console.log(data.getCharactersByUserID);
      setCharacters(
        Array.isArray(data.getCharactersByUserID)
          ? data.getCharactersByUserID
          : [data.getCharactersByUserID]
      );
    }
  }, [data]);

  if (loading) return <p>Loading characters...</p>;
  if (error) {
    console.error(error)
    return <p>Error: {error.message}</p>;
  }

  const selectCharacter = (selectedCharacter) => {
    const session = JSON.parse(localStorage.getItem('DD_session'));
    session.character = selectedCharacter;
    localStorage.setItem('DD_session', JSON.stringify(session));
    navigate('/introduction');
  };

  return (
    <div className='center stack'>
      <h2>Select Your Character</h2>
      <div className='cluster'>
        {Array.isArray(characters) && characters.map((character) => (
          <div className="character-card" key={character._id} onClick={() => selectCharacter(character)}>
            <h3 className='center'>{character.name}</h3>
            <p>Class: {character.class}</p>
            <p>Level: {character.level}</p>
            <p>Gold: {character.gold}</p>
          </div>
        ))}
      </div>
      <Link to="/charactercreate">
        <button>(+) Create New Character</button>
      </Link>
    </div>
  );
}

export default CharacterSelect;
