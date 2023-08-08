import GridSystem from "../components/Gridsystem.jsx"
import {Link } from 'react-router-dom';
import floor from '../utils/images/floor.jpg';



const GameLayout = () => {
  return (
    <div style={{ backgroundImage: `url(${floor})`}}>
      <h1>Adventure</h1>
      <GridSystem />
      <Link to="/">Logout</Link>
    </div>
  );
};

export default GameLayout;