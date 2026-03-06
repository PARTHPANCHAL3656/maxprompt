function showDashboard() {
    const name = getStorage('mx_username');
    const { quizScore, vaultBonus, missionBonus, effective } = getEffectiveScore();
    const prediction = parseInt(getStorage('mx_prediction'));
    const breakdown = JSON.parse(getStorage('mx_breakdown'));
    const challengesDone = JSON.parse(getStorage('mx_challenges_done') || '[]');
    const currentDay = parseInt(getStorage('mx_day') || 1);
    const quizDate = getStorage('mx_quiz_date');

    // ✅ Always use LIVE effective score for archetype — never frozen storage
    const archetypeKey = getArchetype(effective);
    const archetype = archetypes[archetypeKey];

    // ✅ Check for level up before rendering
    const previousArchetypeKey = getStorage('mx_archetype');
    if (previousArchetypeKey && previousArchetypeKey !== archetypeKey) {
        // Level up detected — update storage and show celebration
        setStorage('mx_archetype', archetypeKey);
        // Reset 7-day challenges to new archetype level
        setStorage('mx_day', 1);
        setStorage('mx_challenges_done', JSON.stringify([]));
        // Show celebration after a short delay so dashboard renders first
        setTimeout(() => showLevelUpCard(previousArchetypeKey, archetypeKey), 400);
    }

    document.getElementById('dashboard-greeting').textContent = `Welcome back, ${name}`;
    document.getElementById('dashboard-archetype-badge').textContent = archetype.badge;
    
    // ✅ Show live archetype title on dashboard
    let titleEl = document.getElementById('dashboard-archetype-title');
    if (titleEl) titleEl.textContent = archetype.title;

    document.getElementById('dashboard-score').textContent = effective + '%';
    document.getElementById('dashboard-prediction').textContent = prediction + '%';

    let breakdownEl = document.getElementById('score-breakdown-text');
    if (!breakdownEl) {
        const predEl = document.getElementById('dashboard-prediction').parentElement;
        breakdownEl = document.createElement('div');
        breakdownEl.id = 'score-breakdown-text';
        breakdownEl.className = 'score-breakdown-text';
        breakdownEl.style.cssText = 'font-size: 0.85rem; color: var(--text-muted); margin-top: 0.5rem;';
        predEl.appendChild(breakdownEl);
    }
    breakdownEl.innerHTML = `Quiz: ${quizScore}% + Vault: +${vaultBonus}% + Lab: +${missionBonus}% = <strong>${effective}%</strong> effective`;

    const categoryBars = document.getElementById('category-bars');
    categoryBars.innerHTML = '';

    const categoryKeys = ['context', 'iteration', 'decomp', 'evaluation', 'workflow'];
    categoryKeys.forEach(key => {
        const catScore = breakdown[key];
        const label = categories[key].label;
        const message = getCategoryMessage(key, catScore);

        const bar = document.createElement('div');
        bar.className = 'category-bar';
        bar.innerHTML = `
            <div class="category-header">
                <span class="category-name">${label}</span>
                <span class="category-score">${catScore}%</span>
            </div>
            <div class="category-progress">
                <div class="category-fill" style="width: ${catScore}%"></div>
            </div>
            <p class="category-message">${message}</p>
        `;
        categoryBars.appendChild(bar);
    });

    for (let i = 1; i <= 7; i++) {
        const dayEl = document.getElementById(`day-${i}`);
        dayEl.classList.remove('completed', 'current', 'locked');

        if (challengesDone.includes(i)) {
            dayEl.classList.add('completed');
        } else if (i < currentDay) {
            dayEl.classList.add('locked');
        } else if (i === currentDay) {
            dayEl.classList.add('current');
        } else {
            dayEl.classList.add('locked');
        }
    }

    document.getElementById('day-progress-text').textContent = `Day ${Math.min(currentDay, 7)} of 7`;

    const retakeBtn = document.getElementById('retake-btn');
    const daysSinceQuiz = quizDate ? Math.floor((new Date() - new Date(quizDate)) / (1000 * 60 * 60 * 24)) : 999;
    retakeBtn.style.display = daysSinceQuiz < 7 ? 'none' : 'block';

    showPage('dashboard-page');

    document.getElementById('main-nav').classList.remove('hidden');
    document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
    document.getElementById('nav-dashboard').classList.add('active');
}

function viewDay(dayNum) {
    const challengesDone = JSON.parse(getStorage('mx_challenges_done') || '[]');
    const currentDay = parseInt(getStorage('mx_day') || 1);

    if (dayNum > currentDay && !challengesDone.includes(dayNum)) {
        alert(`Complete Day ${dayNum - 1} first to unlock this challenge!`);
        return;
    }

    const { effective } = getEffectiveScore(); // ✅ use effective not raw score
    const name = getStorage('mx_username');
    const archetypeKey = getArchetype(effective); // ✅ live archetype
    const archetype = archetypes[archetypeKey];

    const challengeIndex = Math.min(dayNum - 1, 6);
    const challenge = archetype.challenges[challengeIndex];

    document.getElementById('challenge-title').textContent = challenge.title;
    document.getElementById('challenge-description').textContent = challenge.description.replace(/\[NAME\]/g, name);
    document.querySelector('.challenge-badge').textContent = `Day ${dayNum} Challenge`;

    const completeBtn = document.querySelector('#challenge-page .btn-primary');
    if (challengesDone.includes(dayNum)) {
        completeBtn.textContent = 'Back to Dashboard';
        completeBtn.onclick = function() { showDashboard(); };
    } else {
        completeBtn.textContent = 'Mark Complete';
        completeBtn.onclick = function() { completeAndAdvance(dayNum); };
    }

    showPage('challenge-page');
}

function showLevelUpCard(previousKey, newKey) {
    const newArchetype = archetypes[newKey];
    const oldArchetype = archetypes[previousKey];

    // Remove any existing card
    const existing = document.getElementById('levelup-card');
    if (existing) existing.remove();

    const card = document.createElement('div');
    card.id = 'levelup-card';
    card.style.cssText = `
        position: fixed;
        top: 0; left: 0; right: 0;
        z-index: 9999;
        background: var(--bg-card, #1a1a2e);
        border-bottom: 3px solid var(--accent, #7c3aed);
        padding: 1.5rem;
        text-align: center;
        transform: translateY(-100%);
        transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
        box-shadow: 0 8px 32px rgba(0,0,0,0.4);
    `;

    card.innerHTML = `
        <div style="font-size: 2.5rem; margin-bottom: 0.5rem">${newArchetype.badge}</div>
        <div style="font-size: 0.75rem; letter-spacing: 0.15em; color: var(--accent, #7c3aed); font-weight: 700; text-transform: uppercase; margin-bottom: 0.25rem">LEVEL UP</div>
        <div style="font-size: 1.3rem; font-weight: 700; color: var(--text-primary, #fff); margin-bottom: 0.25rem">${newArchetype.title}</div>
        <div style="font-size: 0.9rem; color: var(--text-muted, #aaa);">${oldArchetype.title} → ${newArchetype.title}</div>
        <div style="font-size: 0.8rem; color: var(--text-muted, #aaa); margin-top: 0.5rem;">New challenges unlocked · Vault cards updating</div>
    `;

    document.body.appendChild(card);

    // Slide in
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            card.style.transform = 'translateY(0)';
        });
    });

    // Auto dismiss after 4 seconds
    setTimeout(() => {
        card.style.transform = 'translateY(-100%)';
        setTimeout(() => card.remove(), 500);
    }, 4000);

    // Also dismiss on tap
    card.addEventListener('click', () => {
        card.style.transform = 'translateY(-100%)';
        setTimeout(() => card.remove(), 500);
    });

    // Analytics
    if (window.va) {
        window.va('event', { name: 'level_up', data: { from: previousKey, to: newKey } });
    }
}
