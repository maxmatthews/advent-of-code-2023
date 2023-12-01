//import file system package from node
const fs = require("fs");
//read input.txt file (from advent input) as a string
const fileContents = fs.readFileSync("./input.txt", "utf-8");
//break apart the file based off of where the new lines are
const allLines = fileContents.split(/\r?\n/);

let total = 0;

//loop over all lines in the input
for (const line of allLines) {
	//prevent scoping issues by declaring a variable to store our first num
	let firstNumber, lastNumber;

	//loop over every char in the line
	for (let i = 0; i < line.length; i++) {
		//extract the char using the index
		const currentCharacter = line[i];
		//check to see if the character is a number
		if (!isNaN(currentCharacter)) {
			//store the character in firstNumber
			firstNumber = currentCharacter;
			break; //stop running the loop, we found the num
		}
	}

	//loop over every char in the line starting at the end
	for (let i = line.length - 1; i >= 0; i--) {
		//extract the char using the index
		const currentCharacter = line[i];
		//check to see if the character is a number
		if (!isNaN(currentCharacter)) {
			//store the character in lastNumNumber
			lastNumber = currentCharacter;
			break; //stop running the loop, we found the num
		}
	}

	// const concatNumbers = firstNumber + lastNumber;
	// total += parseInt(concatNumbers)

	total += parseInt(`${firstNumber}${lastNumber}`);
}

console.log(total);
