const question = document.getElementById("question");
const answer = document.getElementById("answer");

let ans = [];
let correctAns = 0;
let operators = ["+", "-", "*", "/"];
let equation = "";

function getRandomInterger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function generateQuestion() {
  equation = "";
  let operatorCount = getRandomInterger(1, 5);
  for (let i = 0; i < operatorCount + 1; i++) {
    equation += getRandomInterger(10, 1000);
    if (i < operatorCount) {
      equation += " ";
      equation += operators[getRandomInterger(0, 4)];
      equation += " ";
    }
  }
  question.innerHTML = `<span>${equation}</span>`;
  correctAns = Math.round(eval(equation));
}

function handleInputChange() {
  if (!ans.length) {
    answer.innerHTML = "?";
  } else {
    answer.innerHTML = ans.join("");
  }
}

function checkAnswer() {
  if (ans.join("") == correctAns) {
    generateQuestion();
    ans = [];
    answer.innerHTML = "?";
  }
}

function inputAnswer(input) {
  if (!isNaN(input) || input == "-") {
    ans.push(input);
  } else if (input == "Backspace") {
    ans.pop();
  }
  handleInputChange();
  checkAnswer();
}

window.addEventListener(
  "keydown",
  function (e) {
    inputAnswer(e.key);
  },
  false
);

generateQuestion();

// Virtual numpad
const buttons = document.querySelectorAll(".btn");
const backspace_btn = document.querySelector(".btn-backspace");

function virtualNumpad() {
  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      inputAnswer(btn.innerText);
    });
  });

  backspace_btn.addEventListener("click", () => {
    inputAnswer("Backspace");
  });
}

virtualNumpad();
