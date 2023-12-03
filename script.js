const wordEl = document.getElementById("word");
const wrongLettersEl = document.getElementById("wrong-letters");
const playAgainBtn = document.getElementById("play-again");
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
displayWord();
