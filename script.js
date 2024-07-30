function app() {
  //! Top Level Variables
  const btnStart = document.querySelector(".btn-start");
  const startSection = document.querySelector(".start-game-ui-section");
  const btnGuess = document.querySelector(".btn-guess");
  const btnRestart = document.querySelector(".btn-restart");
  const btnTryAgain = document.querySelector(".btn-try-again");
  const gameSection = document.querySelector(".main-game-ui-section");
  const gameWinSection = document.querySelector(".game-win-section");
  const gameControllerWrapper = document.querySelector(
    ".game-controller-wrapper"
  );
  const hiddenNumberDisplay = document.querySelector(".hidden-number");
  const showHiddenNumber = document.querySelector(".show-hidden-number-1");
  const revealHiddenNumber = document.querySelector(".reveal-number");
  const gameOverSection = document.querySelector(".game-over-section");
  const gameHeading = document.querySelector(".game-heading");
  const lifeImgs = document.querySelectorAll(".life-img");
  const lifeDisplayContainer = document.querySelector(".life-display");

  const tries = 4;
  let playerAttempt = 4;
  let guessMaxRange = 10;
  let guessMinRange = 1;
  let possibleGuessNumber = 0;
  let randomNumber;

  //! Generate Random number
  const generateRandomNumber = () => {
    return Math.floor(Math.random() * 10) + 1;
  };

  //! Update game ui display
  const updateGameUIDisplay = (msg) => {
    //* Update UI
    hiddenNumberDisplay.textContent = `${possibleGuessNumber}`;

    //* Prompt the user
    gameHeading.textContent = msg;
  };

  //! Generate life
  const generateLife = () => {
    //* Clear life container
    lifeDisplayContainer.innerHTML = " ";

    //* Iterate life imgs
    lifeImgs.forEach((life) => {
      //* Create life HTML
      const lifeHTMLTemplate = `<img class="life-img m-r-1" src="./assets/Life.svg" alt="life" />`;

      //* Insert to DOM
      lifeDisplayContainer.insertAdjacentHTML("afterbegin", lifeHTMLTemplate);
    });
  };

  //! Update Button text
  const updateBtnTextContent = () => {
    btnGuess.textContent = `No. ${possibleGuessNumber}`;
  };

  //! Rest Game function
  const resetUiToDefaultState = () => {
    //! Show game section
    gameSection.classList.remove("hide");

    //! Hide game win section
    gameWinSection.classList.add("hide");

    //! Generate new random number
    randomNumber = generateRandomNumber();

    //! Reset player attempt
    playerAttempt = 0;

    //! Rest user possible game number
    possibleGuessNumber = 0;

    //! Reset game heading
    gameHeading.textContent = "What is the hidden number?";

    //! Reset button text content
    btnGuess.textContent = `No. ?`;

    //! Reset hidden number display text
    hiddenNumberDisplay.textContent = "?";
  };

  /*
  ! APP EVENT LISTENER
*/

  //! Reveal Game main UI
  btnStart.addEventListener("click", (event) => {
    //! Hide menu section
    startSection.classList.add("hide");

    //! Show Game section
    gameSection.classList.remove("hide");

    //! Generate a random number
    randomNumber = generateRandomNumber();

    generateLife();
  });

  //! Listen to user input
  gameControllerWrapper.addEventListener("click", (event) => {
    event.preventDefault();

    //* Increase number
    if (event.target.classList.contains("icon-increase")) {
      //? Check the possible game number
      if (possibleGuessNumber < guessMaxRange) {
        //* Increment
        possibleGuessNumber++;

        //* Update button text
        updateBtnTextContent();
      } else {
        //* Reset possbile guess number
        possibleGuessNumber = guessMinRange;

        //* Update button text
        updateBtnTextContent();
      }
    }

    //* Decrease Number
    if (event.target.classList.contains("icon-decrease")) {
      //? Check the possible game number
      if (possibleGuessNumber > guessMinRange) {
        //* Decrement
        possibleGuessNumber--;

        //* Update button text
        updateBtnTextContent();
      } else {
        //* Reset possbile guess number
        possibleGuessNumber = guessMaxRange;

        //* Update button text
        updateBtnTextContent();
      }
    }

    //* Submit number
    if (event.target.classList.contains("btn-guess")) {
      if (btnGuess.textContent.includes("?")) {
        console.log("start guessing!");
      } else {
        //! guess number is greater than the random number
        if (possibleGuessNumber > randomNumber) {
          //* Decrement player attemtp
          playerAttempt--;

          //* Check if player reach the zero attempt
          if (playerAttempt === 0) {
            //* Show Game Over Section
            gameOverSection.classList.remove("hide");

            //* Hide Game main section
            gameSection.classList.add("hide");

            //* Reveal hidden number
            revealHiddenNumber.textContent = randomNumber;
          } else {
            //* Update UI
            updateGameUIDisplay("Lower Please!");
          }
        }

        //! guess number lower that the random number
        if (possibleGuessNumber < randomNumber) {
          //* Decrement player attemtp
          playerAttempt--;

          //* Check if player reach the zero attempt
          if (playerAttempt === 0) {
            //* Show Game Over Section
            gameOverSection.classList.remove("hide");

            //* Hide Game main section
            gameSection.classList.add("hide");

            //* Reveal hidden number
            revealHiddenNumber.textContent = randomNumber;
          } else {
            //* Update UI
            updateGameUIDisplay("Lower Please!");
          }
        }

        //! guess number is equal to the random number
        if (possibleGuessNumber === randomNumber) {
          //* Show game win section
          gameWinSection.classList.remove("hide");

          //* Hide Game main section
          gameSection.classList.add("hide");

          //* Show to hidden number
          showHiddenNumber.textContent = possibleGuessNumber;
        }
      }
    }
  });

  //! Restart game
  btnRestart.addEventListener("click", (e) => {
    e.preventDefault();
    //! Reset to default state
    resetUiToDefaultState();
  });

  //! Try again playing the game
  btnTryAgain.addEventListener("click", (e) => {
    e.preventDefault();

    gameOverSection.classList.add("hide");

    resetUiToDefaultState();
  });
}

app();
