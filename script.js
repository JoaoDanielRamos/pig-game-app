'use strict';

// Selecting Elements
const player0Element = document.querySelector('.player--0');
const player1Element = document.querySelector('.player--1');

const scorePlayer0Element = document.getElementById('score--0');
const scorePlayer1Element = document.getElementById('score--1');
const currentScorePlayer0Element = document.getElementById('current--0');
const currentScorePlayer1Element = document.getElementById('current--1');

const diceElement = document.querySelector('.dice');
const buttonNew = document.querySelector('.btn--new');
const buttonRoll = document.querySelector('.btn--roll');
const buttonHold = document.querySelector('.btn--hold');

// Switch player function
const switchPlayer = () => {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    currentScore = 0;
    player0Element.classList.toggle('player--active');
    player1Element.classList.toggle('player--active');
};

// Starting Conditions
scorePlayer0Element.textContent = 0;
scorePlayer1Element.textContent = 0;
diceElement.classList.add('hidden');

let scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;

//Rolling Dice Functionally
buttonRoll.addEventListener('click', function () {
    if (playing) {
        // 1. Generating a random dice roll
        let roll = Math.floor(Math.random() * 6) + 1;

        // 2. Display dice
        diceElement.classList.remove('hidden');
        diceElement.src = `dice-${roll}.png`;

        // 3. Checking for rolled 1
        if (roll !== 1) {
            // Add to current score
            currentScore += roll;
            document.getElementById(`current--${activePlayer}`).textContent =
                currentScore;
        } else {
            // Switch to next player
            switchPlayer();
        }
    }
});

// Hold Function
buttonHold.addEventListener('click', function () {
    if (playing) {
        // 1. Add current score to active players.
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent =
            scores[activePlayer];

        // 2. Check if player's score is >= 100;
        if (scores[activePlayer] >= 100) {
            playing = false;

            document
                .querySelector(`.player--${activePlayer}`)
                .classList.add('player--winner');
            document
                .querySelector(`.player--${activePlayer}`)
                .classList.remove('player--active');
            diceElement.classList.add('hidden');
        } else {
            switchPlayer();
        }
    }
});

// New Game Function
buttonNew.addEventListener('click', function () {
    // Reset
    playing = true;
    scores = [0, 0];
    currentScore = 0;
    document.getElementById('score--0').textContent = 0;
    document.getElementById('score--1').textContent = 0;
    document.getElementById('current--0').textContent = 0;
    document.getElementById('current--1').textContent = 0;
    document.querySelector('.player--0').classList.remove('player--winner');
    document.querySelector('.player--1').classList.remove('player--winner');
    diceElement.classList.add('hidden');

    // Every new game, a the starting players change.
    if (
        document
            .querySelector('.player--0')
            .classList.contains('player--winner') ||
        document
            .querySelector('.player--0')
            .classList.contains('player--active')
    ) {
        document.querySelector('.player--0').classList.remove('player--active');
        document.querySelector('.player--1').classList.add('player--active');
        activePlayer = 1;
    } else {
        document.querySelector('.player--0').classList.add('player--active');
        document.querySelector('.player--1').classList.remove('player--active');
        activePlayer = 0;
    }
});
