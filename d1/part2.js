//import file system package from node
const fs = require("fs");
//read input.txt file (from advent input) as a string
const fileContents = fs.readFileSync("./input.txt", "utf-8");
//break apart the file based off of where the new lines are
const allLines = fileContents.split(/\r?\n/);

let total = 0;

//loop over all lines in the input
for (let line of allLines) {
	line = line
		.replaceAll("one", "one1one")
		.replaceAll("two", "two2two")
		.replaceAll("three", "three3three")
		.replaceAll("four", "four4four")
		.replaceAll("five", "five5five")
		.replaceAll("six", "six6six")
		.replaceAll("seven", "seven7seven")
		.replaceAll("eight", "eight8eight")
		.replaceAll("nine", "nine9nine");

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
	// console.log(firstNumber, lastNumber);
	total += parseInt(`${firstNumber}${lastNumber}`);
}

console.log(total);
