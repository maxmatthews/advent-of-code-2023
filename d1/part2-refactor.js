//import file system package from node
const fs = require("fs");
//read input.txt file (from advent input) as a string
const fileContents = fs.readFileSync("./input.txt", "utf-8");
//break apart the file based off of where the new lines are
const allLines = fileContents.split(/\r?\n/);

const nums = [
	["one", 1],
	["two", 2],
	["three", 3],
	["four", 4],
	["five", 5],
	["six", 6],
	["seven", 7],
	["eight", 8],
	["nine", 9],
];

let results = [];

//loop over all lines in the input
for (let line of allLines) {
	let lowestIndex = line.length;
	let highestIndex = 0;
	let lowestNum, highestNum, lowestConvertedNum, highestConvertNum;

	for (const [num, convertedNum] of nums) {
		const index = line.indexOf(num);
		if (index !== -1 && index < lowestIndex) {
			lowestIndex = index;
			lowestNum = num;
			lowestConvertedNum = convertedNum;
		}
	}

	for (const [num, convertedNum] of nums) {
		const index = line.lastIndexOf(num);
		if (index !== -1 && index > highestIndex) {
			highestIndex = index;
			highestNum = num;
			highestConvertNum = convertedNum;
		}
	}

	//I don't love having to duplicate the string here, I think
	//replacing it at the index we already found is a better approach
	results.push(
		`${line.replace(lowestNum, lowestConvertedNum)}${line.replaceAll(
			highestNum,
			highestConvertNum
		)}`
	);
}

let total = 0;

//loop over all lines in the input
for (const line of results) {
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
