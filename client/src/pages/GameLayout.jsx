import GridSystem from "../components/Gridsystem.jsx"
import {Link } from 'react-router-dom';



const GameLayout = () => {
  return (
    <div>
      <h1>Adventure</h1>
      <GridSystem />
      <Link to="/">Logout</Link>
    </div>
  );
};

export default GameLayout;