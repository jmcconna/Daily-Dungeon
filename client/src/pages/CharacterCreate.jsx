import { Link } from 'react-router-dom';

function CharacterCreate() {
  return (
    <div>
      <h1>Choose a class!</h1>
      <Link to={{ pathname: '/introduction'}}>
        <button>Begin Adventure</button>
      </Link>
    </div>
  );
}

export default CharacterCreate;