const startBtn = document.getElementById("start-btn");
const homeSection = document.getElementById("home");
const quizSection = document.getElementById("quiz");
const resultSection = document.getElementById("result");

const questions = [
  "When you're overwhelmed, you tend to...",
  "You wish others would...",
  "Which emotion is hardest to manage?",
  "When things get heavy, you need...",
  "You prefer to...",
  "People think you're...",
  "When a friend is down, you tend to...",
  "You wish you could be more...",
  "When no one gets you, you...",
  "You're most comfortable when...",
  "You often...",
  "If you were a spirit veggie, you would want to...",
  "You feel strongest when...",
  "You dislike people who are...",
  "When you fail, you usually...",
  "You need a friend who can..."
];

const options = [
  ["Withdraw", "Explode", "Cry", "Joke it off"],
  ["Listen to you", "Leave you alone", "Get excited with you", "Just follow you"],
  ["Anger", "Sadness", "Fear", "Apathy"],
  ["A hug", "Encouragement", "Protection", "To be heard"],
  ["Be alone", "Deep talk", "Cuddle time", "Run to nature"],
  ["Stubborn", "Cold", "Too sensitive", "Calm"],
  ["Make jokes", "Listen", "Invite to play", "Give advice"],
  ["Disciplined", "Optimistic", "Relaxed", "Open"],
  ["Make jokes", "Cry quietly", "Run away", "Write diary"],
  ["Not pressured", "Appreciated", "Able to protect others", "In control"],
  ["Overthink", "Get swayed emotionally", "Be a perfectionist", "Love too much"],
  ["Be a healer", "Ghost-proof", "Cheerful & fun", "Wise & warm"],
  ["Get rest", "Have a mission", "Make others laugh", "Think clearly"],
  ["Too dramatic", "Too careless", "Too idealistic", "Lost with no purpose"],
  ["Don’t care", "Overfeel", "Search for meaning", "Need encouragement"],
  ["Be honest", "Make you laugh", "Hug you", "Protect you"]
];

const spiritMap = [
  ["Mubii", "Onyun", "Banion", "Kroot"],
  ["Banion", "Mubii", "Bitty", "Jinger"],
  ["Onyun", "Banion", "Bitty", "Potatoad"],
  ["Banion", "Jinger", "Onyun", "Kroot"],
  ["Mubii", "Banion", "Potatoad", "Jinger"],
  ["Onyun", "Kroot", "Banion", "Mubii"],
  ["Kroot", "Banion", "Bitty", "Jinger"],
  ["Jinger", "Bitty", "Potatoad", "Mubii"],
  ["Kroot", "Banion", "Jinger", "Mubii"],
  ["Potatoad", "Bitty", "Onyun", "Jinger"],
  ["Mubii", "Banion", "Jinger", "Onyun"],
  ["Banion", "Onyun", "Bitty", "Jinger"],
  ["Potatoad", "Onyun", "Kroot", "Jinger"],
  ["Onyun", "Banion", "Jinger", "Bitty"],
  ["Kroot", "Banion", "Jinger", "Bitty"],
  ["Jinger", "Kroot", "Banion", "Onyun"]
];

const spiritScores = {
  Kroot: 0,
  Banion: 0,
  Potatoad: 0,
  Mubii: 0,
  Onyun: 0,
  Bitty: 0,
  Jinger: 0
};

const spiritProfiles = {
  Kroot: {
    name: "Kroot",
    img: "images/kroot.png",
    ability: "Helps you feel heard and safe.",
    personality: "Sarcastic but secretly soft-hearted.",
    friend: "Bitty",
    enemy: null
  },
  Banion: {
    name: "Banion",
    img: "images/banion.png",
    ability: "Helps you release pent-up emotions.",
    personality: "Emotional, warm, intuitive.",
    friend: "Mubii",
    enemy: "Onyun"
  },
  Potatoad: {
    name: "Potatoad",
    img: "images/potatoad.png",
    ability: "Teaches you that rest is valid.",
    personality: "Chill, adorable, sleepy.",
    friend: "Onyun",
    enemy: null
  },
  Mubii: {
    name: "Mubii",
    img: "images/mubii.png",
    ability: "Repels toxic vibes.",
    personality: "Quiet protector.",
    friend: "Jinger",
    enemy: null
  },
  Onyun: {
    name: "Onyun",
    img: "images/onyun.png",
    ability: "Fiercely loyal, protects your heart.",
    personality: "Reactive, barky, loyal.",
    friend: "Potatoad",
    enemy: "Banion"
  },
  Bitty: {
    name: "Bitty",
    img: "images/bitty.png",
    ability: "Sparks hope through humor.",
    personality: "Small, cheerful, sensitive.",
    friend: "Kroot",
    enemy: "Jinger"
  },
  Jinger: {
    name: "Jinger",
    img: "images/jinger.png",
    ability: "Gives clarity and calm wisdom.",
    personality: "Wise, warm, realistic.",
    friend: "Mubii",
    enemy: "Bitty"
  }
};

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
      <h2>${questions[currentQ]}</h2>
      <div class="options"></div>
    </div>
  `;
  const optDiv = quizSection.querySelector(".options");
  options[currentQ].forEach((opt, i) => {
    const btn = document.createElement("button");
    btn.innerText = opt;
    btn.onclick = () => {
      selected.push(i);
      currentQ++;
      if (currentQ < questions.length) {
        renderQuestion();
      } else {
        calculateResult();
      }
    };
    optDiv.appendChild(btn);
  });
}

function calculateResult() {
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
