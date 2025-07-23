<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Spirit Veggie Finder</title>
  <link href="https://fonts.googleapis.com/css2?family=Fredoka&family=Poppins&display=swap" rel="stylesheet">
  <style>
    body {
      margin: 0;
      font-family: 'Poppins', sans-serif;
      background-color: #fff9ec;
      color: #333;
      padding: 2rem;
    }
    h1, h2, h3 {
      font-family: 'Fredoka', sans-serif;
    }
    .container {
      max-width: 600px;
      margin: auto;
    }
    .question-box {
      margin-bottom: 2rem;
    }
    .options button {
      display: block;
      margin: 0.5rem 0;
      padding: 1rem;
      border: none;
      border-radius: 8px;
      background-color: #c6ff00;
      font-size: 1rem;
      cursor: pointer;
      font-family: 'Fredoka';
    }
    #next-btn {
      margin-top: 2rem;
      padding: 1rem 2rem;
      background-color: #b2ff59;
      border: none;
      border-radius: 10px;
      font-size: 1rem;
      font-family: 'Poppins';
      cursor: pointer;
    }
    .result {
      background-color: #fff3d1;
      padding: 2rem;
      border-radius: 12px;
      margin-top: 2rem;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Which Spirit Veggie do you need today?</h1>
    <div id="quiz"></div>
    <button id="next-btn" style="display:none">Next</button>
    <div id="result" class="result" style="display:none"></div>
  </div>

  <script>
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
  ["Mubii", "Onyun", "Banion", "Kroot", "Jinger"],
  ["Bitty", "Mubii", "Jinger", "Banion", "Onyun"],
  ["Potatoad", "Onyun", "Banion", "Bitty", "Jinger"],
  ["Banion", "Jinger", "Onyun", "Kroot", "Mubii"],
  ["Banion", "Potatoad", "Jinger", "Mubii", "Bitty"],
  ["Onyun", "Kroot", "Banion", "Mubii", "Jinger"],
  ["Jinger", "Banion", "Bitty", "Kroot", "Potatoad"],
  ["Bitty", "Potatoad", "Jinger", "Mubii", "Onyun"],
  ["Mubii", "Jinger", "Banion", "Kroot", "Bitty"],
  ["Onyun", "Bitty", "Potatoad", "Jinger", "Mubii"],
  ["Mubii", "Banion", "Potatoad", "Onyun", "Jinger"],
  ["Bitty", "Banion", "Jinger", "Mubii", "Kroot"],
  ["Jinger", "Potatoad", "Kroot", "Onyun", "Bitty"],
  ["Onyun", "Bitty", "Jinger", "Banion", "Mubii"],
  ["Jinger", "Banion", "Kroot", "Bitty", "Mubii"],
  ["Onyun", "Banion", "Kroot", "Jinger", "Mubii"]
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
        ability: "Helps you feel grounded during emotional storms.",
        personality: "Tsundere caring. Cares deeply but won’t remind you twice.",
        for: "Those who feel lost or floating",
        friend: "Potatoad",
        enemy: "Overthinking"
      },
      Banion: {
        name: "Banion",
        ability: "Let your tears out and feel emotionally balanced.",
        personality: "Mischievous but cathartic. Makes you cry but you feel lighter after.",
        for: "Those who suppress emotions",
        friend: "Mubii",
        enemy: "Bottled feelings"
      },
      Potatoad: {
        name: "Potatoad",
        ability: "Reminds you that rest matters.",
        personality: "Soft, sleepy, gemesin. Prioritizes naps and slow days.",
        for: "Those who overwork",
        friend: "Kroot",
        enemy: "Burnout"
      },
      Mubii: {
        name: "Mubii",
        ability: "Blocks toxic energy and protects your peace.",
        personality: "Quiet but strong. Your ninja against negative people.",
        for: "Those in toxic environments",
        friend: "Bitty",
        enemy: "Toxic people"
      },
      Onyun: {
        name: "Onyun",
        ability: "Protects emotional vulnerability with loyal bark.",
        personality: "Like a dog: loyal, barky, but soft inside.",
        for: "Those who cry but hide",
        friend: "Banion",
        enemy: "Fake comfort"
      },
      Bitty: {
        name: "Bitty",
        ability: "Lifts sadness quietly, helps you find light in the dark.",
        personality: "Tiny, cheerful, but deep. Hides pain with jokes.",
        for: "Those masking their pain",
        friend: "Jinger",
        enemy: "Hopelessness"
      },
      Jinger: {
        name: "Jinger",
        ability: "Keeps your spirit warm like forest sunlight.",
        personality: "Wise, warm, soft like a deer in fog.",
        for: "Those who feel too cold or unseen",
        friend: "Bitty",
        enemy: "Isolation"
      }
    };

    let currentQ = 0;
    let selected = [];

    const quiz = document.getElementById("quiz");
    const nextBtn = document.getElementById("next-btn");
    const resultDiv = document.getElementById("result");

    function renderQuestion() {
      quiz.innerHTML = `<div class="question-box"><h2>${questions[currentQ]}</h2><div class="options"></div></div>`;
      const optDiv = quiz.querySelector(".options");
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
      selected.forEach(index => {
        const spirit = Object.keys(spiritScores)[index % 7];
        spiritScores[spirit] += 1;
      });
      const topSpirit = Object.entries(spiritScores).sort((a, b) => b[1] - a[1])[0][0];
      showResult(topSpirit);
    }

    function showResult(spiritKey) {
      const spirit = spiritProfiles[spiritKey];
      quiz.style.display = "none";
      nextBtn.style.display = "none";
      resultDiv.style.display = "block";
      resultDiv.innerHTML = `
        <h2>You need: ${spirit.name}</h2>
        <p><strong>Personality:</strong> ${spirit.personality}</p>
        <p><strong>Ability:</strong> ${spirit.ability}</p>
        <p><strong>Cocok untuk:</strong> ${spirit.for}</p>
        <p><strong>Grounding Friend:</strong> ${spirit.friend}</p>
        <p><strong>Enemy Spirit:</strong> ${spirit.enemy}</p>
      `;
    }

    renderQuestion();
  </script>
</body>
</html>
