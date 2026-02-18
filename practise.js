const colors = ["Red", "Blue", "Yellow", "Green", "Black"];
let currentColor = "";

let total = 0;
let correct = 0;

function nextStimulus() {
  let word = colors[Math.floor(Math.random() * colors.length)];
  let color = colors[Math.floor(Math.random() * colors.length)];

  let stim = document.getElementById("stimulus");
  stim.textContent = word.toUpperCase();
  stim.style.color = color.toLowerCase();

  currentColor = color;
}

function answer(choice) {
  total++;

  if (choice === currentColor) {
    correct++;
  }


  document.getElementById("total").textContent = total;
  document.getElementById("correct").textContent = correct;

  nextStimulus();
}

window.onload = function () {
  localStorage.setItem("practiceDone", "Y");
  nextStimulus();
};
