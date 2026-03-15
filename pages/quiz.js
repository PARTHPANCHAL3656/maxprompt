// Quiz page functions
let currentQuestionIndex = 0;
let userAnswers = [];
let shuffledQuestions = [];
let username = "";

function showPage(pageId) {
  document.querySelectorAll(".page").forEach((p) => p.classList.add("hidden"));
  document.getElementById(pageId).classList.remove("hidden");
  document.getElementById(pageId).style.animation = "fadeIn 0.5s ease-out";
}

function goToNameInput() {
  showPage("name-input-page");
}

function submitName() {
  const input = document.getElementById("username-input");
  const validationMsg = document.getElementById("name-validation");
  const name = input.value.trim();

  if (name.length < 2) {
    validationMsg.textContent = "Name must be at least 2 characters";
    return;
  }
  if (!/^[A-Za-z]+$/.test(name)) {
    validationMsg.textContent = "Only letters allowed";
    return;
  }
  if (name.length > 20) {
    validationMsg.textContent = "Name must be 20 characters or less";
    return;
  }

  username = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  setStorage("mx_username", username);
  goToPrediction();
}

function goToPrediction() {
  document.getElementById("prediction-greeting").textContent =
    `Before we start, ${username} — what % do you think you use AI at?`;
  document.getElementById("prediction-slider").value = 50;
  document.getElementById("slider-display").textContent = "50%";
  showPage("prediction-page");

  document.getElementById("prediction-slider").oninput = function () {
    document.getElementById("slider-display").textContent = this.value + "%";
  };
}

function submitPrediction() {
  const prediction = parseInt(
    document.getElementById("prediction-slider").value,
  );
  setStorage("mx_prediction", prediction);
  startQuiz();
}

function startQuiz() {
  currentQuestionIndex = 0;
  userAnswers = [];
  shuffledQuestions = fisherYates(questions).map((q, idx) => ({
    ...q,
    originalIndex: idx,
    options: fisherYates(q.options.map((opt) => ({ ...opt }))),
  }));

  showPage("quiz-page");
  renderQuestion();
}

function renderQuestion() {
  const q = shuffledQuestions[currentQuestionIndex];
  document.getElementById("current-q").textContent = currentQuestionIndex + 1;
  document.getElementById("question-text").textContent = q.question;
  document.getElementById("quiz-progress-bar").style.width =
    (currentQuestionIndex / 10) * 100 + "%";

  const container = document.getElementById("options-container");
  container.innerHTML = "";

  const letters = ["A", "B", "C", "D"];
  q.options.forEach((opt, idx) => {
    const btn = document.createElement("button");
    btn.className = "option-btn";
    btn.innerHTML = `<span class="option-letter">${letters[idx]}</span><span>${opt.text}</span>`;
    btn.onclick = () => selectOption(opt.points, q.originalIndex);
    container.appendChild(btn);
  });
}

function selectOption(points, originalIndex) {
  userAnswers[originalIndex] = points;
  currentQuestionIndex++;

  if (currentQuestionIndex < 10) {
    renderQuestion();
  } else {
    goToCalculating();
  }
}

function restartQuiz() {
  if (confirm("Start over? Your progress will be lost.")) {
    const playbook = getStorage("mx_playbook");
    localStorage.clear();
    if (playbook) setStorage("mx_playbook", playbook);
    document.getElementById("main-nav").classList.add("hidden");
    showPage("landing-page");
  }
}

function goToCalculating() {
  document.getElementById("calculating-text").textContent =
    `Analysing ${username}'s AI behaviour patterns...`;
  showPage("calculating-page");

  setTimeout(() => {
    showScoreReveal();
  }, 2000);
}

const categoryMessages = {
  context: {
    low: "You're sending AI into tasks with almost no briefing.",
    mid: "You give AI context, but constraints and format are missing.",
    high: "Strong briefing habit.",
  },
  iteration: {
    low: "First output = final output.",
    mid: "You iterate when something's wrong.",
    high: "You diagnose failures and fix prompts.",
  },
  decomp: {
    low: "Complex tasks go in as one big prompt.",
    mid: "You split tasks sometimes.",
    high: "You design task sequences.",
  },
  evaluation: {
    low: "If it sounds right, you use it.",
    mid: "You check for obvious errors.",
    high: "You evaluate before you use.",
  },
  workflow: {
    low: "Every AI session starts from scratch.",
    mid: "You have some saved prompts.",
    high: "You maintain documented workflows.",
  },
};

function getCategoryMessage(category, score) {
  if (score <= 40) return categoryMessages[category].low;
  if (score <= 70) return categoryMessages[category].mid;
  return categoryMessages[category].high;
}

function getGapMessage(prediction, actual) {
  const gap = Math.abs(prediction - actual);
  const direction = prediction > actual ? "higher" : "lower";

  if (gap < 5) return `${username}, you know yourself well.`;
  if (direction === "higher") {
    if (gap <= 15)
      return `You overestimated by ${gap} points. That's what we're here to close.`;
    if (gap <= 30)
      return `You predicted ${prediction}%. You scored ${actual}%. That ${gap}-point gap is valuable.`;
    return "This is the AI Competence Illusion. You're far from alone.";
  }
  if (direction === "lower") {
    if (gap <= 20) return `${username}, you undersold yourself.`;
    return "You're better than you thought.";
  }
}

function showScoreReveal() {
  const prediction = parseInt(getStorage("mx_prediction"));
  const result = calculateScore(userAnswers);
  const archetypeKey = getArchetype(result.total);
  const archetype = archetypes[archetypeKey];

  setStorage("mx_score", result.total);
  setStorage("mx_archetype", archetypeKey);
  setStorage("mx_breakdown", JSON.stringify(result.breakdown));
  setStorage("mx_quiz_date", new Date().toISOString().split("T")[0]);
  setStorage("mx_day", 1);
  setStorage("mx_challenges_done", JSON.stringify([]));

  // Vercel Analytics — track quiz completion
  if (window.va) {
    window.va("event", { name: "quiz_completed", data: { score: finalScore } });
  }
  // In pages/lab.js — after a mission passes 75%
  if (window.va) window.va("event", { name: "lab_mission_passed" });

  // In pages/vault.js — after Got It is clicked
  if (window.va) window.va("event", { name: "vault_card_read" });
  showPage("score-reveal-page");

  setTimeout(() => {
    document.getElementById("prediction-display").textContent =
      `You predicted: ${prediction}%`;
  }, 800);

  setTimeout(() => {
    document.getElementById("actual-score-label").classList.remove("hidden");
  }, 1600);

  setTimeout(() => {
    const meterFill = document.getElementById("score-meter-fill");
    const meterPointer = document.getElementById("score-meter-pointer");
    const scoreDisplay = document.getElementById("score-value-display");

    meterFill.style.width = result.total + "%";
    meterPointer.style.left = `calc(${result.total}% - 2px)`;
    scoreDisplay.style.opacity = "1";

    let current = 0;
    const interval = setInterval(() => {
      current += 1;
      scoreDisplay.textContent = current + "%";
      if (current >= result.total) clearInterval(interval);
    }, 1500 / result.total);
  }, 1800);

  setTimeout(() => {
    const reveal = document.getElementById("archetype-reveal");
    reveal.classList.remove("hidden");
    document.getElementById("archetype-title").textContent = archetype.title;
    document.getElementById("archetype-subtitle").textContent =
      `Score: ${result.total}%`;
  }, 3300);

  setTimeout(() => {
    const gapMsg = document.getElementById("gap-message");
    gapMsg.classList.remove("hidden");
    gapMsg.textContent = getGapMessage(prediction, result.total);
  }, 3800);

  setTimeout(() => {
    const seeBtn = document.getElementById("see-breakdown-btn");
    seeBtn.classList.remove("hidden");
    
    // Pre-show the nav bar so dashboard works without reload
    document.getElementById("main-nav").classList.remove("hidden");
    document.querySelectorAll(".nav-item").forEach(item => item.classList.remove("active"));
    const dashNav = document.getElementById("nav-dashboard");
    if (dashNav) dashNav.classList.add("active");
  }, 4500);
}

function showBreakdown() {
  showArchetypePage();
  // Ensure nav is visible after quiz completion
  document.getElementById("main-nav").classList.remove("hidden");
}

function showArchetypePage() {
  const archetypeKey = getArchetype(parseInt(getStorage("mx_score")));
  const archetype = archetypes[archetypeKey];
  const name = getStorage("mx_username");

  document.getElementById("archetype-badge").textContent = archetype.badge;
  document.getElementById("archetype-headline").textContent =
    archetype.headline.replace("[NAME]", name);
  document.getElementById("archetype-whats-happening").textContent =
    archetype.whatsHappening;
  document.getElementById("archetype-gap").textContent = archetype.gap;
  document.getElementById("archetype-focus").textContent = archetype.focus;
  document.getElementById("archetype-closer").textContent = archetype.closer;

  showPage("archetype-page");
}

function goToChallenge() {
  const score = parseInt(getStorage("mx_score"));
  const name = getStorage("mx_username");

  if (!score || isNaN(score)) {
    alert("Please complete the quiz first!");
    document.getElementById("main-nav").classList.add("hidden");
    showPage("landing-page");
    return;
  }

  const archetypeKey = getArchetype(score);
  const archetype = archetypes[archetypeKey];
  const currentDay = parseInt(getStorage("mx_day") || 1);
  const challengesDone = JSON.parse(getStorage("mx_challenges_done") || "[]");
  const challengeIndex = Math.min(currentDay - 1, 6);

  const challenge = archetype.challenges[challengeIndex];

  document.getElementById("challenge-title").textContent = challenge.title;
  document.getElementById("challenge-description").textContent =
    challenge.description.replace(/\[NAME\]/g, name);
  document.querySelector(".challenge-badge").textContent =
    `Day ${currentDay} Challenge`;

  const completeBtn = document.querySelector("#challenge-page .btn-primary");
  if (challengesDone.includes(currentDay)) {
    completeBtn.textContent = "Back to Dashboard";
    completeBtn.onclick = function () {
      navigateTo("dashboard");
    };
  } else {
    completeBtn.textContent = "Mark Complete";
    completeBtn.onclick = function () {
      completeAndAdvance(currentDay);
    };
  }

  showPage("challenge-page");
}

function completeChallenge() {
  const currentDay = parseInt(getStorage("mx_day") || 1);
  completeAndAdvance(currentDay);
}

function completeAndAdvance(dayNum) {
  const challengesDone = JSON.parse(getStorage("mx_challenges_done") || "[]");

  if (!challengesDone.includes(dayNum)) {
    challengesDone.push(dayNum);
    setStorage("mx_challenges_done", JSON.stringify(challengesDone));
  }

  const currentDay = parseInt(getStorage("mx_day") || 1);
  if (currentDay < 7) {
    setStorage("mx_day", currentDay + 1);
  }

  navigateTo("dashboard");
}

function retakeQuiz() {
  const quizDate = getStorage("mx_quiz_date");
  if (quizDate) {
    const daysSince = Math.floor(
      (new Date() - new Date(quizDate)) / (1000 * 60 * 60 * 24),
    );
    if (daysSince < 7) {
      document.getElementById("retake-modal").classList.remove("hidden");
      return;
    }
  }
  startQuiz();
}

function closeModal() {
  document.getElementById("retake-modal").classList.add("hidden");
}

function resetAll() {
  if (confirm("This will erase all your progress. Are you sure?")) {
    const playbook = getStorage("mx_playbook");
    localStorage.clear();
    if (playbook) setStorage("mx_playbook", playbook);
    document.getElementById("main-nav").classList.add("hidden");
    showPage("landing-page");
  }
}

async function initApp() {
  // Init Supabase first
  await initSupabase();
  
  // Load their data from Supabase into localStorage
  await loadFromSupabase();
  
  // Then your existing logic runs normally — nothing else changes
  const savedUsername = getStorage('mx_username');
  const savedScore = getStorage('mx_score');

  if (savedUsername && savedScore !== null) {
    const hash = window.location.hash.slice(1) || 'dashboard';
    renderSection(hash);
  } else if (savedUsername) {
    username = savedUsername;
    goToPrediction();
  } else {
    document.getElementById('main-nav').classList.add('hidden');
    showPage('landing-page');
  }
}

document
  .getElementById("username-input")
  .addEventListener("keypress", function (e) {
    if (e.key === "Enter") submitName();
  });

document.addEventListener("DOMContentLoaded", initApp);
