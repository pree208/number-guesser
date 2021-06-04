/*
GAME FUNCTION:
- Player must guess a number between a min and max
- Player gets a certain amount of guesses
- Notify player of guesses remaining
- Notify the player of the correct answer if loose
- Let player choose to play again
*/

//game values

let min = 1,
  max = 10,
  winNumber = getRandomNum(min, max),
  guessesLeft = 3;

//UI ELEMENTS
const game = document.querySelector('#game'),
  minNum = document.querySelector('.min-num'),
  maxNum = document.querySelector('.max-num'),
  guessBtn = document.querySelector('#guess-btn'),
  guessInput = document.querySelector('#guess-input'),
  message = document.querySelector('.message');

//assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

//play again event listener
game.addEventListener('mousedown', function (e) {
  if (e.target.className === 'play-again') {
    window.location.reload();
  }
})
//listen for guess
guessBtn.addEventListener('click', function () {
  let guess = parseInt(guessInput.value);
  console.log(guess);
  //validate 
  if (isNaN(guess) || guess < min || guess > max) {
    setMessage(`please enter number between ${min} and ${10}`, 'red');
  }

  if (guess === winNumber) {
    // //disable input
    // guessInput.disabled = true;
    // //change border color
    // guessInput.style.borderColor = 'green';
    // //set message
    // setMessage(`${winNumber} is correct, You won! `, 'green');
    gameOver(true, `${winNumber} is correct, You won! `);
  } else {
    //wrong number
    guessesLeft -= 1;

    if (guessesLeft === 0) {
      //game over-lost
      // //disable input
      // guessInput.disabled = true;
      // //set border color
      // guessInput.style.borderColor = 'red';
      // //message
      // setMessage(`Game over.You lost.The correct number is ${winNumber}`, 'red');
      gameOver(false, `Game over.You lost.The correct number is ${winNumber}`);
    } else {
      //game continues answer wrong

      //input color
      guessInput.style.borderColor = 'red';
      //clear input
      guessInput.value = '';
      //set message
      setMessage(`${guess} is not correct,${guessesLeft} guesses left`, 'red');

    }
  }
});
//game over
function gameOver(won, msg) {
  let color;
  won === true ? color = 'green' : color = 'red';
  //disable input
  guessInput.disabled = true;
  //change border color
  guessInput.style.borderColor = 'color';
  //set text color
  message.style.color = color;
  //set message
  setMessage(msg);

  //play again
  guessBtn.value = 'Play Again';
  guessBtn.className += 'play-again';//append child
}
//getWinningNum

function getRandomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

//set message

function setMessage(msg, color) {
  message.style.color = color;
  message.textContent = msg;
}