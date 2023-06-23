'use strict';

//Selecting elements
const player0Element = document.querySelector('.player--0');
const player1Element = document.querySelector('.player--1');

const score0Element = document.querySelector('#score--0');
const score1Element = document.getElementById('score--1');
const diceElement = document.querySelector('.dice');
const currentScore0Elem = document.querySelector('#current--0');
const currentScore1Elem = document.querySelector('#current--1');

const btnRollDice = document.querySelector('.btn--roll');
const btnNewGame = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');

let currentScore, activePlayer, playing, scores;

//Starting conditions
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0Element.textContent = 0;
  score1Element.textContent = 0;
  currentScore0Elem.textContent = 0;
  currentScore1Elem.textContent = 0;

  diceElement.classList.add('hidden');
  player0Element.classList.remove('player--winner');
  player1Element.classList.remove('player--winner');
  player1Element.classList.remove('player--winner');
  player0Element.classList.add('player--active');
};
init();

const changePlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0Element.classList.toggle('player--active');
  player1Element.classList.toggle('player--active');
};

// Rolling dice functionality
btnRollDice.addEventListener('click', function () {
  if (playing) {
    //1.Generating random dice
    const dice = Math.trunc(Math.random() * 6) + 1;

    //2.Display dice
    diceElement.classList.remove('hidden');
    diceElement.src = `dice-${dice}.png`;

    //3.Check if "1" is rolled:
    if (dice !== 1) {
      //if not, add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //if true, switch to next player
      changePlayer();
    }
  }
});

//adding hold button functionality
btnHold.addEventListener('click', function () {
  if (playing) {
    //1. add current score to active player's score and display it
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //check if player's score is >=100
    if (scores[activePlayer] >= 100) {
      //if true, finish game
      playing = false;
      diceElement.classList.add('hidden');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      //if not switch to the next player
      changePlayer();
    }
  }
});
//adding new game button functionality
btnNewGame.addEventListener('click', init);
