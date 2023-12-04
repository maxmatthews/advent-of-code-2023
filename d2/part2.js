//import file system package from node
const fs = require("fs");
//read input.txt file (from advent input) as a string
const fileContents = fs.readFileSync("./input.txt", "utf-8");
//break apart the file based off of where the new lines are
const allLines = fileContents.trim().split(/\r?\n/);

let power = 0;

//each line represents a game
lineLoop: for (const line of allLines) {
  //extract out the gameID and the rounds
  const gameRegex = line.match(/Game (\d+): (.*)/);
  const gameID = parseInt(gameRegex[1]);

  //split each round into an array
  const rounds = gameRegex[2].split("; ");
  let validGame = true;

  const colorMin = { red: 0, green: 0, blue: 0 };

  //rounds is an array of a group of colors ie: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
  for (const round of rounds) {
    //split this round into each color, ie:  3 blue, 4 red
    const colorsPull = round.split(", ");

    for (const colorPull of colorsPull) {
      //extract 3 blue to 3 & blue
      const roundExtraction = colorPull.match(/(\d+) (.*)/);
      const numberOfDice = parseInt(roundExtraction[1]);
      const color = roundExtraction[2];

      //keep track of the minimum number of dice of each color and only update it if this round uses more dice of that color
      if (numberOfDice > colorMin[color]) {
        colorMin[color] = numberOfDice;
      }
    } //end of colorCounter for this round
  }

  //calculate power for each round
  power += colorMin.red * colorMin.green * colorMin.blue;
}

console.log(power);
