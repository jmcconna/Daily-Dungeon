import React, { useState, useEffect, useRef } from 'react';
import HeroImg from '../utils/images/Hero.png';
import '../assets/css/gameboard.css';

const GridSystem = (props) => {
  const { matrix, playerX, playerY } = props;
  const uiCanvasRef = useRef(null);
  const outlineCanvasRef = useRef(null);
  const topCanvasRef = useRef(null);

  const [state, setState] = useState({
    matrix: [...matrix],
    player: {
      x: playerX,
      y: playerY,
      color: 'red',
      imageObj: null,
    },
  });

  // load image on initial render and update matrix
  useEffect(() => {
    updateMatrix(state.player.y, state.player.x, 2);
    const imageObj = new Image();
    imageObj.onload = () => {
      console.log(imageObj);
      setState((prevState) => ({
        ...prevState,
        player: {
          ...prevState.player,
          imageObj: imageObj, 
        },
      }));
    };
    imageObj.src = HeroImg;
  }, []); 

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    outlineCanvasRef.current.addEventListener('click', handleClick);
    renderGameBoard();
    console.log(state.player.x, state.player.y);

    // Cleanup (similar to componentWillUnmount)
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [state.matrix, state.player.x, state.player.y, state.player.imageObj]);

  const isValidMove = (x, y) => {
    const targetX = state.player.x + x;
    const targetY = state.player.y + y;
    const diffX = Math.abs(x); // remove this to restrict diagonal moves
    const diffY = Math.abs(y); // same as above

    if (
      targetX >= 0 &&
      targetX < state.matrix[0].length &&
      targetY >= 0 &&
      targetY < state.matrix.length &&
      state.matrix[targetY][targetX] === 0 &&
      diffX <= 1 && // remove this to restrict diagonal moves
      diffY <= 1 // same as above
      // ((Math.abs(x) === 1 && y === 0) || (Math.abs(y) === 1 && x === 0)) // add this back in to restrict diagonal moves
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

  const handleKeyDown = ({ keyCode }) => {
    const move = (x, y) => {
      if (isValidMove(x, y)) {
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

  const handleClick = (event) => {
    
    const cellSize = 40;
    const padding = 2;

    // Grabs the location of the click and accounts for the border stuff
    const x = event.clientX
    const y = event.clientY

    // Takes the click location and figures out exactly which cell it is
    const col = Math.floor(x / (cellSize + padding));
    const row = Math.floor(y / (cellSize + padding));

    // Determines how far the user wants to move and then checks to make sure it's a valid move before sending to the move function
    const diffX = col - state.player.x;
    const diffY = row - state.player.y;

    if (isValidMove(diffX, diffY)) {
      updateMatrix(state.player.y, state.player.x, 0);
      updateMatrix(row, col, 2);
      setState((prevState) => ({
        ...prevState,
        player: {
          ...prevState.player,
          x: col,
          y: row,
        },
      }));
      renderGameBoard();
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
      !uiCanvasRef.current ||
      !topCanvasRef.current ||
      !state.player.imageObj
    ) {
      return; // Return early if any of the canvas references are not defined
    }
    // Define cellSize and padding according to your use case
    const cellSize = 30; // Modify as needed
    const padding = 2; // Modify as needed

    // Determine the height and width of the whole gameboard
    const w = (cellSize + padding) * state.matrix[0].length - padding;
    const h = (cellSize + padding) * state.matrix.length - padding;

    // Retrieve the context from the outlineCanvasRef
    const outlineContext = outlineCanvasRef.current.getContext('2d');
    outlineContext.canvas.width = w;
    outlineContext.canvas.height = h;

    // Similar to above stuff, figures out where the center of the canvas is
    const center = getCenter(w, h); // Assume getCenter is defined elsewhere
    outlineCanvasRef.current.style.marginLeft = center.x;
    outlineCanvasRef.current.style.marginTop = center.y;

    // Adjust topContext as needed (retrieve from ref)
    topCanvasRef.current.style.marginLeft = center.x;
    topCanvasRef.current.style.marginTop = center.y;

    // Loops through every cell in the matrix
    for (let row = 0; row < state.matrix.length; row++) {
      for (let col = 0; col < state.matrix[row].length; col++) {
        const cellVal = state.matrix[row][col];
        let color = '#FFFFFF'; // Default color for empty cells

        if (cellVal === 1) {
          color = '#0038c7';
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

    // Retrieve the context from the uiCanvasRef and update UI as needed
    const uiContext = uiCanvasRef.current.getContext('2d');
    uiContext.font = '20px Courier';
    uiContext.fillStyle = 'white';
    uiContext.fillText('Grid Based System', 20, 30);
  };

  const cellSize = 30; // Define according to your use case
  const padding = 2; // Define according to your use case

  const w = (cellSize + padding) * props.matrix[0].length - padding;
  const h = (cellSize + padding) * props.matrix.length - padding;

  const center = getCenter(w, h);

  return (
    <div>
      <canvas
        ref={uiCanvasRef}
        width={420}
        height={580}
        style={{ ...center, background: '#000' }}
      />
    
        <canvas
          ref={outlineCanvasRef}
          width={w}
          height={h}
          style={{ ...center, background: '#444' }}
        />
  
      <canvas
        ref={topCanvasRef}
        width={w}
        height={h}
        style={{
          ...center,
          background: '#111',
          backgroundColor: 'transparent',
        }}
      />
    </div>
  );
};

export default GridSystem;
