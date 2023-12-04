const wordEl = document.getElementById("word");
const wrongLettersEl = document.getElementById("wrong-letters");
const playAgainBtn = document.getElementById("play-button");
const popup = document.getElementById("popup-container");
const notifcation = document.getElementById("notification-container");
const finalMessage = document.getElementById("final-message");

const figureParts = document.querySelectorAll(".figure-part");

const words = ["application", "programming", "interface", "wizard"];

let selectedWord = words[Math.floor(Math.random() * words.length)];

const correctLetters = []; //that will hold the input value from the user
const wrongLetters = [];

//show the hidden word
function displayWord() {
  wordEl.innerHTML = `
      ${selectedWord

        .split("") //spliting a word to an array of letters
        .map(
          (letter) => `
        <span class='letter'>
        ${correctLetters.includes(letter) ? letter : ""}
        </span>
        `
        )
        .join("")}`;

  const innerWord = wordEl.innerText.replace(/\n/g, "");
  if (innerWord === selectedWord) {
    finalMessage.innerText = "Congratulations! You Won! 😁";
    popup.style.display = "flex";
  }
}

//Update the wrong letters
function updateWrongLettersEl() {
  //Display wrong letters
  wrongLettersEl.innerHTML = `
  ${wrongLetters.length > 0 ? `<p>Wrong</p>` : ""}
  ${wrongLetters.map((letter) => `<span>${letter}</span>`)}
  `;

  //Display parts/hangman
  figureParts.forEach((part, index) => {
    const errors = wrongLetters.length;
    if (index < errors) {
      part.style.display = "block";
    } else {
      part.style.display = "none";
    }
  });
  //Check if lost
  if (wrongLetters.length === figureParts.length) {
    finalMessage.innerText = "Unfortunatelly, you have lost 🥹";
    popup.style.display = "flex";
  }
}

//Show notification
function showNotification() {
  notifcation.classList.add("show");

  setTimeout(() => {
    notifcation.classList.remove("show");
  }, 2000);
}

//Keydown letter press
window.addEventListener("keydown", (e) => {
  if (e.code >= "KeyA" && e.code <= "KeyZ") {
    const letter = e.code.substring(3).toLowerCase();

    if (selectedWord.includes(letter)) {
      if (!correctLetters.includes(letter)) {
        correctLetters.push(letter);
        displayWord();
      } else {
        showNotification();
      }
    } else {
      if (!wrongLetters.includes(letter)) {
        wrongLetters.push(letter);
        updateWrongLettersEl();
      } else {
        showNotification();
      }
    }
  }
});
//Restart game and play again
playAgainBtn.addEventListener("click", () => {
  //empty the arrays
  correctLetters.splice(0);
  wrongLetters.splice(0);

  //set a new word and display
  selectedWord = words[Math.floor(Math.random() * words.length)];

  displayWord();

  //get rid of the hangman and the popup message
  updateWrongLettersEl();

  popup.style.display = "none";
});

displayWord();
