const root = document.documentElement;
const rules = document.getElementById("rules");
const startBtn = document.getElementById("start-btn");
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
};

let hintCount = 0;
let typeHint;
let lowerHint;
let higherHint;
const checkpoints = [5, 10, 15, 20, 30, 40, 45, 50, 60, 70, 80, 85, 90, 100];

//generate hint
const getHint = () => {
  hintCount++;
  let type = randomNumber % 2 === 0 ? "even" : "odd";
  typeHint = "Hint: it is an " + type + " number";

  let lowerHintNo = checkpoints.find((checkpoint) => randomNumber < checkpoint);
  lowerHint = "Hint: the number is less than " + lowerHintNo;

  let higherHintNo = checkpoints.findLast((checkpoint) => randomNumber > checkpoint);
  higherHint = "Hint: the number is higher than " + higherHintNo;
};

//start game
const startGame = () => {
  rules.classList.add("animate");
  getRandomNo();
  getHint();
  hint.textContent = typeHint;
};

startBtn.onclick = startGame;

//process player's guess
const validateGuess = () => {
  const guessNumber = parseInt(input.value);
  getHint();
  if (guessNumber < randomNumber) {
    //too low
    heading.textContent = "Too low.";
    hint.textContent = hintCount <= 2 ? higherHint : "";
    input.value = "";
    lives--;
    setLives();
  } else if (guessNumber > randomNumber) {
    //too high
    heading.textContent = "Too high.";
    hint.textContent = hintCount <= 2 ? lowerHint : "";
    input.value = "";
    lives--;
    setLives();
  } else {
    //correct
    heading.textContent = "Yes! " + guessNumber + " is correct!";
    heading.style.color = "green";
    hint.textContent = "";
    root.style.setProperty("--z-index", "-1");
    input.value = "";
    input.setAttribute("readonly", "true");
    score = score + 10;
    scoreSpan.textContent = score;
    highScore = highScore + score;
    highScoreSpan.textContent = highScore;
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
  heading.style.color = "black";
  hintCount = 0;
  root.style.setProperty("--z-index", "0");
  input.removeAttribute("readonly");
  guessBtn.innerHTML = "Guess";
  guessBtn.style.backgroundColor = "#0b43aa";
  getRandomNo();
  getHint();
  hint.textContent = typeHint;
};

//game over, end the game
const endGame = () => {
  heading.textContent = "Game Over";
  heading.style.color = "#df1a1a";
  heading.style.backgroundColor = "black";
  hint.textContent = "";
  root.style.setProperty("--z-index", "-1");
  input.setAttribute("readonly", "true");
  guessBtn.style.backgroundColor = "gray";
  guessBtn.style.color = "black";
};

endBtn.onclick = endGame;

//set new game after game over
const newGame = () => {
  heading.style.backgroundColor = "transparent";
  guessBtn.style.color = "white";
  score = 0;
  scoreSpan.textContent = score;
  lives = 3;
  setLives();
  resetGame();
};

newBtn.onclick = newGame;
