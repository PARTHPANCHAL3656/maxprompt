// Vault page functions
let currentVaultFilter = 'all';

function showVault() {
    const effective = getEffectiveScore().effective;
    const container = document.getElementById('vault-cards');
    container.innerHTML = '';
    
    const filteredCards = currentVaultFilter === 'all' 
        ? vaultCards 
        : vaultCards.filter(card => card.useCases.includes(currentVaultFilter));
    
    const requiredScores = [0, 0, 20, 40, 60, 70];
    filteredCards.forEach(card => {
        const isLocked = effective < requiredScores[card.level];
        const cardEl = document.createElement('div');
        cardEl.className = 'vault-card' + (isLocked ? ' locked' : '');
        
        let useCaseBadges = card.useCases.map(uc => 
            `<span class="vault-card-usecase">${uc}</span>`
        ).join('');
        
        cardEl.innerHTML = `
            <div class="lock-overlay">
                <span>🔒</span>
                <p>Reach Level ${card.level} to unlock</p>
            </div>
            <div class="vault-card-level">Level ${card.level}</div>
            <div class="vault-card-title">${card.plainName}</div>
            <div class="vault-card-tagline">${card.tagline}</div>
            <div class="vault-card-footer">${useCaseBadges}</div>
        `;
        
        if (isLocked) {
            cardEl.onclick = () => showLockedMessage(card.level);
        } else {
            cardEl.onclick = () => showVaultCardDetail(card);
        }
        
        container.appendChild(cardEl);
    });
    
    showPage('vault-page');
}

function showVaultCardDetail(card) {
    const existing = document.querySelector('.modal');
    if (existing) existing.remove();
    
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 600px; max-height: 90vh; overflow-y: auto;">
            <button class="btn-text" onclick="this.closest('.modal').remove()" style="margin-bottom: 1rem;">← Back</button>
            <span class="vault-card-level" style="display: inline-block; margin-bottom: 0.5rem;">Level ${card.level}</span>
            <h2 style="font-size: 1.5rem; margin-bottom: 0.5rem;">${card.plainName}</h2>
            <p style="color: var(--text-secondary); margin-bottom: 1.5rem;">${card.tagline}</p>
            
            <div class="archetype-section">
                <h3>What it is</h3>
                <p>${card.whatItIs}</p>
            </div>
            <div class="archetype-section">
                <h3>Why it works</h3>
                <p>${card.whyItWorks}</p>
            </div>
            <div class="archetype-section">
                <h3>When to use</h3>
                <p>${card.whenToUse}</p>
            </div>
            <div class="archetype-section">
                <h3>Bad Example</h3>
                <p style="font-style: italic; color: var(--danger);">${card.badExample}</p>
            </div>
            <div class="archetype-section highlight">
                <h3>Good Example</h3>
                <p style="font-style: italic; color: var(--secondary);">${card.goodExample}</p>
            </div>
            <div class="archetype-section">
                <h3>Try it</h3>
                <p>${card.tryIt}</p>
            </div>
            <div class="card-actions" style="display: flex; gap: 1rem; margin-top: 1.5rem;">
                <button class="btn-secondary" onclick="this.closest('.modal').remove()" style="flex: 1;">Back</button>
                <button class="btn-primary got-it-btn" onclick="const modal = this.closest('.modal'); handleGotIt('${card.id}'); modal.remove();" style="flex: 1;">
                    Got it — Try it in The Lab →
                </button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

// Vault tab click handlers
document.getElementById('vault-tabs').addEventListener('click', (e) => {
    if (e.target.classList.contains('vault-tab')) {
        document.querySelectorAll('.vault-tab').forEach(t => t.classList.remove('active'));
        e.target.classList.add('active');
        currentVaultFilter = e.target.dataset.filter;
        showVault();
    }
});
