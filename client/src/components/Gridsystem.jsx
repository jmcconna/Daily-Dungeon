import React, { useState, useEffect, useRef } from 'react';
import HeroImg from '../utils/images/Hero.png';
import { useNavigate } from 'react-router-dom';
import gameboard from '../utils/gameboards.js';

import MonsterModal from './MonsterModal.jsx';

// randomly generates the tiles where monsters will spawn
const randomTile = (matrix) => {
  if (localStorage.getItem('randomTilesGenerated')) {
    return matrix;
  }
  for (let i = 0; i < matrix.length; i++) {
    for (let h = 0; h < matrix[i].length; h++) {
      if (matrix[i][h] === 0) {
        const rando = Math.floor(Math.random() * 100);
        if (rando <= 5) {
          matrix[i][h] = 3;
        }
      }
    }
    // this mwill make sure this doesn't run again on a refrsh or reload
    localStorage.setItem('randomTilesGenerated', 'true');
  }
  return matrix;
};

// adding this in case we run out of time to work out the backend saving
const saveStateToLocalStorage = (state) => {
  const savedState = {
    matrix: state.matrix,
    player: {
      ...state.player,
      imageObj: state.player.imageObj ? state.player.imageObj.src : null,
    },
  };
  localStorage.setItem('gameState', JSON.stringify(savedState));
};

const getInitialState = (gameboard) => {
  const savedState = JSON.parse(localStorage.getItem('gameState'));
  if (savedState && savedState.player.imageObj) {
    const imageObj = new Image();
    imageObj.src = savedState.player.imageObj;
    savedState.player.imageObj = imageObj;

    if (savedState.matrix) {
      savedState.matrix = [...savedState.matrix];
    }

    return savedState;
  } else {
    return {
      matrix: randomTile([...gameboard.matrix]),
      player: {
        x: gameboard.playerX,
        y: gameboard.playerY,
        color: 'red',
        imageObj: null,
      },
    };
  }
};
const GridSystem = () => {
  const outlineCanvasRef = useRef(null);

  const [state, setState] = useState(
    getInitialState(gameboard)
  );
  const [hasWon, setHasWon] = useState(false);

  const imageObj = new Image();
  imageObj.src = HeroImg;

  imageObj.onload = () => {
    setState((prevState) => ({
      ...prevState,
      player: {
        ...prevState.player,
        imageObj: imageObj,
      },
    }));
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (isModalOpen) {
      const timer = setTimeout(() => {
        setIsModalOpen(false);
        navigate('/combat');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isModalOpen, navigate]);

  // load image on initial render and update matrix
  useEffect(() => {
    setState((prevState) => ({
      ...prevState,
      matrix: randomTile([...prevState.matrix]),
    }));
    updateMatrix(state.player.y, state.player.x, 2);
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    // render gameboard on every state change to show player moving
    renderGameBoard();

    // push state to local storage if it changes
    saveStateToLocalStorage(state);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [state.matrix, state.player.x, state.player.y, state.player.imageObj]);

  const isValidMove = (targetX, targetY, x, y) => {

    if (
      targetX >= 0 &&
      targetX < state.matrix[0].length &&
      targetY >= 0 &&
      targetY < state.matrix.length &&
      (state.matrix[targetY][targetX] === 0 ||
        state.matrix[targetY][targetX] === 3) &&
      
      ((Math.abs(x) === 1 && y === 0) || (Math.abs(y) === 1 && x === 0)) 
    ) {
      return true;
    }
    return false;
  };

  const updateMatrix = (y, x, val) => {
    setState((prevState) => ({
      ...prevState,
      matrix: prevState.matrix.map((row, rowIndex) =>
        rowIndex === y
          ? row.map((cell, cellIndex) => (cellIndex === x ? val : cell))
          : row
      ),
    }));
  };
  const checkWinCondition = (x, y) => {
    if (x === 7 && y === 28) {
      // maze exit is 7 28
      setHasWon(true);
    }
  };

  const handleMobileMove = (direction) => {
    let x = 0;
    let y = 0;

    switch (direction) {
      case 'left':
        x = -1;
        break;
      case 'right':
        x = 1;
        break;
      case 'up':
        y = -1;
        break;
      case 'down':
        y = 1;
        break;
      default:
        return;
    }

    const move = (x, y) => {
      const targetX = state.player.x + x;
      const targetY = state.player.y + y;
      if (isValidMove(targetX, targetY, x, y)) {
        updateMatrix(state.player.y, state.player.x, 0);
        updateMatrix(state.player.y + y, state.player.x + x, 2);
        setState((prevState) => ({
          ...prevState,
          player: {
            ...prevState.player,
            x: prevState.player.x + x,
            y: prevState.player.y + y,
          },
        }));
        renderGameBoard();

        checkWinCondition(targetX, targetY);

        if (state.matrix[targetY][targetX] === 3) {
          return setIsModalOpen(true);
        }
      }
    };
    move(x, y);
  };


  const handleKeyDown = ({ keyCode }) => {
    const move = (x, y) => {
      const targetX = state.player.x + x;
      const targetY = state.player.y + y;
      if (isValidMove(targetX, targetY, x, y)) {
        updateMatrix(state.player.y, state.player.x, 0);
        updateMatrix(state.player.y + y, state.player.x + x, 2);
        setState((prevState) => ({
          ...prevState,
          player: {
            ...prevState.player,
            x: prevState.player.x + x,
            y: prevState.player.y + y,
          },
        }));
        renderGameBoard();

        checkWinCondition(targetX, targetY);

        if (state.matrix[targetY][targetX] === 3) {
          return setIsModalOpen(true);
        }
      }
    };

    switch (keyCode) {
      case 37: // left
        move(-1, 0);
        break;
      case 39: // right
        move(1, 0);
        break;
      case 38: // up
        move(0, -1);
        break;
      case 40: // down
        move(0, 1);
        break;
      default:
        break;
    }
  };

  const getCenter = (w, h) => {
    return {
      x: window.innerWidth / 2 - w / 2,
      y: window.innerHeight / 2 - h / 2,
    };
  };

  const renderGameBoard = () => {
    if (
      !outlineCanvasRef.current ||
      !state.player.imageObj
    ) {
      return;
    }

    const isMobile = window.innerWidth <= 768;
    const cellSize = isMobile ? 10 : 20; 
    const padding = 2; 
    
    const outlineContext = outlineCanvasRef.current.getContext('2d');
    outlineContext.canvas.width = w;
    outlineContext.canvas.height = h;

    const center = getCenter(w, h); 
    outlineCanvasRef.current.style.marginLeft = center.x;
    outlineCanvasRef.current.style.marginTop = center.y;

    for (let row = 0; row < state.matrix.length; row++) {
      for (let col = 0; col < state.matrix[row].length; col++) {
        const cellVal = state.matrix[row][col];
        let color; 

        if (cellVal === 1) {
          color = 'darkgreen';
        } else if (cellVal == 3) {
          color = 'darkred';
        } else {
          color = '#D2B48C';
        }

        outlineContext.fillStyle = color;
        outlineContext.fillRect(
          col * (cellSize + padding),
          row * (cellSize + padding),
          cellSize,
          cellSize
        );

        if (cellVal === 2) {
          outlineContext.drawImage(
            state.player.imageObj,
            0,
            0,
            128,
            128,
            col * (cellSize + padding),
            row * (cellSize + padding),
            cellSize,
            cellSize
          );
        }
      }
    }
  };

  const isMobile = window.innerWidth <= 768;
  const cellSize = isMobile ? 10 : 20; 
  const padding = 2;


  const w = isMobile
    ? (cellSize + padding) * gameboard.matrix[0].length - padding
    : (cellSize + padding) * gameboard.matrix[0].length - padding;
  const h = isMobile
    ? (cellSize + padding) * gameboard.matrix.length - padding
    : (cellSize + padding) * gameboard.matrix.length - padding;

  const center = getCenter(w, h);

  return (
    <div className='center'>
      <canvas
        ref={outlineCanvasRef}
        width={w}
        height={h}
        style={{ ...center, background: '#444', border: '3px solid darkred' }}
      />

        <div className="mobile-controls">
          <button onClick={() => handleMobileMove('up')}>Up</button>
          <button onClick={() => handleMobileMove('left')}>Left</button>
          <button onClick={() => handleMobileMove('down')}>Down</button>
          <button onClick={() => handleMobileMove('right')}>Right</button>
        </div>
      
      {isModalOpen && (
        <MonsterModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          type={1}
        />
      )}
      {hasWon && (
        <MonsterModal
          isOpen={hasWon}
          onClose={() => {
            setState(getInitialState(gameboard));
            setHasWon(false);
            navigate('/tavern');
            localStorage.removeItem('gameState');
            localStorage.removeItem('randomTilesGenerated');
          }}
          type={2}
        />
      )}
    </div>
  );
};

export default GridSystem;
