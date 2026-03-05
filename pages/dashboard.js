// Dashboard page functions
function showDashboard() {
    const name = getStorage('mx_username');
    const { quizScore, vaultBonus, missionBonus, effective } = getEffectiveScore();
    const prediction = parseInt(getStorage('mx_prediction'));
    const archetypeKey = getStorage('mx_archetype');
    const archetype = archetypes[archetypeKey];
    const breakdown = JSON.parse(getStorage('mx_breakdown'));
    const challengesDone = JSON.parse(getStorage('mx_challenges_done') || '[]');
    const currentDay = parseInt(getStorage('mx_day') || 1);
    const quizDate = getStorage('mx_quiz_date');
    
    document.getElementById('dashboard-greeting').textContent = `Welcome back, ${name}`;
    document.getElementById('dashboard-archetype-badge').textContent = archetype.badge;
    document.getElementById('dashboard-score').textContent = effective + '%';
    document.getElementById('dashboard-prediction').textContent = prediction + '%';
    
    // Add score breakdown element if not exists
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
    
    const score = parseInt(getStorage('mx_score'));
    const name = getStorage('mx_username');
    const archetypeKey = getArchetype(score);
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
