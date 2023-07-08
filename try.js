class Cell {
  constructor(alive) {
    this.alive = alive;
  }

  isAlive() {
    return this.alive;
  }

  toggle() {
    this.alive = !this.alive;
  }
}

class GameOfLife {
  constructor(rows, cols) {
    this.rows = rows;
    this.cols = cols;
    this.grid = [];

    for (let i = 0; i < rows; i++) {
      this.grid[i] = [];
      for (let j = 0; j < cols; j++) {
        this.grid[i][j] = new Cell(false);
      }
    }
  }

  setCellState(row, col, alive) {
    this.grid[row][col] = new Cell(alive);
  }

  toggleCellState(row, col) {
    const cell = this.grid[row][col];
    cell.toggle();
  }

  getNextGeneration() {
    const newGrid = [];

    for (let i = 0; i < this.rows; i++) {
      newGrid[i] = [];
      for (let j = 0; j < this.cols; j++) {
        const cell = this.grid[i][j];
        const aliveNeighbors = this.countAliveNeighbors(i, j);

        if (cell.isAlive()) {
          if (aliveNeighbors < 2 || aliveNeighbors > 3) {
            newGrid[i][j] = new Cell(false);
          } else {
            newGrid[i][j] = new Cell(true);
          }
        } else {
          if (aliveNeighbors === 3) {
            newGrid[i][j] = new Cell(true);
          } else {
            newGrid[i][j] = new Cell(false);
          }
        }
      }
    }

    this.grid = newGrid;
  }

  countAliveNeighbors(row, col) {
    let count = 0;

    for (let i = row - 1; i <= row + 1; i++) {
      for (let j = col - 1; j <= col + 1; j++) {
        if (
          i >= 0 &&
          i < this.rows &&
          j >= 0 &&
          j < this.cols &&
          !(i === row && j === col)
        ) {
          if (this.grid[i][j].isAlive()) {
            count++;
          }
        }
      }
    }

    return count;
  }

  printGrid() {
    for (let i = 0; i < this.rows; i++) {
      let row = "";
      for (let j = 0; j < this.cols; j++) {
        row += this.grid[i][j].isAlive() ? "X" : "-";
      }
      console.log(row);
    }
  }
}

const rows = 100;
const cols = 100;
const game = new GameOfLife(rows, cols);

// Set initial state
game.setCellState(50, 49, true);
game.setCellState(50, 50, true);
game.setCellState(50, 51, true);
game.setCellState(49, 50, true);
game.setCellState(51, 50, true);
game.setCellState(48, 50, true);
game.setCellState(52, 50, true);

game.printGrid(); // Initial generation

console.log("-----");

let generationCount = 1;
const interval = setInterval(() => {
  console.clear();
  game.getNextGeneration();
  console.log(`Generation ${generationCount}:`);
  game.printGrid();
  console.log("-----");

  generationCount++;

  if (generationCount > 3) {
    clearInterval(interval);
  }
}, 1000);