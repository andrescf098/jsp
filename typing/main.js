const $time = document.querySelector("time");
const $paragraph = document.querySelector("p");
const $input = document.querySelector("input");

const INITIAL_TIME = 30;

const TEXT =
  "the quick brown fox jumps over the lazy dog and cat is trying to clone type for fun and profit using vanilla js for the typing test speed";

let words = [];
let currentTime = INITIAL_TIME;

initTest();
initEvents();
function initTest() {
  words = TEXT.split(" ").slice(0, 32);
  currentTime = INITIAL_TIME;

  $time.textContent = currentTime;

  $paragraph.innerHTML = words
    .map((word, index) => {
      const letters = word.split("");
      return `<word>${letters.map((letter) => `<letter>${letter}</letter>`).join("")}</word>`;
    })
    .join("");

  const $firstWord = $paragraph.querySelector("word");
  $firstWord.classList.add("active");
  $firstWord.querySelector("letter").classList.add("active");

  const intervalId = setInterval(() => {
    currentTime--;
    $time.textContent = currentTime;
    if (currentTime === 0) {
      clearInterval(intervalId);
      gameOver();
    }
  }, 1000);
}
function initEvents() {
  document.addEventListener("keydown", () => {
    $input.focus();
  });
  $input.addEventListener("keydown", onKeyDown);
  $input.addEventListener("input", onKeyUp);
}

function onKeyDown(e) {}
function onKeyUp() {}

function gameOver() {
  console.log("game over");
}
