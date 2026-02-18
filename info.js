let gameStarted = false;

function startCountdown() {
  const stim = document.getElementById("stimulus");
  stim.textContent = "";
  stim.style.color = "black";

  let sequence = ["Get ready...", "3", "2", "1", "GO"];
  let index = 0;

  const countdownInterval = setInterval(() => {
    stim.textContent = sequence[index];
    index++;

    if (index === sequence.length) {

      clearInterval(countdownInterval);
      gameStarted = true;
      startGame();
    }
  }, 1000);
}

function answer(choice) {
  if (!gameStarted) return;

  let rt = Date.now() - reactionStart;

  total++;
  reactionTimes.push(rt);

  if (choice === currentColor) {
    correct++;
  }

  document.getElementById("score").textContent = total;

  nextStimulus();
}

let currentColor = "";

const colors = ["Red", "Blue", "Yellow", "Green", "Black"];

let timeLeft = 60000; // ms
let timer;
let startTime;
let reactionStart;

let total = 0;
let correct = 0;
let reactionTimes = [];

function startGame() {
  nextStimulus();
  startTime = Date.now();
  reactionStart = Date.now();

  timer = setInterval(() => {
    let elapsed = Date.now() - startTime;
    let remaining = timeLeft - elapsed;

    document.getElementById("timer").textContent = 
      (remaining / 1000).toFixed(3);

    if (remaining <= 0) {
      clearInterval(timer);
      endGame();
    }
  }, 10);
}

function nextStimulus() {
 let word = colors[Math.floor(Math.random() * colors.length)];
 let color = colors[Math.floor(Math.random() * colors.length)];

 let stim = document.getElementById("stimulus");
 stim.textContent = word.toUpperCase();
 stim.style.color = color.toLowerCase();

 currentColor = color;

 reactionStart = Date.now();
}

function answer(choice) {
 let rt = Date.now() - reactionStart;

 total++;
 reactionTimes.push(rt);

 if (choice === currentColor) {
   correct++;
 }

 document.getElementById("score").textContent = total;

 nextStimulus();
}


function endGame() {
  let avgRT = reactionTimes.reduce((a,b)=>a+b,0) / reactionTimes.length;
  let rate = total / 60;

  document.getElementById("stimulus").style.display = "none";
  document.querySelector("div").style.display = "none";

  document.getElementById("results").style.display = "block";
  document.getElementById("results").innerHTML = `
    <h2>Results</h2>
    <p>Total answers: ${total}</p>
    <p>Correct answers: ${correct}</p>
    <p>Accuracy: ${(correct/total*100).toFixed(1)}%</p>
    <p>Average reaction time: ${avgRT.toFixed(1)} ms</p>
    <p>Question rate: ${rate.toFixed(2)} per second</p>
  `;

  const participantID = localStorage.getItem("participantID");

  const resultsData = new FormData();

  resultsData.append("participantID", participantID);
  resultsData.append("total", total);
  resultsData.append("correct", correct);
  resultsData.append("accuracy", (correct/total*100).toFixed(1));
  resultsData.append("avgRT", avgRT.toFixed(1));
  resultsData.append("rate", rate.toFixed(2));

  fetch(
    "https://script.google.com/macros/s/AKfycbxGItNSxbi7sEixhi0BfltUnl4EK3mQDX1nmmlo3LmykY65W422FJVkfDefz1ZZ5rA3/exec", {
      method: "POST",
      body: resultsData
    }
  );
}

window.onload = startCountdown;
