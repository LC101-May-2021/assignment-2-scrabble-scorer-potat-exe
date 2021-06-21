// inspired by https://exercism.io/tracks/javascript/exercises/etl/solutions/91f99a3cca9548cebe5975d7ebca6a85

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

const vowels = ['a','e','i','o','u','A','E','I','O','U'];
let selectedWord = '';
let selectedAlgo = 0;


function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return console.log(letterPoints);
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
 
   let userInput = input.question("Let's play some scrabble! \nEnter a word: ");
   //console.log(oldScrabbleScorer(userInput));
   return userInput;

};

function simpleScore(word){

  //word = word.toUpperCase();

  let score = 0;

    
    for (let n = 0; n < word.length; n++){
      score = score + 1;
      
    }
    
  return score;  
};

function vowelBonusScore(word){

  word = word.toUpperCase();
  let score = 0;

  for(let n = 0; n < word.length; n++){

    if(vowels.includes(word[n]) ){
      score += 3;
    }
    else{
      score += 1;
    }
    
  }
  return score;
};

let simpleScorer = {
  name: "Simple: ",
  description: "Each letter is worth 1 point.",
  scoringFunction:  simpleScore
};

let vowelThreeScore = {
  name : "Bonus Vowels: ",
  description: "Vowels are worth 3 points. Everything else 1 point.",
  scoringFunction: vowelBonusScore
};

let scrabbleScorer = {
  name: "Scrabble: ",
  description: "The Traditional scoring algorithm.",
  scoringFunction: scrabbleScore
};

const scoringAlgorithms = [simpleScorer, vowelThreeScore, scrabbleScorer];

function scorerPrompt() {
  let userInput = input.question("What scoring algorithm would you like to use? \n\n" +  "0 - " + scoringAlgorithms[0].name + scoringAlgorithms[0].description + "\n1 - " + scoringAlgorithms[1].name + scoringAlgorithms[1].description + "\n2 - " + scoringAlgorithms[2].name + scoringAlgorithms[2].description + "\nEnter 0, 1, or 2: " );

  userInput = Number(userInput);

  if(userInput === 0){

    return scoringAlgorithms[0].scoringFunction(selectedWord);

  }else if(userInput === 1){

    return scoringAlgorithms[1].scoringFunction(selectedWord);

  }else if(userInput === 2){

    return scoringAlgorithms[2].scoringFunction(selectedWord);

  }
  else{
    console.log("Try again.");
    scorerPrompt();
  };
};

function transform(obj) {
  let newObj = {};
  

  for( n in obj){
    


    for(q in obj[n]){
      //console.log(q)
      //console.log(obj[n][q],n)
      //console.log(newObj[n])
      //newObj[n] += obj[n][q];
      
     newObj[oldPointStructure[n][q].toLowerCase()]= Number(n);
     //console.log(oldPointStructure[n][q])

    }
    
    //console.log(n)
    //console.log(obj[n])
  }
  console.log(newObj);
  return newObj;
};

let newPointStructure = transform(oldPointStructure);
//console.log(newPointStructure);
function scrabbleScore(word){
  word = word.toUpperCase();
	let letterPoints = 0;
    
    
    for (n in newPointStructure){
      
      for(let i = 0; i < word.length; i++){
        
        if(word[i].toLowerCase()===n.toLowerCase()){
          letterPoints += newPointStructure[n];
        }

      }

    }
	
	return letterPoints;
}

function runProgram() {
  selectedWord = initialPrompt();
   selectedAlgo = scorerPrompt();
   console.log("Score for '" + selectedWord + "' is " + selectedAlgo );
   
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScore: simpleScore,
   vowelBonusScore: vowelBonusScore,
   scrabbleScore: scrabbleScore,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};

