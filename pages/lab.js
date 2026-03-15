// Lab page functions
let currentLabCategory = 'email';
let currentMission = null;
let lastEvaluationResult = null;

function showLab() {
    const effective = getEffectiveScore().effective;
    const requiredScores = { 1: 0, 2: 20, 3: 40, 4: 60, 5: 70 };
    const container = document.getElementById('lab-missions');
    container.innerHTML = '';
    
    const filteredMissions = missions.filter(m => m.category === currentLabCategory);
    
    filteredMissions.forEach(mission => {
        const isLocked = effective < requiredScores[mission.level];
        const card = document.createElement('div');
        card.className = 'lab-mission-card' + (isLocked ? ' locked' : '');
        
        const vaultCard = vaultCards.find(v => v.id === mission.vaultCardId);
        
        card.innerHTML = `
            <span class="mission-level-badge">Level ${mission.level}</span>
            <span class="mission-card-title">${mission.title}</span>
            <p class="mission-card-scenario">${mission.scenario.substring(0, 100)}...</p>
            <span class="mission-card-technique">${vaultCard ? vaultCard.plainName : ''}</span>
        `;
        
        if (isLocked) {
            card.onclick = () => showLockedMissionMessage(mission.level);
        } else {
            card.onclick = () => renderMissionDetail(mission);
        }
        
        container.appendChild(card);
    });
    
    showPage('lab-page');
}

function renderMissionDetail(mission) {
    currentMission = mission;
    document.getElementById('mission-title').textContent = mission.title;
    document.getElementById('mission-scenario').textContent = mission.scenario;
    document.getElementById('mission-task').textContent = mission.taskDescription;
    document.getElementById('mission-hint-text').textContent = mission.hint;
    document.getElementById('mission-level-badge').textContent = 'Level ' + mission.level;
    document.getElementById('user-prompt-input').value = '';
    
    showPage('lab-mission-page');
}

// Lab category click handlers
document.getElementById('lab-categories').addEventListener('click', (e) => {
    if (e.target.classList.contains('lab-cat-btn')) {
        document.querySelectorAll('.lab-cat-btn').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        currentLabCategory = e.target.dataset.category;
        showLab();
    }
});

function showMissionDetail(mission) {
    renderMissionDetail(mission);
}

async function submitPrompt() {
    const userPrompt = document.getElementById('user-prompt-input').value.trim();
    if (!userPrompt) {
        alert('Please write a prompt first!');
        return;
    }
    
    const submitBtn = document.querySelector('#lab-mission-page .btn-primary');
    submitBtn.textContent = 'Evaluating...';
    submitBtn.disabled = true;
    
    try {
        const result = await evaluatePrompt(userPrompt, currentMission);
        lastEvaluationResult = result;
        showLabResults(result);
    } catch (error) {
        console.error('Evaluation error:', error);
        alert('Something went wrong. Please try again.');
        submitBtn.textContent = 'Evaluate My Prompt';
        submitBtn.disabled = false;
    }
}

async function evaluatePrompt(userPrompt, mission) {
    const systemPrompt = `You are a prompt quality evaluator for MaxPrompt, an AI literacy platform.
    
Your job: evaluate the user's prompt attempt for a specific challenge and return a JSON score.

MISSION CONTEXT:
Title: ${mission.title}
Scenario: ${mission.scenario}
Target Technique: The user should demonstrate: ${mission.hint}

RUBRIC (score each criterion 0 to the max points shown):
${mission.evaluatorRubric.map((r, i) => `${i+1}. ${r}`).join('\n')}

CRITICAL RULES:
- Never reveal what the "correct" prompt looks like
- Never give the user the answer — only guide them toward it
- Score honestly. A missing element scores 0, not partial credit
- Be specific in your improvement tip — name the exact missing element
- Keep tip under 25 words
- Never use academic technique names (no "Chain-of-Thought", "Few-Shot", etc.)

Return ONLY valid JSON. No preamble. No explanation. Just this exact structure:
{
  "totalScore": 0-100,
  "breakdown": {
    "criterion1": { "score": number, "max": number, "label": "short label" },
    "criterion2": { "score": number, "max": number, "label": "short label" },
    "criterion3": { "score": number, "max": number, "label": "short label" },
    "criterion4": { "score": number, "max": number, "label": "short label" }
  },
  "level": "not_there_yet" | "getting_closer" | "strong_attempt" | "excellent",
  "tip": "One specific thing to add or change in under 25 words.",
  "missingElement": "The single most important missing element in one phrase."
}`;

    const response = await fetch("/api/evaluate", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            systemPrompt: systemPrompt,
            messages: [
                { role: "user", content: `Evaluate this prompt attempt:\n\n"${userPrompt}"` }
            ]
        })
    });

    const data = await response.json();
    
    if (data.error) {
        throw new Error(data.error.message);
    }
    
    const text = data.choices[0].message.content
        .replace(/```json\n?/g, "")
        .replace(/```\n?/g, "")
        .trim();
    
    return JSON.parse(text);
}

function showLabResults(result) {
    // Record mission result for rewards
    recordMissionResult(currentMission.id, result.totalScore);
    
    document.getElementById('result-score').textContent = result.totalScore;
    
    const levelEl = document.getElementById('result-level');
    levelEl.className = 'score-level ' + result.level;
    const levelLabels = {
        not_there_yet: 'Keep Practicing',
        getting_closer: 'Getting Closer',
        strong_attempt: 'Strong Attempt!',
        excellent: 'Excellent!'
    };
    levelEl.textContent = levelLabels[result.level];
    
    const breakdownEl = document.getElementById('score-breakdown');
    breakdownEl.innerHTML = '';
    
    Object.entries(result.breakdown).forEach(([key, item]) => {
        const percentage = (item.score / item.max) * 100;
        breakdownEl.innerHTML += `
            <div class="breakdown-item">
                <div class="breakdown-label">
                    <span>${item.label}</span>
                    <span>${item.score}/${item.max}</span>
                </div>
                <div class="breakdown-bar">
                    <div class="breakdown-fill" style="width: ${percentage}%"></div>
                </div>
            </div>
        `;
    });
    
    document.getElementById('result-missing').textContent = result.missingElement;
    document.getElementById('result-tip').textContent = result.tip;
    
    const saveBtn = document.getElementById('save-prompt-btn');
    if (result.totalScore >= 70) {
        saveBtn.disabled = false;
        saveBtn.textContent = 'Save to Playbook';
    } else {
        saveBtn.disabled = true;
        saveBtn.textContent = 'Improve your prompt before saving';
    }
    
    showPage('lab-results-page');
    
    const submitBtn = document.querySelector('#lab-mission-page .btn-primary');
    submitBtn.textContent = 'Evaluate My Prompt';
    submitBtn.disabled = false;
}

function retryMission() {
    showMissionDetail(currentMission);
}

async function saveToPlaybook() {
  if (!lastEvaluationResult || lastEvaluationResult.totalScore < 70) return;
  
  const playbook = JSON.parse(getStorage('mx_playbook') || '[]');
  const userPrompt = document.getElementById('user-prompt-input').value;
  const vaultCard = vaultCards.find(v => v.id === currentMission.vaultCardId);
  
  const savedPrompt = {
    id: 'PLB_' + Date.now(),
    missionId: currentMission.id,
    missionTitle: currentMission.title,
    category: currentMission.category,
    prompt: userPrompt,
    score: lastEvaluationResult.totalScore,
    savedAt: new Date().toISOString().split('T')[0],
    vaultCardId: currentMission.vaultCardId,
    technique: vaultCard ? vaultCard.plainName : ''
  };
  
  playbook.push(savedPrompt);
  setStorage('mx_playbook', JSON.stringify(playbook));
  
  // Also save structured row to Supabase
  const userId = getUserId();
  if (userId) {
    await _supabase.from('playbook_prompts').insert({
      id: savedPrompt.id,
      user_id: userId,
      mission_id: savedPrompt.missionId,
      mission_title: savedPrompt.missionTitle,
      category: savedPrompt.category,
      prompt: savedPrompt.prompt,
      score: savedPrompt.score,
      technique: savedPrompt.technique,
      saved_at: savedPrompt.savedAt,
      vault_card_id: savedPrompt.vaultCardId
    });
  }
  
  showRewardToast('Saved! Check dashboard for updated Lab bonus →', 3000);
  setTimeout(() => navigateTo('playbook'), 1500);
}

function copyCurrentPrompt() {
    const promptText = document.getElementById('user-prompt-input').value;
    if (!promptText.trim()) {
        showRewardToast('Write a prompt first!', 1500);
        return;
    }
    
    navigator.clipboard.writeText(promptText).then(() => {
        showRewardToast('Prompt copied!', 1500);
    }).catch(() => {
        showRewardToast('Failed to copy', 1500);
    });
}
