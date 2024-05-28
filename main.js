// Letters
const letters = "abcdefghijklmnopqrstuvwxyz";

// Array From Letters
let lettersArray = Array.from(letters);

// Select letter container
let letterContainer = document.querySelector(".letters");

// Generate Letters
lettersArray.forEach((letter) => {
  //create span
  let span = document.createElement("span");

  //create Letter Text Node
  let theLetter = document.createTextNode(letter);

  // append the letter to span
  span.appendChild(theLetter);

  // Add Class On Span
  span.className = "letter-box";

  // Append span to the letter container
  letterContainer.appendChild(span);
});

// Object of words + Categories

const words = {
  programming: [
    "php",
    "javascript",
    "go",
    "scala",
    "fortran",
    "r",
    "mysql",
    "python",
  ],
  movies: [
    "Prestige",
    "Inception",
    "Parasite",
    "Interstellar",
    "Whiplash",
    "Memento",
    "Coco",
    "Up",
  ],
  people: [
    "Albert Einstein",
    "Hitchcock",
    "Alexander",
    "Cleopatra",
    "Mahatma Ghandi",
    "Rashad",
  ],
  countries: ["Syria", "Palestine", "Yemen", "Egypt", "Bahrain", "Qatar"],
};

// Get Random Property

let allKeys = Object.keys(words);
// Random Num Depend On Keys Length
let randomPropNumber = Math.floor(Math.random() * allKeys.length);
//Category
let randomPropName = allKeys[randomPropNumber];
//category words
let randomPropValue = words[randomPropName];
// Random Num Depend On words
let randomValueNumber = Math.floor(Math.random() * randomPropValue.length);
//The Chosen Word
let randomValueValue = randomPropValue[randomValueNumber];

//set category Info
document.querySelector(".game-info .category span").innerHTML = randomPropName;

// select Letters Guess Element
let lettersGuessContaienr = document.querySelector(".letters-guess");

// Convert Chosen word to array
let lettersAndSpace = Array.from(randomValueValue);

// Create Spans Depend On Word
lettersAndSpace.forEach((letter) => {
  //Create Empty Span
  let span = document.createElement("span");
  // if letter is space
  if (letter === " ") {
    // add class To span
    span.className = "with-space";
  }
  // Append Span To The Letters Guess

  lettersGuessContaienr.appendChild(span);
});

// Select Guess Spans
let guessSpans = document.querySelectorAll(".letters-guess span");

let wrongAttempts = 0;

let trueAttempts = 0;

let theDraw = document.querySelector(".hangman-draw");

// Handle Clicking On Letters
document.addEventListener("click", (e) => {
  // Set Guess Spans
  let theStatus = false;
  if (e.target.className === "letter-box") {
    e.target.classList.add("clicked");
    // Get Clicked Letter
    let theClickedLetter = e.target.innerHTML.toLowerCase();
    // the Chosen Word
    let theChosenWord = Array.from(randomValueValue.toLowerCase());
    // console.log(lettersAndSpace);
    theChosenWord.forEach((wordLetter, wordIndex) => {
      // if the clicked letter equal to one of the chosen word letter
      if (theClickedLetter == wordLetter) {
        theStatus = true;
        trueAttempts++;

        // Loop On All Guess Spans
        guessSpans.forEach((span, spanIndex) => {
          if (wordIndex === spanIndex) {
            span.innerHTML = theClickedLetter;
          }
        });
      }
    });
    // OutSide Loop

    // If Letter is wrong
    if (theStatus !== true) {
      // Increase The wrong Attempts
      wrongAttempts++;

      // Add Class wrong on the draw attempts
      theDraw.classList.add(`wrong-${wrongAttempts}`);

      // Play Fail Sound
      document.getElementById("error").play();
      if (wrongAttempts === 8) {
        endGame();
        letterContainer.classList.add("finished");
      }
    } else {
      // play success sound
      document.getElementById("yay").play();
    }

    if (trueAttempts === randomValueValue.length) {
      letterContainer.classList.add("finished");
      endGameSuccess();
    }
  }
});

// End game func
function endGame() {
  // Create Popup div
  let div = document.createElement("div");
  // create text
  let divText = document.createTextNode(
    `Game Over, The Word Is ${randomValueValue.toUpperCase()}`
  );

  // Apppend Text To div
  div.appendChild(divText);

  // Add Class On Div
  div.className = "popup";

  // apppend to the budy
  document.body.appendChild(div);
}

function endGameSuccess() {
  let div = document.createElement("div");
  let divText = document.createTextNode(`YouWin,Congratulation`);
  div.appendChild(divText);
  div.className = "popup-win";
  document.body.appendChild(div);
}
