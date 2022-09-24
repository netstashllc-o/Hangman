const input = require('sync-input')
const wordList = ['python', 'java', 'swift', 'javascript'];
const getRandomWord = (words) => words[Math.floor(Math.random() * words.length)];

console.log("H A N G M A N");
let answer = getRandomWord(wordList);
let letters = answer.split('').fill('-',3,answer.length);
let guess = input(`Guess the word ${letters.join('')}: `);
let result = (guess === answer) ? "You survived!" : "You lost!";
console.log(result);
