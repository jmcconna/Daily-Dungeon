import { useQuery } from '@apollo/client';
import { GET_CHARACTERS_QUERY } from '../utils/queries';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import background from '../utils/images/dungeon-background.png';

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

  const windowSize = useRef([window.innerWidth, window.innerHeight]);

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
console.log(data)

  if (!data) navigate('/charactercreate');
  if (loading) return <p>Loading characters...</p>;
  if (error) {
    console.error(error)
    return <p>Error: {error.message}</p>;
  }

  const selectCharacter = (selectedCharacter) => {
    const session = JSON.parse(localStorage.getItem('DD_session'));
    session.character = selectedCharacter;
    localStorage.setItem('DD_session', JSON.stringify(session));
    navigate('/tavern');
  };

  return (
    <div className="bkground"
    style={{
      backgroundImage: `url(${background})`,
      width: windowSize.current[0],
      height: windowSize.current[1],
      alignSelf: 'center',
      color: 'yellow',
      display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    }}>
      <div className='center stack' style={{
        color: 'yellow',
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        borderRadius: '10px',
        padding: '2em',
      }}>
        <h2>Select Your Character</h2>
        <div className='cluster' style={{ color: 'darkred'}}>
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
    </div>
  );
}

export default CharacterSelect;
