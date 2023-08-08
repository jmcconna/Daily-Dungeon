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
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    }}>
      <div className='center' style={{
        color: 'yellow',
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        borderRadius: '10px',
        padding: '2em',
      }}>
        <h2>Welcome to the Tavern</h2>
        <Link to="/trader">
          <button>Visit the Trader</button>
        </Link>
        <Link to="/gameplay">
          <button>Start a New Adventure</button>
        </Link>
      </div>
    </div>
  );
};

export default Tavern;
