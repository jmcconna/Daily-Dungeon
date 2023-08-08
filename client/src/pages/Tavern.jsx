import { Link } from 'react-router-dom';

const Tavern = () => {
  return (
    <div>
      <h2>Welcome to the Tavern</h2>
      <Link to="/trader">
        <button>Visit the Trader</button>
      </Link>
      <Link to="/gameplay">
        <button>Start a New Adventure</button>
      </Link>
    </div>
  );
};

export default Tavern;
