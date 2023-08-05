import React, { useState, useEffect, useRef } from 'react';
import HeroImg from '../utils/images/Archer.png';

import gameboard from '../utils/gameboards.js';

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
          // changed to 3 to avoid any uunforseen errors using falsy -1
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

// const loadStateFromLocalStorage = (setState) => {
//   const savedState = JSON.parse(localStorage.getItem('gameState'));
//   if (savedState) {
//     setState(savedState);
//   }
// };
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
  // const { matrix, playerX, playerY } = gameboard;
  //! const uiCanvasRef = useRef(null);
  const outlineCanvasRef = useRef(null);
  //! const topCanvasRef = useRef(null);

  const [state, setState] = useState(
    //   {
    //   matrix: [...matrix],
    //   player: {
    //     x: playerX,
    //     y: playerY,
    //     color: 'red',
    //     imageObj: null,
    //   },
    // }
    getInitialState(gameboard)
  );
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
    outlineCanvasRef.current.addEventListener('click', handleClick);

    // render gameboard on every state change to show player moving
    renderGameBoard();

    // push state to local storage if it changes
    saveStateToLocalStorage(state);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [state.matrix, state.player.x, state.player.y, state.player.imageObj]);

  const isValidMove = (targetX, targetY, x, y) => {
    // const targetX = state.player.x + x;
    // const targetY = state.player.y + y;
    // const diffX = Math.abs(x); // remove this to restrict diagonal moves
    // const diffY = Math.abs(y); // same as above

    if (
      targetX >= 0 &&
      targetX < state.matrix[0].length &&
      targetY >= 0 &&
      targetY < state.matrix.length &&
      // added extra condition to see if our guy is running into a monster
      (state.matrix[targetY][targetX] === 0 ||
        state.matrix[targetY][targetX] === 3) &&
      // diffX <= 1 && // remove this to restrict diagonal moves
      // diffY <= 1 // same as above
      ((Math.abs(x) === 1 && y === 0) || (Math.abs(y) === 1 && x === 0)) // add this back in to restrict diagonal moves
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

        //! i think this is where we can put in logic to call combat stuff
        if (state.matrix[targetY][targetX] === 3) {
          alert('A wild monster appeared!');
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

  const handleClick = (event) => {
    const cellSize = 40;
    const padding = 2;

    // Grabs the location of the click and accounts for the border stuff
    const x = event.clientX;
    const y = event.clientY;

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
      // !uiCanvasRef.current ||
      // !topCanvasRef.current ||
      !state.player.imageObj
    ) {
      return; // makes sure image and canvas are ready before rendering
    }

    const cellSize = 20; // Modify as needed
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

    // // Adjust topContext as needed (retrieve from ref)
    //! topCanvasRef.current.style.marginLeft = center.x;
    //! topCanvasRef.current.style.marginTop = center.y;

    // Loops through every cell in the matrix
    for (let row = 0; row < state.matrix.length; row++) {
      for (let col = 0; col < state.matrix[row].length; col++) {
        const cellVal = state.matrix[row][col];
        let color; //

        if (cellVal === 1) {
          color = '#0038c7';
        } else if (cellVal == 3) {
          color = '#edb51a';
        } else {
          color = '#FFFFFF';
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

    // // Retrieve the context from the uiCanvasRef and update UI as needed
    //! const uiContext = uiCanvasRef.current.getContext('2d');
    //! uiContext.font = '20px Courier';
    //! uiContext.fillStyle = 'white';
    //! uiContext.fillText('Grid Based System', 20, 30);
  };

  const cellSize = 30;
  const padding = 2;

  const w = (cellSize + padding) * gameboard.matrix[0].length - padding;
  const h = (cellSize + padding) * gameboard.matrix.length - padding;

  const center = getCenter(w, h);

  return (
    <div>
      {/* <canvas
        ref={uiCanvasRef}
        width={420}
        height={580}
        style={{ ...center, background: '#000' }}
      /> */}

      <canvas
        ref={outlineCanvasRef}
        width={w}
        height={h}
        style={{ ...center, background: '#444' }}
      />
      <br />
      <button
        onClick={() => {
          localStorage.removeItem('gameState');
          localStorage.removeItem('randomTilesGenerated');
          setState(getInitialState(gameboard));
          window.location.reload();
        }}>
        Reset
      </button>
      {/* <canvas
        ref={topCanvasRef}
        width={w}
        height={h}
        style={{
          ...center,
          background: '#111',
          backgroundColor: 'transparent',
        }}
      /> */}
    </div>
  );
};

export default GridSystem;
