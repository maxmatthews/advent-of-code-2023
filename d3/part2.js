const intersection = require("lodash.intersection");
//import file system package from node
const fs = require("fs");
//read input.txt file (from advent input) as a string
const fileContents = fs.readFileSync("./input-snippet.txt", "utf-8");
//break apart the file based off of where the new lines are
const allLines = fileContents.trim().split(/\r?\n/);

const symbols = ["*", "$", "#", "+", "%", "&", "=", "-", "/", "@"];

letPartSum = 0;

let grid = [];

let emptyRow = [];
for (let i = 0; i < allLines[0].length + 2; i++) {
  emptyRow.push(".");
}
grid.push(emptyRow);

for (const row of allLines) {
  grid.push([".", ...row.split(""), "."]);
}

grid.push(emptyRow);

let partNumbers = [];

const getNeighbors = (matrix, row, col) => {
  row = parseInt(row);
  col = parseInt(col);
  const neighbors = [];

  // Define the possible directions for neighbors (assuming 8-directional neighbors)
  const directions = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];

  // Get the number of rows and columns in the matrix
  const numRows = matrix.length;
  const numCols = matrix[0].length;

  // Iterate through each direction to find neighbors
  for (const dir of directions) {
    const newRow = row + dir[0];
    const newCol = col + dir[1];

    // Check if the new coordinates are within bounds
    // if (newRow >= 0 && newRow < numRows && newCol >= 0 && newCol < numCols) {
    neighbors.push(matrix[newRow][newCol]);
    // }
  }

  return neighbors;
};

for (const [rowIndex, line] of Object.entries(grid)) {
  let numberAssembler = "";

  for (const [colIndex, character] of Object.entries(line)) {
    if ([".", ...symbols].includes(character)) {
      if (numberAssembler) {
        //we hit a period or a symbol, so check to see if this is a vaild part number
        let numberStartIndex = colIndex - numberAssembler.length;
        let neighbors = [
          ...getNeighbors(grid, rowIndex, numberStartIndex),
          ...getNeighbors(grid, rowIndex, numberStartIndex + 1),
        ];

        if (numberAssembler.length === 3) {
          neighbors.push(...getNeighbors(grid, rowIndex, numberStartIndex + 2));
        }

        const overlap = intersection(neighbors, symbols);
        if (overlap.includes) {
          partNumbers.push(parseInt(numberAssembler));
        }
      }

      numberAssembler = "";
    } else {
      numberAssembler += character;
    }
  }
}

console.log(partNumbers.reduce((a, b) => a + b, 0));
