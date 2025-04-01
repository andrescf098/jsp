const $time = document.querySelector("time");
const $paragraph = document.querySelector("p");
let $input = document.querySelector("input");

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

function onKeyDown(e) {
  const $currentWord = $paragraph.querySelector("word.active");
  const $currentLetter = $currentWord.querySelector("letter.active");

  const currentWord = $currentWord.innerText.trim();
  $input.maxLength = currentWord.length;
  console.log({ value: $input.value, currentWord });

  const $allLetters = $currentWord.querySelectorAll("letter");

  $allLetters.forEach(($letter) =>
    $letter.classList.remove("correct", "incorrect"),
  );

  $input.value.split("").forEach((char, index) => {
    const $letter = $allLetters[index];
    const letterToCheck = currentWord[index];

    const isCorrect = char === letterToCheck;
    const letterClass = isCorrect ? "correct" : "incorrect";
    $letter.classList.add(letterClass);
  });
  $currentLetter.classList.remove("active", "is-last");
  const inputLength = $input.value.length;
  const nextActiveLetter = $allLetters[inputLength];
  if (nextActiveLetter) {
    $allLetters[inputLength].classList.add("active");
  } else {
    $currentLetter.classList.add("active", "is-last");
  }
}
function onKeyUp() {}

function gameOver() {
  console.log("game over");
}
