const startBtn = document.getElementById("start-btn");
const homeSection = document.getElementById("home");
const quizSection = document.getElementById("quiz");
const resultSection = document.getElementById("result");

const questions = [
  "When you're completely stuck, you tend to...",
  "In your ideal world, people would...",
  "Which emotion is the hardest for you to control?",
  "When you're deeply down, what you truly need is...",
  "If you could choose a vibe to live in, you'd go for...",
  "What do people often say about you (that annoys you)?",
  "When a friend is hurting, you usually...",
  "If you could upgrade yourself, you'd become more...",
  "When you're misunderstood, you tend to...",
  "You feel most at peace when you can...",
  "You're most vulnerable when you...",
  "As a Spirit Veggie, you wish you could...",
  "You feel most like yourself when you...",
  "You can’t stand people who...",
  "When things go wrong, you usually...",
  "The friend you need isn’t loud, but someone who can..."
];

const options = [/*... (same as yours, keep as is) */];
const spiritMap = [/*... (same as yours, keep as is) */];
const spiritScores = { Kroot: 0, Banion: 0, Potatoad: 0, Mubii: 0, Onyun: 0, Bitty: 0, Gingeer: 0 };
const spiritProfiles = { /*... (same as yours, keep as is) */ };

let currentQ = 0;
let selected = [];

startBtn.onclick = () => {
  homeSection.style.display = "none";
  quizSection.style.display = "block";
  renderQuestion();
};

function renderQuestion() {
  quizSection.innerHTML = `
    <div class="question-box">
      <h2 id="questionText">${questions[currentQ]}</h2>
      <div class="options" id="answersContainer"></div>
      <div class="navigation">
        <button id="backBtn">Back</button>
        <span id="questionCounter">Question ${currentQ + 1} of ${questions.length}</span>
        <button id="nextBtn">Next</button>
      </div>
    </div>
  `;

  const optDiv = document.getElementById("answersContainer");
  options[currentQ].forEach((opt, i) => {
    const btn = document.createElement("button");
    btn.innerText = opt;
    btn.classList.add("button-55");
    if (selected[currentQ] === i) {
      btn.style.backgroundColor = "#cceabb"; // highlight selected
    }
    btn.onclick = () => {
      selected[currentQ] = i;
      renderQuestion();
    };
    optDiv.appendChild(btn);
  });

  // Button events
  document.getElementById("backBtn").onclick = () => {
    if (currentQ > 0) {
      currentQ--;
      renderQuestion();
    }
  };
  document.getElementById("nextBtn").onclick = () => {
    if (selected[currentQ] === undefined) return alert("Please select an option first!");
    if (currentQ < questions.length - 1) {
      currentQ++;
      renderQuestion();
    } else {
      calculateResult();
    }
  };

  // Disable Back / Next if needed
  document.getElementById("backBtn").disabled = currentQ === 0;
  document.getElementById("nextBtn").innerText = currentQ === questions.length - 1 ? "See Result" : "Next";
}

function calculateResult() {
  Object.keys(spiritScores).forEach(k => spiritScores[k] = 0); // Reset scores

  selected.forEach((choiceIndex, questionIndex) => {
    const spirit = spiritMap[questionIndex][choiceIndex];
    spiritScores[spirit]++;
  });

  const topSpirit = Object.entries(spiritScores).sort((a, b) => b[1] - a[1])[0][0];
  showResult(topSpirit);
}

function showResult(spiritKey) {
  const spirit = spiritProfiles[spiritKey];
  const friendImg = spiritProfiles[spirit.friend]?.img;
  const enemyImg = spirit.enemy ? spiritProfiles[spirit.enemy]?.img : null;

  quizSection.style.display = "none";
  resultSection.style.display = "block";
  resultSection.innerHTML = `
    <h2>Your Spirit Veggie is: ${spirit.name}</h2>
    <img src="${spirit.img}" alt="${spirit.name}" />
    <p><strong>Personality:</strong> ${spirit.personality}</p>
    <p><strong>Ability:</strong> ${spirit.ability}</p>
    <h3>Spirit Friend:</h3>
    <img src="${friendImg}" alt="${spirit.friend}" />
    <h3>Enemy Spirit:</h3>
    ${enemyImg ? `<img src="${enemyImg}" alt="${spirit.enemy}" />` : `<p>No known enemies</p>`}
  `;
}
