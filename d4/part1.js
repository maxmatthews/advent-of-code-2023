const intersection = require("lodash.intersection");
//import file system package from node
const fs = require("fs");
//read input.txt file (from advent input) as a string
const fileContents = fs.readFileSync("./input.txt", "utf-8");
//break apart the file based off of where the new lines are
const allLines = fileContents.trim().split(/\r?\n/);

let totalPoints = 0;
let pointsArray = [1];
for (let i = 1; i < 50; i++) {
  pointsArray[i] = pointsArray[i - 1] * 2;
}

for (const [gameNumIndex, line] of Object.entries(allLines)) {
  const gameNum = parseInt(gameNumIndex) + 1;
  const gameRegex = line.match(/Card.*\d+: (.*?) \| (.*)/);
  console.log(line);
  const leftCards = gameRegex[1]
    .split(" ")
    .map((x) => parseInt(x))
    .filter((x) => !isNaN(x));
  const rightCards = gameRegex[2]
    .split(" ")
    .map((x) => parseInt(x))
    .filter((x) => !isNaN(x));
  const overlap = intersection(leftCards, rightCards);

  if (overlap.length) {
    totalPoints += pointsArray[overlap.length - 1];
  }
}
console.log(totalPoints);
