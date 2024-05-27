const root = document.documentElement;
const input = document.getElementById("guess-input");
const guessBtn = document.getElementById("guess-btn");
const randomNumberElem = document.getElementById("number");
const heading = document.getElementById("heading-text");
const livesSpan = document.getElementById("lives-span");
const scoreSpan = document.getElementById("score-span");
const highScoreSpan = document.getElementById("high-score-span");
const hint = document.getElementById("hint");
const endBtn = document.getElementById("end-btn");
const newBtn = document.getElementById("new-btn");

let randomNumber;
let lives = 3;
let score = 0;
let highScore = 0;

//generate random number
const getRandomNo = () => {
  randomNumber = Math.floor(Math.random() * 99) + 1;
  randomNumberElem.textContent = randomNumber;
  //console.log(randomNumber);
};

//initial random number
getRandomNo();

//generate hint
const checkpoints = [5, 10, 15, 20, 30, 40, 45, 50, 60, 70, 80, 85, 90, 100];
let lowerHint;
let higherHint;

const getHint = () => {
  let lowerHintNo = checkpoints.find((checkpoint) => randomNumber < checkpoint);
  lowerHint = "Hint: the number is below " + lowerHintNo;

  let higherHintNo = checkpoints.findLast((checkpoint) => randomNumber > checkpoint);
  higherHint = "Hint: the number is above " + higherHintNo;
};

//process player's guess
const validateGuess = () => {
  const guessNumber = parseInt(input.value);
  getHint();

  if (guessNumber < randomNumber) {
    //console.log("too low");
    heading.textContent = "too low, try again";
    hint.textContent = higherHint;
    input.value = "";
    lives--;
    setLives();
  } else if (guessNumber > randomNumber) {
    //console.log("too high");
    heading.textContent = "too high, try again";
    hint.textContent = lowerHint;
    input.value = "";
    lives--;
    setLives();
  } else {
    //console.log("Correct!");
    heading.textContent = "Yes! " + guessNumber + " is correct!";
    hint.textContent = "";
    root.style.setProperty("--z-index", "-1");
    input.value = "";
    input.setAttribute("readonly", "true");
    score = score + 10;
    scoreSpan.textContent = score;
    guessBtn.innerHTML = "Play again!";
    guessBtn.style.backgroundColor = "green";
  }
};

//set lives
const setLives = () => {
  switch (lives) {
    case 3:
      livesSpan.textContent = "❤️❤️❤️";
      break;
    case 2:
      livesSpan.textContent = "❤️❤️";
      break;
    case 1:
      livesSpan.textContent = "❤️";
      break;
    case 0:
      livesSpan.textContent = "";
      endGame();
      break;
    default:
      console.log("less than zero");
      break;
  }
};

//Guess button click event
input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    guessBtn.click();
  }
});

guessBtn.onclick = () => {
  if (guessBtn.innerHTML === "Guess") {
    input.value && randomNumber ? validateGuess() : null;
  } else {
    resetGame();
  }
};

//reset game after a win
const resetGame = () => {
  heading.textContent = "Guess the hidden number";
  root.style.setProperty("--z-index", "0");
  input.removeAttribute("readonly");
  guessBtn.innerHTML = "Guess";
  guessBtn.style.backgroundColor = "#0b43aa";
  getRandomNo();
  getHint();
  hint.innerHTML = higherHint;
};

//game over, end the game
const endGame = () => {
  heading.textContent = "Game Over";
  hint.textContent = "";
  heading.style.color = "#df1a1a";
  heading.style.backgroundColor = "black";
  root.style.setProperty("--z-index", "-1");
  highScore = highScore + score;
  highScoreSpan.textContent = highScore;
  input.setAttribute("readonly", "true");
  guessBtn.style.backgroundColor = "gray";
  guessBtn.style.color = "black";
};

endBtn.onclick = endGame;

//set new game after game over
const newGame = () => {
  heading.style.color = "black";
  heading.style.backgroundColor = "transparent";
  guessBtn.style.color = "white";
  score = 0;
  scoreSpan.textContent = score;
  lives = 3;
  setLives();
  resetGame();
};

newBtn.onclick = newGame;
