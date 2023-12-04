//import file system package from node
const fs = require("fs");
//read input.txt file (from advent input) as a string
const fileContents = fs.readFileSync("./input.txt", "utf-8");
//break apart the file based off of where the new lines are
const allLines = fileContents.trim().split(/\r?\n/);

let idSum = 0;

//each line represents a game
lineLoop: for (const line of allLines) {
  //extract out the gameID and the rounds
  const gameRegex = line.match(/Game (\d+): (.*)/);
  const gameID = parseInt(gameRegex[1]);

  //split each round into an array
  const rounds = gameRegex[2].split("; ");
  let validGame = true;

  //rounds is an array of a group of colors ie: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
  for (const round of rounds) {
    //split this round into each color, ie:  3 blue, 4 red
    const colorsPull = round.split(", ");
    const colorCounter = { red: 0, green: 0, blue: 0 };

    for (const colorPull of colorsPull) {
      //extract 3 blue to 3 & blue
      const roundExtraction = colorPull.match(/(\d+) (.*)/);
      const numberOfDice = parseInt(roundExtraction[1]);
      const color = roundExtraction[2];

      //add each color to the colorCounter
      colorCounter[color] += numberOfDice;
    } //end of colorCounter for this round

    //if this round has more than 12 red, 13 green, or 14 blue, it's invalid
    if (
      colorCounter.red > 12 ||
      colorCounter.green > 13 ||
      colorCounter.blue > 14
    ) {
      validGame = false;
      continue lineLoop; //no need to keep checking the rest of the rounds in this game, it's already invalid
    }
  }
  if (validGame) {
    idSum += gameID;
  }
}

console.log(idSum);
