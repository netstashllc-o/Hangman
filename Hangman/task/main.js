'use strict';
const input = require('sync-input');
const wordList = ['python', 'java', 'swift', 'javascript'];
const maxAttempts = 8;
let wins = 0;
let losses = 0;

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
};

const playGame = () => {
    let answer = getRandomWord(wordList).toLowerCase();
    let guesses = answer.split('').fill('-', 0, answer.length);
    let answerMap = mapLettersInWord(answer);
    let misses = [];
    let attempts = maxAttempts;

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

    let lost = guesses.includes('-');
    console.log(lost ? 'You lost!\n' : `You guessed the word ${answer}!\nYou survived!\n`);
    wins += (lost) ? 0 : 1;
    losses += (lost) ? 1 : 0;
};

const showResults = () => {
    console.log(`You won: ${wins} times.
You lost: ${losses} times.\n`);
};

//Main function
(function () {
    let choice;
    let keepGoing = true;
    let m = 'Type "play" to play the game, "results" to show the scoreboard, and "exit" to quit: ';

    console.log(`H A N G M A N # ${maxAttempts} attempts\n`);

    do {
        choice = input(m);

        switch (choice) {
            case 'play':
                playGame();
                break;
            case 'results':
                showResults();
                break;
            case 'exit':
                keepGoing = false;
                break;
            default:
                console.log('Invalid option!\n');
                break;
        }
    } while (keepGoing);

    console.log('\nThank you for playing Hangman!!');
}());
