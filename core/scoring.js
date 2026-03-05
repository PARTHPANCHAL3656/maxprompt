const questions = [
    {
        question: "You need to write a LinkedIn post about a project you completed. What do you include in your prompt to AI?",
        options: [
            { text: "Type the request and the project name, then send it off", points: 10 },
            { text: "Describe the project briefly and ask for a professional post", points: 25 },
            { text: "Specify the audience, word limit, tone, and what to avoid", points: 80 },
            { text: "Define your role, the reader, the goal, constraints, and format upfront", points: 100 }
        ]
    },
    {
        question: "When starting a complex AI task, what is your first move?",
        options: [
            { text: "Write out the full request in one go and submit it", points: 10 },
            { text: "Give relevant background first, then describe what you need", points: 30 },
            { text: "Assign AI a role and then describe the task clearly", points: 65 },
            { text: "Set the role, audience, constraints, and format before the task", points: 100 }
        ]
    },
    {
        question: "AI gives you an output that is 70% right — decent, but clearly missing something. What do you do?",
        options: [
            { text: "Edit it manually and move on to the next task", points: 10 },
            { text: "Ask AI to improve it or try the same prompt again", points: 25 },
            { text: "Point out the specific section or quality that needs fixing", points: 70 },
            { text: "Diagnose why it failed, fix the prompt structure, regenerate", points: 100 }
        ]
    },
    {
        question: "How often do you intentionally compare two different prompt approaches for the same task?",
        options: [
            { text: "Never — I write one prompt and work with what I get", points: 5 },
            { text: "Occasionally, when the first output is clearly not working", points: 30 },
            { text: "On tasks that matter, I will try a different framing", points: 60 },
            { text: "Regularly — comparing approaches is part of my process", points: 100 }
        ]
    },
    {
        question: "You need AI to help plan a project: research, structure, timeline, and messaging. How do you approach it?",
        options: [
            { text: "Send one prompt asking AI to handle the full project plan", points: 10 },
            { text: "Ask for a plan overview first, then follow up on each section", points: 40 },
            { text: "Split it into separate conversations for each distinct phase", points: 75 },
            { text: "Map the workflow first, then run targeted sub-tasks in sequence", points: 100 }
        ]
    },
    {
        question: "What does task decomposition mean to you when working with AI?",
        options: [
            { text: "Breaking a long prompt into shorter, more readable chunks", points: 0 },
            { text: "Splitting a big request so AI handles one thing at a time", points: 40 },
            { text: "Separating tasks by type so each prompt stays focused", points: 70 },
            { text: "Designing a workflow where each AI output feeds the next task", points: 100 }
        ]
    },
    {
        question: "After receiving an AI output, how do you decide whether it is good enough to use?",
        options: [
            { text: "If it sounds plausible and covers the topic, I use it", points: 10 },
            { text: "I read through it and fix anything that seems obviously wrong", points: 35 },
            { text: "I compare it against what I actually needed and check for gaps", points: 70 },
            { text: "I score it on accuracy, tone, completeness, and audience fit", points: 100 }
        ]
    },
    {
        question: "AI gives you a confident, detailed answer — but something feels slightly off. What do you do?",
        options: [
            { text: "Trust the output — detailed answers are usually reliable", points: 5 },
            { text: "Search one or two facts externally to spot-check the response", points: 30 },
            { text: "Ask AI to show its reasoning or point to where it got this", points: 65 },
            { text: "Ask AI to argue against its own answer and flag assumptions", points: 100 }
        ]
    },
    {
        question: "Do you have reusable AI workflows — prompt structures you return to for recurring tasks?",
        options: [
            { text: "No — I write a fresh prompt every time from scratch", points: 0 },
            { text: "Sometimes I copy a prompt that worked well before", points: 25 },
            { text: "I have a few saved prompt structures I adjust per task", points: 60 },
            { text: "I have documented templates, roles, and formats I maintain", points: 100 }
        ]
    },
    {
        question: "How do you think about AI in relation to the work you do regularly?",
        options: [
            { text: "A tool I reach for when I need a quick answer or draft", points: 10 },
            { text: "Something I am actively trying to use more often and better", points: 25 },
            { text: "A skill I am developing with intention and regular practice", points: 65 },
            { text: "A system I am designing — building workflows that compound", points: 100 }
        ]
    }
];

const categories = {
    context: { questions: [0, 1], weight: 0.25, label: "Context-Setting" },
    iteration: { questions: [2, 3], weight: 0.25, label: "Iteration" },
    decomp: { questions: [4, 5], weight: 0.20, label: "Task Decomposition" },
    evaluation: { questions: [6, 7], weight: 0.20, label: "Output Evaluation" },
    workflow: { questions: [8, 9], weight: 0.10, label: "Workflow Thinking" }
};

function calculateScore(answers) {
    let finalScore = 0;
    const breakdown = {};
    
    for (const [key, cat] of Object.entries(categories)) {
        const avg = (answers[cat.questions[0]] + answers[cat.questions[1]]) / 2;
        breakdown[key] = Math.round(avg);
        finalScore += avg * cat.weight;
    }
    
    return {
        total: Math.min(Math.round(finalScore), 99),
        breakdown
    };
}

function getArchetype(score) {
    if (score < 20) return 'prompt_borrower';
    if (score < 40) return 'single_shotter';
    if (score < 60) return 'refiner';
    if (score < 70) return 'structured_user';
    if (score < 80) return 'system_thinker';
    if (score < 90) return 'ai_architect';
    return 'ai_native';
}

function getUserLevel() {
    const score = parseInt(getStorage('mx_score') || 0);
    if (score < 20) return 1;
    if (score < 40) return 2;
    if (score < 60) return 3;
    if (score < 70) return 4;
    if (score < 80) return 5;
    return 6;
}

function getArchetypeName() {
    const score = parseInt(getStorage('mx_score') || 0);
    const archetypeKeys = ['The Prompt Borrower', 'The Single-Shotter', 'The Refiner', 'The Structured User', 'The System Thinker', 'The AI Architect', 'The AI Native'];
    if (score < 20) return archetypeKeys[0];
    if (score < 40) return archetypeKeys[1];
    if (score < 60) return archetypeKeys[2];
    if (score < 70) return archetypeKeys[3];
    if (score < 80) return archetypeKeys[4];
    if (score < 90) return archetypeKeys[5];
    return archetypeKeys[6];
}

function fisherYates(arr) {
    const shuffled = [...arr];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// ============================================================
// REWARD SYSTEM
// ============================================================

const VAULT_LEVEL_REWARDS = {
    1: 2,
    2: 2,
    3: 3,
    4: 3,
    5: 4
};

const MISSION_LEVEL_REWARDS = {
    1: 2,
    2: 3,
    3: 4,
    4: 5,
    5: 6
};

const UNLOCK_MESSAGES = {
    2: { archetype: "Single-Shotter", scoreNeeded: 20, tip: "Complete The Lab missions at Level 1 to boost your score" },
    3: { archetype: "Refiner", scoreNeeded: 40, tip: "Pass all Level 2 Lab missions at 75%+ for a bonus" },
    4: { archetype: "Structured User", scoreNeeded: 60, tip: "Complete all Level 3 Vault cards and Lab missions to unlock" },
    5: { archetype: "System Thinker", scoreNeeded: 70, tip: "Focus on Lab missions — passing all Level 3 missions gives +4% bonus" }
};

function calculateVaultBonus() {
    const cardsRead = JSON.parse(getStorage('mx_cards_read') || '[]');
    let totalBonus = 0;

    for (const [level, maxReward] of Object.entries(VAULT_LEVEL_REWARDS)) {
        const lvl = parseInt(level);
        const cardsInLevel = vaultCards.filter(c => c.level === lvl);
        const readInLevel = cardsInLevel.filter(c => cardsRead.includes(c.id));
        const proportion = readInLevel.length / cardsInLevel.length;
        totalBonus += proportion * maxReward;
    }

    return Math.round(totalBonus * 10) / 10;
}

function calculateMissionBonus() {
    const passedMissions = JSON.parse(getStorage('mx_passed_missions') || '{}');
    let totalBonus = 0;

    for (const [level, reward] of Object.entries(MISSION_LEVEL_REWARDS)) {
        const lvl = parseInt(level);
        const missionsInLevel = missions.filter(m => m.level === lvl);
        const passedCount = missionsInLevel.filter(m => passedMissions[m.id] >= 70).length;
        const proportion = passedCount / missionsInLevel.length;
        totalBonus += proportion * reward;
    }

    return Math.round(totalBonus * 10) / 10;
}

function getEffectiveScore() {
    const quizScore = parseInt(getStorage('mx_score') || '0');
    const vaultBonus = calculateVaultBonus();
    const missionBonus = calculateMissionBonus();
    const effective = Math.min(99, Math.round(quizScore + vaultBonus + missionBonus));
    return { quizScore, vaultBonus, missionBonus, effective };
}

function recordMissionResult(missionId, score) {
    if (score < 70) return;

    const passed = JSON.parse(getStorage('mx_passed_missions') || '{}');
    if (!passed[missionId] || score > passed[missionId]) {
        passed[missionId] = score;
        setStorage('mx_passed_missions', JSON.stringify(passed));
    }

    checkMissionLevelComplete(missionId, score);
}

function recordCardRead(cardId) {
    const read = JSON.parse(getStorage('mx_cards_read') || '[]');
    if (!read.includes(cardId)) {
        read.push(cardId);
        setStorage('mx_cards_read', JSON.stringify(read));
    }

    checkVaultLevelComplete(cardId);
}

function checkVaultLevelComplete(cardId) {
    const card = vaultCards.find(c => c.id === cardId);
    if (!card) return;

    const read = JSON.parse(getStorage('mx_cards_read') || '[]');
    const cardsInLevel = vaultCards.filter(c => c.level === card.level);
    const allRead = cardsInLevel.every(c => read.includes(c.id));

    if (allRead) {
        const reward = VAULT_LEVEL_REWARDS[card.level];
        showRewardToast(`🎉 All Level ${card.level} Vault cards complete! +${reward}% bonus earned`);
    }
}

function checkMissionLevelComplete(missionId, score) {
    const mission = missions.find(m => m.id === missionId);
    if (!mission) return;

    const passed = JSON.parse(getStorage('mx_passed_missions') || '{}');
    const missionsInLevel = missions.filter(m => m.level === mission.level);
    const allPassed = missionsInLevel.every(m => passed[m.id] >= 70);

    if (allPassed) {
        const reward = MISSION_LEVEL_REWARDS[mission.level];
        showRewardToast(`🏆 All Level ${mission.level} Lab missions passed! +${reward}% bonus earned`);
    }
}

function getVaultLevelProgress(level) {
    const read = JSON.parse(getStorage('mx_cards_read') || '[]');
    const cardsInLevel = vaultCards.filter(c => c.level === level);
    const readCount = cardsInLevel.filter(c => read.includes(c.id)).length;
    const totalCount = cardsInLevel.length;
    const maxReward = VAULT_LEVEL_REWARDS[level];
    const earned = Math.round((readCount / totalCount) * maxReward * 10) / 10;

    return `${readCount}/${totalCount} cards · +${earned}% of ${maxReward}% earned`;
}

function showLockedMessage(cardLevel) {
    const effective = getEffectiveScore().effective;
    const unlock = UNLOCK_MESSAGES[cardLevel];
    const gap = unlock.scoreNeeded - effective;

    showModal({
        icon: "🔒",
        title: `Level ${cardLevel} is locked`,
        body: `These cards unlock when you reach ${unlock.scoreNeeded}% (${unlock.archetype} level). You are currently at ${effective}% — ${gap} points away.`,
        tip: unlock.tip,
        cta: "How to get there",
        ctaAction: () => navigateTo('dashboard')
    });
}

function showLockedMissionMessage(missionLevel) {
    const effective = getEffectiveScore().effective;
    const requiredScore = { 1: 0, 2: 20, 3: 40, 4: 60, 5: 70 }[missionLevel];
    const gap = requiredScore - effective;

    const prevLevel = missionLevel - 1;
    const prevMissions = missions.filter(m => m.level === prevLevel);
    const passed = JSON.parse(getStorage('mx_passed_missions') || '{}');
    const notYetPassed = prevMissions.filter(m => !passed[m.id] || passed[m.id] < 75);

    let pathMessage = '';
    if (notYetPassed.length > 0) {
        pathMessage = `Complete ${notYetPassed.length} more Level ${prevLevel} mission${notYetPassed.length > 1 ? 's' : ''} at 75%+ to unlock this level.`;
    } else {
        pathMessage = `You need ${gap} more points on your effective score.`;
    }

    showModal({
        icon: "🧪",
        title: `Level ${missionLevel} missions are locked`,
        body: `These missions unlock at ${requiredScore}% effective score. You are at ${effective}%.`,
        tip: pathMessage,
        cta: "Go to Level " + (missionLevel - 1) + " missions",
        ctaAction: () => { currentLabCategory = ['email', 'content', 'research', 'problem-solving', 'decisions'][missionLevel - 1]; navigateTo('lab'); }
    });
}

function showModal({ icon, title, body, tip, cta, ctaAction }) {
    const existing = document.querySelector('.lock-modal-overlay');
    if (existing) existing.remove();

    const modal = document.createElement('div');
    modal.className = 'lock-modal-overlay';
    modal.innerHTML = `
        <div class="lock-modal">
            <div class="lock-modal-icon">${icon}</div>
            <h3>${title}</h3>
            <p>${body}</p>
            <div class="lock-modal-tip">💡 ${tip}</div>
            <div class="lock-modal-actions">
                <button class="btn-secondary" onclick="this.closest('.lock-modal-overlay').remove()">Got it</button>
                <button class="btn-primary" id="modal-cta-btn">${cta}</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    document.getElementById('modal-cta-btn').onclick = () => {
        modal.remove();
        ctaAction();
    };
}

function showRewardToast(message, duration = 3000) {
    const existing = document.getElementById('reward-toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.id = 'reward-toast';
    toast.className = 'reward-toast';
    toast.textContent = message;
    document.body.appendChild(toast);

    requestAnimationFrame(() => toast.classList.add('toast-visible'));

    setTimeout(() => {
        toast.classList.remove('toast-visible');
        setTimeout(() => toast.remove(), 300);
    }, duration);
}

function handleGotIt(cardId) {
    recordCardRead(cardId);

    const card = vaultCards.find(c => c.id === cardId);
    if (!card) return;

    const levelMissions = missions.filter(m => m.level === card.level);

    if (levelMissions.length === 0) {
        navigateTo('lab');
        return;
    }

    const lastPlayed = getStorage('mx_last_mission');
    const candidates = levelMissions.filter(m => m.id !== lastPlayed);
    const pool = candidates.length > 0 ? candidates : levelMissions;
    const randomMission = pool[Math.floor(Math.random() * pool.length)];

    setStorage('mx_last_mission', randomMission.id);
    currentMission = randomMission;
    currentLabCategory = randomMission.category;
    
    navigateTo('lab-mission');
    renderMissionDetail(randomMission);
}
