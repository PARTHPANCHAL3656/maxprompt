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

    if (dayNum > currentDay) {
        showRewardToast(`Complete Day ${currentDay} first!`, 2000);
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
    const { effective } = getEffectiveScore();
    const name = getStorage('mx_username');

    const existing = document.getElementById('levelup-overlay');
    if (existing) existing.remove();

    const overlay = document.createElement('div');
    overlay.id = 'levelup-overlay';
    overlay.style.cssText = `
        position: fixed;
        inset: 0;
        z-index: 9999;
        background: rgba(0,0,0,0.75);
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 1rem;
        opacity: 0;
        transition: opacity 0.4s ease;
    `;

    overlay.innerHTML = `
        <div id="levelup-card" style="
            background: var(--bg-card, #1a1a2e);
            border: 2px solid var(--accent, #7c3aed);
            border-radius: 1.25rem;
            padding: 2rem 1.75rem 1.5rem;
            max-width: 360px;
            width: 100%;
            text-align: center;
            box-shadow: 0 24px 64px rgba(0,0,0,0.5);
            transform: translateY(24px);
            transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
        ">
            <div style="font-size: 3.5rem; margin-bottom: 0.75rem; line-height:1">${newArchetype.badge}</div>

            <div style="
                font-size: 0.7rem;
                letter-spacing: 0.18em;
                color: var(--accent, #7c3aed);
                font-weight: 800;
                text-transform: uppercase;
                margin-bottom: 0.5rem;
            ">⚡ Level Up</div>

            <div style="
                font-size: 1.5rem;
                font-weight: 800;
                color: var(--text-primary, #fff);
                margin-bottom: 0.25rem;
            ">${newArchetype.title}</div>

            <div style="
                font-size: 0.85rem;
                color: var(--text-muted, #aaa);
                margin-bottom: 0.25rem;
            ">${oldArchetype.title} → ${newArchetype.title}</div>

            <div style="
                font-size: 0.8rem;
                color: var(--accent, #7c3aed);
                margin-bottom: 1.5rem;
                opacity: 0.85;
            ">New challenges + vault cards unlocked 🔓</div>

            <button id="levelup-download-btn" style="
                width: 100%;
                padding: 0.75rem;
                background: var(--accent, #7c3aed);
                color: #fff;
                border: none;
                border-radius: 0.75rem;
                font-size: 0.95rem;
                font-weight: 700;
                cursor: pointer;
                margin-bottom: 0.65rem;
                letter-spacing: 0.02em;
            ">📸 Download Achievement Card</button>

            <button id="levelup-close-btn" style="
                width: 100%;
                padding: 0.65rem;
                background: transparent;
                color: var(--text-muted, #aaa);
                border: 1px solid var(--border, #333);
                border-radius: 0.75rem;
                font-size: 0.875rem;
                cursor: pointer;
            ">Close</button>
        </div>
    `;

    document.body.appendChild(overlay);

    // Animate in
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            overlay.style.opacity = '1';
            document.getElementById('levelup-card').style.transform = 'translateY(0)';
        });
    });

    // Download certificate
    document.getElementById('levelup-download-btn').onclick = () => {
        downloadCertificate(name, newArchetype, oldArchetype, effective);
    };

    // Close with fun confirmation
    document.getElementById('levelup-close-btn').onclick = () => {
        showCloseConfirm(overlay, newArchetype);
    };

    if (window.va) {
        window.va('event', { name: 'level_up', data: { from: previousKey, to: newKey } });
    }
}

function showCloseConfirm(overlay, newArchetype) {
    const existing = document.getElementById('close-confirm');
    if (existing) existing.remove();

    const confirm = document.createElement('div');
    confirm.id = 'close-confirm';
    confirm.style.cssText = `
        position: fixed;
        inset: 0;
        z-index: 10000;
        background: rgba(0,0,0,0.6);
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 1rem;
    `;

    confirm.innerHTML = `
        <div style="
            background: var(--bg-card, #1a1a2e);
            border: 1px solid var(--border, #333);
            border-radius: 1rem;
            padding: 1.75rem 1.5rem;
            max-width: 320px;
            width: 100%;
            text-align: center;
        ">
            <div style="font-size: 1.75rem; margin-bottom: 0.75rem">📲</div>
            <div style="font-size: 1rem; font-weight: 700; color: var(--text-primary,#fff); margin-bottom: 0.5rem">
                Before you go —
            </div>
            <div style="font-size: 0.875rem; color: var(--text-muted,#aaa); margin-bottom: 1.25rem; line-height: 1.5">
                You just levelled up to <strong style="color:var(--accent,#7c3aed)">${newArchetype.title}</strong>.<br>
                Most people never make it here.<br>
                Worth sharing, no?
            </div>
            <button id="confirm-download" style="
                width: 100%;
                padding: 0.7rem;
                background: var(--accent, #7c3aed);
                color: #fff;
                border: none;
                border-radius: 0.75rem;
                font-size: 0.9rem;
                font-weight: 700;
                cursor: pointer;
                margin-bottom: 0.5rem;
            ">📸 Download First, Then Close</button>
            <button id="confirm-close" style="
                width: 100%;
                padding: 0.6rem;
                background: transparent;
                color: var(--text-muted,#aaa);
                border: 1px solid var(--border,#333);
                border-radius: 0.75rem;
                font-size: 0.85rem;
                cursor: pointer;
            ">Nah, just close it</button>
        </div>
    `;

    document.body.appendChild(confirm);

    document.getElementById('confirm-download').onclick = () => {
        confirm.remove();
        document.getElementById('levelup-download-btn').click();
    };

    document.getElementById('confirm-close').onclick = () => {
        confirm.remove();
        overlay.style.opacity = '0';
        setTimeout(() => overlay.remove(), 400);
    };
}
// v2 - New Celebration !!
function downloadCertificate(name, archetype, oldArchetype, score) {
    const canvas = document.createElement('canvas');
    canvas.width = 1080;
    canvas.height = 1080;
    const ctx = canvas.getContext('2d');

    // Background
    ctx.fillStyle = '#0d0d1a';
    ctx.fillRect(0, 0, 1080, 1080);

    // Outer border
    ctx.strokeStyle = '#7c3aed';
    ctx.lineWidth = 6;
    ctx.strokeRect(30, 30, 1020, 1020);

    // Inner border
    ctx.strokeStyle = '#7c3aed';
    ctx.lineWidth = 1;
    ctx.globalAlpha = 0.3;
    ctx.strokeRect(46, 46, 988, 988);
    ctx.globalAlpha = 1;

    // Top label
    ctx.fillStyle = '#7c3aed';
    ctx.font = 'bold 28px Arial';
    ctx.textAlign = 'center';
    ctx.letterSpacing = '8px';
    ctx.fillText('MAXPROMPT', 540, 110);

    ctx.fillStyle = '#aaaaaa';
    ctx.font = '20px Arial';
    ctx.fillText('ACHIEVEMENT UNLOCKED', 540, 148);

    // Divider
    ctx.strokeStyle = '#7c3aed';
    ctx.globalAlpha = 0.4;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(200, 170);
    ctx.lineTo(880, 170);
    ctx.stroke();
    ctx.globalAlpha = 1;

    // Badge emoji — smaller, contained
    ctx.font = '90px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(archetype.badge, 540, 340);

    // LEVELED UP — big and bold
    ctx.fillStyle = '#7c3aed';
    ctx.font = 'bold 52px Arial';
    ctx.letterSpacing = '4px';
    ctx.fillText('⚡  LEVELED UP !', 540, 420);

    // New title
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 68px Georgia';
    ctx.fillText(archetype.title, 540, 510);

    // Transition
    ctx.fillStyle = '#aaaaaa';
    ctx.font = '26px Arial';
    ctx.fillText(`${oldArchetype.title}  →  ${archetype.title}`, 540, 570);
    // Score
    ctx.fillStyle = '#7c3aed';
    ctx.font = 'bold 40px Georgia';
    ctx.fillText(`Effective Score: ${score}%`, 540, 690);

    // Name
    ctx.fillStyle = '#ffffff';
    ctx.font = '30px Arial';
    ctx.fillText(`Achieved by ${name}`, 540, 750);

    // Date
    const today = new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
    ctx.fillStyle = '#666666';
    ctx.font = '22px Arial';
    ctx.fillText(today, 540, 800);

    // Divider
    ctx.strokeStyle = '#7c3aed';
    ctx.globalAlpha = 0.4;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(200, 840);
    ctx.lineTo(880, 840);
    ctx.stroke();
    ctx.globalAlpha = 1;

    // Bottom CTA
    ctx.fillStyle = '#aaaaaa';
    ctx.font = '22px Arial';
    ctx.fillText('maxprompt-blue.vercel.app', 540, 900);

    ctx.fillStyle = '#555555';
    ctx.font = '18px Arial';
    ctx.fillText('Find out your AI skill level — free, no login', 540, 935);

    // Download
    const link = document.createElement('a');
    link.download = `MaxPrompt_${archetype.title.replace(/\s/g, '_')}_${name}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
}
