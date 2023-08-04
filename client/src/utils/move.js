import { Component } from 'react';
import HeroImg from './images/Hero.png';
import '../assets/css/gameboard.css';

//this is the hard-coded array for the gameboard maze
const maze1 = [
  [1,   1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1],
  [1,   0,  0,  0,  0,  0,  1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1,  0,  0,  0,  0,  0,  0,  0,  1,  0,  0,  0,  1],
  [1,   0,  1,  1,  1,  0,  1,  0,  1,  1,  1,  1,  1,  1,  1,  0,  1,  0,  1,  1,  1,  1,  1,  0,  1,  0,  1,  0,  1],
  [1,   0,  0,  0,  1,  0,  1,  0,  0,  0,  1,  0,  0,  0,  1,  0,  1,  0,  1,  0,  0,  0,  1,  0,  1,  0,  1,  0,  1],
  [1,   1,  1,  1,  1,  0,  1,  1,  1,  1,  1,  0,  1,  0,  1,  0,  1,  0,  1,  1,  1,  0,  1,  0,  1,  1,  1,  0,  1],
  [0,   0,  0,  0,  0,  0,  1,  0,  0,  0,  1,  0,  1,  0,  1,  0,  1,  0,  0,  0,  0,  0,  1,  0,  1,  0,  0,  0,  1],
  [1,   1,  1,  1,  1,  0,  1,  0,  1,  0,  1,  1,  1,  0,  1,  0,  1,  1,  1,  1,  1,  1,  1,  0,  1,  0,  1,  0,  1],
  [1,   0,  0,  0,  0,  0,  1,  0,  1,  0,  0,  0,  0,  0,  0,  0,  1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1,  0,  1],
  [1,   0,  1,  1,  1,  0,  1,  1,  1,  0,  1,  1,  1,  1,  1,  0,  1,  0,  1,  1,  1,  0,  1,  1,  1,  1,  1,  0,  1],
  [1,   0,  1,  0,  1,  0,  0,  0,  0,  0,  1,  0,  0,  0,  1,  0,  1,  0,  1,  0,  1,  0,  1,  0,  0,  0,  1,  0,  1],
  [1,   0,  1,  0,  1,  1,  1,  1,  1,  1,  1,  0,  1,  1,  1,  0,  1,  0,  1,  0,  1,  0,  1,  0,  1,  1,  1,  1,  1],
  [1,   0,  0,  0,  1,  0,  0,  0,  0,  0,  1,  0,  0,  0,  0,  0,  1,  0,  0,  0,  1,  0,  0,  0,  1,  0,  0,  0,  1],
  [1,   0,  1,  0,  1,  0,  1,  0,  1,  1,  1,  0,  1,  1,  1,  1,  1,  0,  1,  0,  1,  0,  1,  0,  1,  0,  1,  1,  1],
  [1,   0,  1,  0,  1,  0,  1,  0,  0,  0,  1,  0,  1,  0,  0,  0,  0,  0,  1,  0,  1,  0,  1,  0,  0,  0,  0,  0,  1],
  [1,   0,  1,  0,  1,  0,  1,  1,  1,  0,  1,  0,  1,  1,  1,  1,  1,  1,  1,  1,  1,  0,  1,  1,  1,  1,  1,  1,  1],
  [1,   0,  1,  0,  1,  0,  1,  0,  1,  0,  1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1,  0,  0,  0,  0,  0,  1,  0,  1],
  [1,   0,  1,  0,  1,  0,  1,  0,  1,  0,  0,  0,  1,  1,  1,  1,  1,  1,  1,  0,  1,  1,  1,  1,  1,  0,  1,  0,  1],
  [1,   0,  1,  0,  1,  1,  1,  0,  1,  1,  1,  1,  1,  0,  0,  0,  0,  0,  1,  0,  1,  0,  0,  0,  1,  0,  0,  0,  1],
  [1,   0,  1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1,  0,  1,  1,  1,  0,  1,  0,  1,  1,  1,  0,  1,  1,  1,  0,  1],
  [1,   0,  1,  1,  1,  0,  1,  0,  1,  0,  0,  0,  1,  0,  0,  0,  1,  0,  1,  0,  0,  0,  0,  0,  0,  0,  1,  0,  1],
  [1,   0,  1,  0,  0,  0,  1,  0,  1,  1,  1,  1,  1,  1,  1,  1,  1,  0,  1,  0,  1,  1,  1,  1,  1,  0,  1,  0,  1],
  [1,   0,  1,  0,  1,  1,  1,  0,  0,  0,  0,  0,  1,  0,  0,  0,  1,  0,  1,  0,  1,  0,  0,  0,  1,  0,  1,  0,  1],
  [1,   0,  1,  0,  1,  0,  1,  1,  1,  1,  1,  0,  1,  0,  1,  0,  1,  0,  0,  0,  1,  0,  1,  1,  1,  0,  1,  1,  1],
  [1,   0,  0,  0,  1,  0,  1,  0,  0,  0,  1,  0,  0,  0,  1,  0,  1,  0,  1,  0,  1,  0,  0,  0,  0,  0,  0,  0,  1],
  [1,   1,  1,  1,  1,  0,  1,  0,  1,  0,  1,  0,  1,  0,  1,  0,  1,  0,  1,  0,  1,  1,  1,  1,  1,  1,  1,  1,  1],
  [1,   0,  0,  0,  0,  0,  0,  0,  1,  0,  1,  0,  1,  0,  1,  0,  0,  0,  1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1],
  [1,   0,  1,  1,  1,  1,  1,  1,  1,  0,  1,  1,  1,  0,  1,  1,  0,  1,  1,  1,  1,  0,  1,  1,  1,  1,  0,  1,  1],
  [1,   0,  0,  0,  0,  0,  0,  0,  1,  0,  0,  0,  0,  0,  1,  0,  0,  0,  1,  0,  0,  0,  0,  0,  1,  0,  0,  0,  1],
  [1,   1,  1,  1,  1,  1,  1,  0,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1],
  ];

  //starting position for the player in the maze
  const startForMaze1 = [0, 5];

export default class GridSystem extends Component{
  constructor(props) {
    super(props);
    //props will include matrix (the gameboard array), playerX, and playerY for the intial position
    this.matrix = maze1;
    this.playerX = startForMaze1[0];
    this.playerY = startForMaze1[1];
   

    this.matrix = this.#randomTile(this.matrix);
    this.uiContext = this.#getContext(420, 580, '#000');
    this.outlineContext = this.#getContext(0, 0, '#444');
    this.topContext = this.#getContext(0, 0, '#111', true);
    this.cellSize = 20;
    this.padding = 2;
    // this.player = { x: playerX, y: playerY, image: "./images/Hero.png", color: 'red' };
    // this.matrix[playerY][playerX] = 2;
    // -------------------------------
    // i had to assign the player image here and force it to render syncronously on load. without this the image didn't load in time for the player to see it
    this.player = { x: this.playerX, y: this.playerY, color: 'red' };
    this.player.imageObj = new Image();
    this.player.imageObj.onload = () => {
      this.render();
    };
    this.player.imageObj.src = HeroImg;
    this.matrix[this.playerY][this.playerX] = 2;

    /*
        this.canvas = document.querySelector('#canvas');

        this.ctx = this.canvas.getContext("2d");
*/
    window.addEventListener('keydown', this.#movePlayer);
    // trying to add on click functionality
    this.outlineContext.canvas.addEventListener('click', this.#handleClick);
  }

  // #isValidMove(x, y) {
  //     if (this.matrix[this.player.y + y][this.player.x + x] === 0) {
  //         return true;
  //     }
  //     return false;
  // }

  // updated this section to ensure to keep the player in bounds, things could get weird as we start to add more functionality on this without the extra guard rails in place
  //   #isValidMove(x, y) {
  //     if (
  //       this.player.x + x >= 0 &&
  //       this.player.x + x < this.matrix[0].length &&
  //       this.player.y + y >= 0 &&
  //       this.player.y + y < this.matrix.length &&
  //       this.matrix[this.player.y + y][this.player.x + x] === 0
  //     ) {
  //       return true;
  //     }
  //     return false;
  //   }

  // version 2 - updated with restrictions on on how far the player can move. this one lets them move diagonally...we can decide if we want to allow that or not
  #isValidMove(x, y) {
    const targetX = this.player.x + x;
    const targetY = this.player.y + y;
    const diffX = Math.abs(x); // remove this to restrict diagonal moves
    const diffY = Math.abs(y); // same as above

    if ((
      targetX >= 0 &&
      targetX < this.matrix[0].length &&
      targetY >= 0 &&
      targetY < this.matrix.length &&
      ((this.matrix[targetY][targetX] === 0) || (this.matrix[targetY][targetX] === -1)) &&
      diffX <= 1 && // remove this to restrict diagonal moves
      diffY <= 1 )// same as above
      //   ((Math.abs(x) === 1 && y === 0) || (Math.abs(y) === 1 && x === 0)) // add this back in to restrict diagonal moves
      
    ) {
      return true;
    }
    return false;
  }

  #updateMatrix(y, x, val) {
    this.matrix[y][x] = val;
  }

  #movePlayer = ({ keyCode }) => {
  console.log("Move player called");
    if (keyCode === 37) {
      if (this.#isValidMove(-1, 0)) {
        this.#updateMatrix(this.player.y, this.player.x, 0);
        this.#updateMatrix(this.player.y, this.player.x - 1, 2);
        this.player.x--;
        this.render();
      }
    } else if (keyCode === 39) {
      if (this.#isValidMove(1, 0)) {
        this.#updateMatrix(this.player.y, this.player.x, 0);
        this.#updateMatrix(this.player.y, this.player.x + 1, 2);
        this.player.x++;
        this.render();
      }
    } else if (keyCode === 38) {
      if (this.#isValidMove(0, -1)) {
        this.#updateMatrix(this.player.y, this.player.x, 0);
        this.#updateMatrix(this.player.y - 1, this.player.x, 2);
        this.player.y--;
        this.render();
      }
    } else if (keyCode === 40) {
      if (this.#isValidMove(0, 1)) {
        this.#updateMatrix(this.player.y, this.player.x, 0);
        this.#updateMatrix(this.player.y + 1, this.player.x, 2);
        this.player.y++;
        this.render();
      }
    }
  };

  // trying to add handle click functionality --------------------
  #handleClick = (event) => {
    // grabs the location of the click and accounts for the border stuff
    const x = event.clientX - this.outlineContext.canvas.offsetLeft;
    const y = event.clientY - this.outlineContext.canvas.offsetTop;

    // takes the click location and figures out exactly which cell it is
    const col = Math.floor(x / (this.cellSize + this.padding));
    const row = Math.floor(y / (this.cellSize + this.padding));

    // determines how for the user wants to move and then checks to make sure it's a valid move before sending to the move function
    const diffX = col - this.player.x;
    const diffY = row - this.player.y;

    if (this.#isValidMove(diffX, diffY)) {
      this.#moveTo(row, col);
    }
  };

  #moveTo(row, col) {
    // checks to make sure the location isn't a wall. this is probably where we would put conditional statements to do different things as they interact with enemies, environments, etc
    if (this.matrix[row][col] === 0) {
      // empties players current position so it's blank when dude moves
      this.#updateMatrix(this.player.y, this.player.x, 0);

      // self explanatory
      this.player.x = col;
      this.player.y = row;

      // sets new player position on board and then rerenders to show he actually got up an moved
      this.#updateMatrix(this.player.y, this.player.x, 2);

      this.render();
    }
  }
  // -------------------------------------------

  #getCenter(w, h) {
    return {
      x: window.innerWidth / 2 - w / 2 + 'px',
      y: window.innerHeight / 2 - h / 2 + 'px',
    };
  }

  #getContext(w, h, color = '#111', isTransparent = false) {
    this.canvas = document.createElement('canvas');
    //this.canvas = reactDOM.createElement('canvas')
    this.ctx = this.canvas.getContext('2d');
    this.width = this.canvas.width = w;
    this.height = this.canvas.height = h;
    this.canvas.style.position = 'absolute';
    this.canvas.style.background = color;
    if (isTransparent) {
      this.canvas.style.backgroundColor = 'transparent';
    }
    const center = this.#getCenter(w, h);
    this.canvas.style.marginLeft = center.x;
    this.canvas.style.marginTop = center.y;
    document.body.appendChild(this.canvas);

    return this.ctx;
  }

  #randomTile(matrix) {
    for (let i = 0; i < matrix.length; i++) {
      for (let h = 0; h < matrix[i].length; h++) {
        if (matrix[i][h] === 0) {
          const rando = Math.floor(Math.random() * 100);
          if (rando <= 5) {
            matrix[i][h] = -1;
          }
          
        }
      }
    }
    console.log(matrix);
    return matrix;
    
  }

  // render() {
  //     const w = (this.cellSize + this.padding) * this.matrix[0].length - (this.padding);
  //     const h = (this.cellSize + this.padding) * this.matrix.length - (this.padding);

  //     this.outlineContext.canvas.width = w;
  //     this.outlineContext.canvas.height = h;

  //     const center = this.#getCenter(w, h);
  //     this.outlineContext.canvas.style.marginLeft = center.x
  //     this.outlineContext.canvas.style.marginTop = center.y;

  //     this.topContext.canvas.style.marginLeft = center.x
  //     this.topContext.canvas.style.marginTop = center.y;

  //     for (let row = 0; row < this.matrix.length; row++) {
  //         for (let col = 0; col < this.matrix[row].length; col++) {
  //             const cellVal = this.matrix[row][col];
  //             let color = "#FFFFFF";

  //             if (cellVal === 1) {
  //                 color = "#0038c7";
  //                 console.log('wall')
  //             } else if (cellVal === 2) {
  //                 console.log('player');
  //                 //color = this.player.color;
  //                 const image = new Image();
  //                 image.src = this.player.image;
  //                 image.onload = () => {
  //                     //this.ctx.drawImage(image, 0, 0, 128, 128, 0, 0, 128, 128);
  //                     console.log('painting');
  //                     this.outlineContext.drawImage(image, 0, 0, 128, 128, 120, 120, 40, 40);
  //                 }

  //             }

  //             this.outlineContext.fillStyle = color;
  //             this.outlineContext.fillRect(col * (this.cellSize + this.padding),
  //                 row * (this.cellSize + this.padding),
  //                 this.cellSize, this.cellSize);

  //         }
  //     }

  //     this.uiContext.font = "20px Courier";
  //     this.uiContext.fillStyle = "white";
  //     this.uiContext.fillText("Grid Based System", 20, 30);
  // }

  // starting from scratch to understand the code better
  render() {
    
    // first it determines the height and width of the whole gameboard by adding this stuff up and then actually sets it to the canvas
    const w =
      (this.cellSize + this.padding) * this.matrix[0].length - this.padding;
    const h =
      (this.cellSize + this.padding) * this.matrix.length - this.padding;

    this.outlineContext.canvas.width = w;
    this.outlineContext.canvas.height = h;

    // similar to above stuff, figues out where the center of the canvas is and then sets margins to center it on the page
    const center = this.#getCenter(w, h);
    this.outlineContext.canvas.style.marginLeft = center.x;
    this.outlineContext.canvas.style.marginTop = center.y;

    // i dont know that we're using this, but maybe this is where we lay the background or something
    this.topContext.canvas.style.marginLeft = center.x;
    this.topContext.canvas.style.marginTop = center.y;

    // loops thru every cell in the matrix and sets it as a wall, walkable space, or player. again can probably implement logic here to do different things as they interact with mosters, environments, etc
    for (let row = 0; row < this.matrix.length; row++) {
      for (let col = 0; col < this.matrix[row].length; col++) {
        const cellVal = this.matrix[row][col];
        let color = '#FFFFFF'; // Default color for empty cells

        if (cellVal == -1) {
          color = '#edb51a'
        }

        if (cellVal === 1) {
          color = '#0038c7';
        }

        this.outlineContext.fillStyle = color;
        this.outlineContext.fillRect(
          col * (this.cellSize + this.padding),
          row * (this.cellSize + this.padding),
          this.cellSize,
          this.cellSize
        );

        if (cellVal === 2) {
          this.outlineContext.drawImage(
            this.player.imageObj,
            0,
            0,
            128,
            128,
            col * (this.cellSize + this.padding),
            row * (this.cellSize + this.padding),
            this.cellSize,
            this.cellSize
          );

          
        }
      }
    }

    this.uiContext.font = '20px Courier';
    this.uiContext.fillStyle = 'white';
    this.uiContext.fillText('Grid Based System', 20, 30);
    return;
  }
}

