import GridSystem from "../components/Gridsystem.jsx"
import {Link } from 'react-router-dom';
import floor from '../utils/images/floor.jpg';
import { useRef } from 'react';



const GameLayout = () => {
  const windowSize = useRef([window.innerWidth, window.innerHeight]);

  return (
    <div style={{ backgroundImage: `url(${floor})`, width: windowSize.current[0],
    height: windowSize.current[1],}}>
      <div className="center">
        <h1>Adventure</h1>
        <GridSystem />
        <Link style={{color: 'yellow'}} to="/">Logout</Link>
      </div>
    </div>
  );
};

export default GameLayout;