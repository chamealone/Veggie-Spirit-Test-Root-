const startBtn = document.getElementById("start-btn");
const homeSection = document.getElementById("home");
const quizSection = document.getElementById("quiz");
const resultSection = document.getElementById("result");
const usernameInput = document.getElementById("name-input");

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

const options = [
  ["Disappear to reset", "Explode first, think later", "Cry until it passes", "Throw jokes to ease the pain", "Pace while analyzing"],
  ["Get excited like you do", "Respect your space and timing", "Follow plans and structure", "Listen without judging", "Help without asking too many questions"],
  ["That strange feeling of emptiness", "Sudden mood swings", "Silent heartbreak", "Random anxiety with no reason", "Overly logical coldness"],
  ["A real, heartfelt hug", "A clear and rational voice", "A friend who’ll stand up for you", "Someone to just listen", "Time alone before you explode"],
  ["Deep conversations till 2AM", "Cuddle time, no questions asked", "Retreat into the woods alone", "Quiet understanding with no pressure", "Sharing energy even when you're tired"],
  ["You're too stubborn", "You seem cold and distant", "You're way too sensitive", "You’re quiet and hard to read", "You’re too strict or idealistic"],
  ["Say honest truths to wake them up", "Feel their pain and listen", "Invite them to do random fun stuff", "Crack a joke, even a bad one", "Sit quietly next to them"],
  ["Optimistic, even when reality hits hard", "Calm without oversleeping too much", "Assertive like a movie hero", "Open-hearted without fear", "Less angry over small stuff"],
  ["Write it out and reflect", "Run far away", "Cry in silence", "Turn it into a joke", "Create something to express it"],
  ["Protect the people you love", "Be seen and appreciated for your efforts", "Not be forced to act okay", "Keep things under control, even a little", "Just be quiet without explaining"],
  ["Overthink the smallest things", "Get affected by other people's moods", "Drift too far in chill mode", "Fall for the wrong people", "Feel annoyed by too much positivity"],
  ["Cheer people up when they’re down", "Heal others without sounding wise", "Show people the reality they avoid", "Push away drama from afar", "Bring balance to chaos through humor"],
  ["Feel calm and focused", "Just woke up from a great nap", "Make people laugh out loud", "Feel like you’ve found your purpose", "Keep others going, even when you're tired"],
  ["Keep bringing drama", "Demand things but don't give effort", "Talk big but never act", "Ignore how their actions affect others", "Disappear and ruin the vibe"],
  ["Search for deeper meaning", "Get lost in your emotions", "Say 'Whatever!' and move on", "Wait for someone to hug you", "Silently evaluate everything"],
  ["Face problems with you", "Hug you without asking why", "Crack absurd jokes with you", "Be honest without being mean", "Sit beside you in silence"]
];

const spiritMap = [
  ["Mubii", "Onyun", "Banion", "Kroot", "Gingeer"],
  ["Bitty", "Mubii", "Gingeer", "Banion", "Onyun"],
  ["Potatoad", "Onyun", "Banion", "Bitty", "Gingeer"],
  ["Banion", "Gingeer", "Onyun", "Kroot", "Mubii"],
  ["Banion", "Potatoad", "Gingeer", "Mubii", "Bitty"],
  ["Onyun", "Kroot", "Banion", "Mubii", "Gingeer"],
  ["Gingeer", "Banion", "Bitty", "Kroot", "Potatoad"],
  ["Bitty", "Potatoad", "Gingeer", "Mubii", "Onyun"],
  ["Mubii", "Gingeer", "Banion", "Kroot", "Bitty"],
  ["Onyun", "Bitty", "Potatoad", "Gingeer", "Mubii"],
  ["Mubii", "Banion", "Potatoad", "Onyun", "Gingeer"],
  ["Bitty", "Banion", "Gingeer", "Mubii", "Kroot"],
  ["Gingeer", "Potatoad", "Kroot", "Onyun", "Bitty"],
  ["Onyun", "Bitty", "Gingeer", "Banion", "Mubii"],
  ["Gingeer", "Banion", "Kroot", "Bitty", "Mubii"],
  ["Onyun", "Banion", "Kroot", "Gingeer", "Mubii"]
];


const spiritScores = {
  Kroot: 0,
  Banion: 0,
  Potatoad: 0,
  Mubii: 0,
  Onyun: 0,
  Bitty: 0,
  Gingeer: 0
};

const spiritProfiles = {
  Kroot: {
    name: "🥕 KROOT – The Guarded Root",
    description:
      "Sarcastic, sharp-tongued, and always acting like they don’t care—but deep down, Kroot gets you. If you’re the type who hides emotions with humor or silence, Kroot becomes your personal safe zone. He won't push you to talk, but he'll stay beside you until you're ready. Your walls? He respects them—but he still shows up.",
    img: "kroot.png",
    ability: "Helps you feel heard and emotionally safe.",
    supports: "The ones who bottle things up but crave to be understood.",
    friend: "Bitty",
    enemy: null
  },
  Banion: {
    name: "🍠 BANION – The Emotional Flame",
    description:
      "Banion doesn’t fear emotional chaos—he *is* the chaos. If you’re the kind of person who cries in secret or feels things a little “too much,” he's here to remind you: It’s okay to explode, laugh, cry, and be real. No need to hold back anymore. He's intense, but warm—and always in your corner.",
    img: "banion.png",
    ability: "Helps you release pent-up emotions.",
    supports: "Deep feelers who try to keep it all together… until they can’t.",
    friend: "Mubii",
    enemy: "Onyun"
  },
  Potatoad: {
    name: "🥔 POTATOAD – The Resting Healer",
    description:
      "Tired? Good. You’re allowed to be. Potatoad appears when you're exhausted from pretending you're okay. He’s the spirit who tells you that naps are sacred, quiet is powerful, and doing “nothing” is absolutely something. No pressure, no expectations—just gentle support from your cozy sidekick.",
    img: "potatoad.png",
    ability: "Teaches you that rest is valid.",
    supports: "The overworked, burned-out, and emotionally drained.",
    friend: "Onyun",
    enemy: null
  },
  Mubii: {
    name: "🧊 MUBII – The Silent Shield",
    description:
      "Mubii doesn’t talk much—but you’ll feel safer when he’s around. He’s the quiet protector, the invisible force field. If you're the kind who easily gets drained by others, Mubii is your emotional bouncer. Soft-hearted, strong-souled, and always watching out for you—even when you don’t notice.",
    img: "mubii.png",
    ability: "Repels toxic vibes and negative energy.",
    supports: "Sensitive souls who absorb too much from the world around them.",
    friend: "Gingeer",
    enemy: null
  },
  Onyun: {
    name: "🧅 ONYUN – The Fierce Heart",
    description:
      "Onyun barks a lot—but only because he cares. He’s reactive, intense, and unapologetically loyal. If you're the kind of person who gives your all and gets hurt too often, Onyun becomes your fierce protector. He defends your boundaries like a tiny warrior with a big heart.",
    img: "onyun.png",
    ability: "Fiercely loyal, protects your heart.",
    supports: "Those who feel everything too deeply and love too hard.",
    friend: "Potatoad",
    enemy: "Banion"
  },
  Bitty: {
    name: "🌟 BITTY – The Hope Spark",
    description:
      "Bitty is small, but mighty in spirit. He shows up when the world feels too gray. If you're the one who’s always cheering others up while carrying your own weight, Bitty is your mirror—and your spark. He reminds you that even the smallest light can change the whole room.",
    img: "bitty.png",
    ability: "Sparks joy and lightens heavy hearts.",
    supports: "The sensitive, cheerful ones who hide their sadness behind smiles.",
    friend: "Kroot",
    enemy: "Gingeer"
  },
  Gingeer: {
    name: "🍃 GINGEER – The Grounded Clarity",
    description:
      "Gingeer speaks softly but never vaguely. He shows up when you feel mentally cluttered or emotionally foggy. If you're the kind who chases answers, meaning, or closure, Gingeer grounds you. He won’t sugarcoat—but he’ll help you see what’s real. Clarity can be hard—but it's healing.",
    img: "Gingeer.png",
    ability: "Gives clarity and calm wisdom.",
    supports: "Overthinkers, truth-seekers, and those stuck in spirals.",
    friend: "Mubii",
    enemy: "Bitty"
  }
};

let currentQ = 0;
let selected = [];

startBtn.onclick = () => {
  const name = usernameInput.value.trim();
  if (!name) {
    alert("Please enter your name!");
    return;
  }
  homeSection.style.display = "none";
  quizSection.style.display = "block";
  renderQuestion();
};

function renderQuestion() {
  const total = questions.length;
  const questionText = questions[currentQ];
  const opts = options[currentQ];

  quizSection.innerHTML = `
    <div class="question-box">
      <h2>(${currentQ + 1}/${total}) ${questionText}</h2>
      <div class="options">
        ${opts.map((opt, i) => {
          const isSelected = selected[currentQ] === i ? 'selected-option' : '';
          return `<button class="button-55 ${isSelected}" onclick="selectOption(${i})">${opt}</button>`;
        }).join('')}
      </div>
      <div>
        ${currentQ > 0 ? `<button class="button-55" onclick="goBack()">Back</button>` : ''}
        ${currentQ < total - 1 ? '' : `<button class="button-55" onclick="calculateResult()">View Result</button>`}
      </div>
    </div>
  `;
}

function selectOption(index) {
  selected[currentQ] = index;
  currentQ++;
  if (currentQ < questions.length) {
    renderQuestion();
  } else {
    calculateResult();
  }
}

function goBack() {
  if (currentQ > 0) {
    currentQ--;
    renderQuestion();
  }
}

function calculateResult() {
  const spiritScores = {
    Kroot: 0, Banion: 0, Potatoad: 0,
    Mubii: 0, Onyun: 0, Bitty: 0, Gingeer: 0
  };

  selected.forEach((choiceIndex, questionIndex) => {
    const spirit = spiritMap[questionIndex][choiceIndex];
    spiritScores[spirit]++;
  });

  const topSpirit = Object.entries(spiritScores).sort((a, b) => b[1] - a[1])[0][0];
  showResult(topSpirit);
}

function showResult(spiritKey) {
  const spirit = spiritProfiles[spiritKey];
  const name = usernameInput.value.trim();

  const friendImg = spirit.friend ? `images/${spiritProfiles[spirit.friend].img}` : null;
  const enemyImg = spirit.enemy ? `images/${spiritProfiles[spirit.enemy]?.img}` : null;

  resultSection.innerHTML = `
    <h2>${name}, your Spirit Veggie is:</h2>
    <h3>${spirit.name}</h3>
    <img src="images/${spirit.img}" alt="${spirit.name}" class="main-spirit-img" />
    <p><strong>Description:</strong> ${spirit.description}</p>
    <p><strong>Ability:</strong> ${spirit.ability}</p>
    <p><strong>Supports:</strong> ${spirit.supports}</p>

    <div class="spirit-relations">
      <div>
        <p><strong>Friend</strong></p>
        ${
          friendImg
            ? `<img src="${friendImg}" alt="${spirit.friend}" class="side-spirit-img" />`
            : `<p>No bestie found</p>`
        }
      </div>
      <div>
        <p><strong>Enemy</strong></p>
        ${
          enemyImg
            ? `<img src="${enemyImg}" alt="${spirit.enemy}" class="side-spirit-img" />`
            : `<p>No known enemies</p>`
        }
      </div>
    </div>

    <p>Share your result!</p>
    <p>
      <a href="https://www.instagram.com/chamealone" target="_blank">@chamealone</a><br>
      <a href="#" onclick="copyLink()">Copy Link 🔗</a>
    </p>
  `;

  quizSection.style.display = "none";
  resultSection.style.display = "block";
}

function copyLink() {
  navigator.clipboard.writeText(window.location.href).then(() => {
    alert("Link copied to clipboard!");
  });
}
