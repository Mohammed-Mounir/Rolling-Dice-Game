'use strict';

// Selecting elements
let score0El = document.getElementById('score--0');
let score1El = document.getElementById('score--1');
let player0El = document.querySelector('.player--0');
let player1El = document.querySelector('.player--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// Initial Conditions
let activePlayerNum, currentScore, playing, playersScore;

const init = function () {
  playing = true;
  activePlayerNum = 0;
  currentScore = 0;
  playersScore = [0, 0];

  diceEl.classList.add('hidden');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');

  current0El.textContent = 0;
  current1El.textContent = 0;
  score0El.textContent = 0;
  score1El.textContent = 0;
};

init();

// Switching player functionality
const switchPlayer = function () {
  currentScore = 0;
  document.getElementById(`current--${activePlayerNum}`).textContent = 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
  activePlayerNum = activePlayerNum === 0 ? 1 : 0;
};

// Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;

    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayerNum}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

// Saving player score functionality
btnHold.addEventListener('click', function () {
  if (playing) {
    playersScore[activePlayerNum] += currentScore;
    document.getElementById(`score--${activePlayerNum}`).textContent =
      playersScore[activePlayerNum];

    if (playersScore[activePlayerNum] >= 20) {
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayerNum}`)
        .classList.add('player--winner');
    } else {
      switchPlayer();
    }
  }
});

// New game functionality
btnNew.addEventListener('click', init);
