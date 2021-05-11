import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import Buttons from './components/Buttons';
import Grid from './components/Grid';


// Main App Component
class Main extends React.Component {
  constructor() {
    super();
    this.speed = 100;
    this.rows = 35;
    this.cols = 98;

    this.state = {
      generation: 0,
      gridFull: Array(this.rows).fill().map(() => Array(this.cols).fill(false))
    }
  }

  // Handle clicking to toggle squares on grid
  selectBox = (row, col) => {
    let gridCopy = arrayClone(this.state.gridFull);
    gridCopy[row][col] = !gridCopy[row][col];
    this.setState({
      gridFull: gridCopy
    });
  }

  playButton = () => {
    clearInterval(this.intervalId)
    this.intervalId = setInterval(this.play, this.speed);
  }

  pauseButton = () => {
    clearInterval(this.intervalId);
  }

  clear = () => {
    var grid = Array(this.rows).fill().map(() => Array(this.cols).fill(false));
    this.setState({
      gridFull: grid, 
      generation: 0
    });
  }

  slow = () => {
    this.speed *= 2;
    this.playButton();
  }

  fast = () => {
    this.speed /= 2;
    this.playButton();
  }

  // Randomize the board
  seed = () => {
    this.clear();
    let gridCopy = arrayClone(this.state.gridFull);
    for(let i = 0; i < this.rows; i++) {
      for(let j = 0; j < this.cols; j++) {
        if (Math.floor(Math.random() * 4) === 1) {
          gridCopy[i][j] = true;
        }
      }
    }
    this.setState({
      gridFull: gridCopy
    });
  }

  // Handle main game logic
  play = () => {
    let grid1 = this.state.gridFull;
    let grid2 = arrayClone(this.state.gridFull);

    for(let i = 0; i < this.rows; i++) {
      for(let j = 0; j < this.cols; j++) {
        let neighbors = 0;
        if (i > 0) if (grid1[i-1][j]) neighbors++; // check above
        if (i > 0 && j > 0) if (grid1[i-1][j-1]) neighbors++; // check above left
        if (j > 0) if (grid1[i][j-1]) neighbors++; // check left
        if (i < this.rows-1 && j > 0) if(grid1[i+1][j-1]) neighbors++; // check below left
        if (i < this.rows-1) if(grid1[i+1][j]) neighbors++; // check below
        if (i < this.rows-1 && j < this.cols-1) if(grid1[i+1][j+1]) neighbors++; // check below right
        if (j < this.cols-1) if(grid1[i][j+1]) neighbors++; // check right
        if (i > 0 && j < this.cols-1) if(grid1[i-1][j+1]) neighbors++; // check above right

        // If cell is alive
        if (grid1[i][j]) {
          if (neighbors < 2 || neighbors > 3) grid2[i][j] = false;
        }
        // If cell is dead 
        else if (!grid1[i][j]) {
          if (neighbors === 3) grid2[i][j] = true;
        }
      }
    }
    this.setState({
      gridFull: grid2, 
      generation: this.state.generation + 1
    });
  }

  // Start with random board
  componentDidMount() {
    this.seed();
  }

  render() {
    return (
      <div>
        <h1>Conway's Game of Life</h1>
        <h2>Generations: {this.state.generation}</h2>

        <Grid
          gridFull={this.state.gridFull}
          rows={this.rows}
          cols={this.cols}
          selectBox={this.selectBox}
        />

        <Buttons 
          playButton={this.playButton}
          pauseButton={this.pauseButton}
          slow={this.slow}
          fast={this.fast}
          clear={this.clear}
          seed={this.seed}
        />
      </div>
    )
  }
}

// Helper method to make a deep copy of a given grid
function arrayClone(arr) {
  return JSON.parse(JSON.stringify(arr));
}

ReactDOM.render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>,
  document.getElementById('root')
);
