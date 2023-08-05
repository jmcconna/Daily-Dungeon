import GridSystem from "../components/Gridsystem.jsx"
import {Link } from 'react-router-dom';



const GameLayout = () => {
  return (
    <div>
      <h1>Have fun!</h1>
      <GridSystem />
      <Link to="/">Go Back Home</Link>
    </div>
  );
};

export default GameLayout;