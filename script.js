const startGameBtn = document.querySelector(".btn-start");
const numberInput = document.querySelector(".input-number");

const min = 1;
const max = 10;
const tries = 3;
let attempt = 0;
let guessNumber = Math.floor(Math.random() * max) + min;

//* Reset Game
function resetGame() {
  console.log("Reset Game!");
}

//* Reset UI
function resetUI() {
  console.log("Reset UI!");
}

//* Update UI
function updateUI() {
  console.log("Update UI!");
}

console.log(guessNumber);

startGameBtn.addEventListener("click", function (event) {
  //! Prevent default button behaviour
  event.preventDefault();

  //? Empty input value
  if (!numberInput.value) {
    alert("Please try to guess!");
  } else {
    //? Guess correctly
    if (+numberInput.value === guessNumber) {
      resetUI();
    } else {
      //? Check if attempt is equal to the allowed tries
      if (attempt === tries) {
        resetGame();
      } else {
        //? Check if attempt is less than the allowed tries
        if (attempt <= tries) {
          attempt++;
          updateUI();
        }
      }
    }
  }
});
