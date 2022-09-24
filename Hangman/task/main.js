'use strict';
const input = require('sync-input')
const wordList = ['python', 'java', 'swift', 'javascript'];
const getRandomWord = (words) => words[Math.floor(Math.random() * words.length)];
const mapLettersInWord = (word) => {
    let charsInWord = new Map();
    for (let i = 0; i < word.length; i++) {
        let ch = word.charAt(i);
        if (charsInWord.has(ch)) {
            charsInWord.get(ch).push(i);
        } else {
            charsInWord.set(ch, [i]);
        }
    }
    return charsInWord;
}
let attempts = 8;

console.log(`H A N G M A N # ${attempts} attempts\n`);
let answer = getRandomWord(wordList).toLowerCase();
let guesses = answer.split('').fill('-', 0, answer.length);
let answerMap = mapLettersInWord(answer);
let misses = [];

while (attempts > 0 && guesses.includes('-')) {
    console.log(guesses.join(''));
    let guess = input(`Input a letter: `);

    if (!guess || guess.length > 1) {
        console.log('Please, input a single letter.\n');
        continue;
    }

    if (guess < 'a' || guess > 'z') {
        console.log('Please, enter a lowercase letter from the English alphabet.\n');
        continue;
    }

    if (guesses.includes(guess) || misses.includes(guess)) {
        console.log(`You've already guessed this letter.\n`);
        continue;
    }

    if (!answerMap.has(guess)) {
        attempts--;
        console.log(`That letter doesn't appear in the word. # ${attempts} attempts\n`);
        misses.push(guess);
        continue;
    }

    for (let i of answerMap.get(guess)) {
        guesses[i] = guess;
    }

    console.log();
}

console.log(
    guesses.includes('-')
        ? 'You lost!'
        : `You guessed the word ${answer}!\nYou survived!`
);
