import { useQuery } from '@apollo/client';
import { GET_CHARACTERS_QUERY } from '../utils/queries';
import { Link } from 'react-router-dom';

function CharacterSelect() {
  const { loading, error, data } = useQuery(GET_CHARACTERS_QUERY);

  if (loading) return <p>Loading characters...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const characters = data.getCharacters;

  return (
    <div>
      <h2>Select Your Character</h2>
      <ul>
        {characters.map((character) => (
          <li key={character.id}>
            <p>Name: {character.name}</p>
          </li>
        ))}
      </ul>
      <Link to="/charactercreate">
        <button>(+) Create New Character</button>
      </Link>
    </div>
  );
}

export default CharacterSelect;
