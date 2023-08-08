import { useRef } from 'react';
import { Link } from 'react-router-dom';
import Tavernbkg from '../utils/images/Tavern.jpg';


const Tavern = () => {
  const windowSize = useRef([window.innerWidth, window.innerHeight]);
  console.log(windowSize.current[0]);

  return (
    <div style={{ backgroundImage: `url(${Tavernbkg})`,
    width: windowSize.current[0],
    height: windowSize.current[1],
    alignSelf: 'center',
    }}>
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
