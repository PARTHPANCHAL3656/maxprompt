// Playbook page functions
let currentPlaybookFilter = 'all';

function showPlaybook() {
    const playbook = JSON.parse(getStorage('mx_playbook') || '[]');
    const container = document.getElementById('playbook-cards');
    const emptyState = document.getElementById('playbook-empty');
    const title = document.getElementById('playbook-title');
    const subtitle = document.getElementById('playbook-subtitle');
    
    title.textContent = getStorage('mx_username') + "'s Playbook";
    subtitle.textContent = playbook.length + ' prompts saved';
    
    container.innerHTML = '';
    
    const filteredPlaybook = currentPlaybookFilter === 'all'
        ? playbook
        : playbook.filter(p => p.category === currentPlaybookFilter);
    
    if (filteredPlaybook.length === 0) {
        emptyState.style.display = 'block';
        container.style.display = 'none';
    } else {
        emptyState.style.display = 'none';
        container.style.display = 'grid';
        
        filteredPlaybook.forEach(prompt => {
            const card = document.createElement('div');
            card.className = 'playbook-card';
            
            const categoryLabels = {
                email: 'Email',
                content: 'Content',
                research: 'Research',
                'problem-solving': 'Problem Solving',
                decisions: 'Decisions'
            };
            
            card.innerHTML = `
                <div class="playbook-card-header">
                    <span class="playbook-card-category">${categoryLabels[prompt.category] || prompt.category}</span>
                    <span class="playbook-card-score">Score: ${prompt.score}/100</span>
                </div>
                <div class="playbook-card-title">${prompt.missionTitle}</div>
                <div class="playbook-card-technique">${prompt.technique}</div>
                <div class="playbook-card-preview">"${prompt.prompt.substring(0, 100)}..."</div>
                <div class="playbook-card-actions">
                    <button class="btn-copy" onclick="copyPrompt('${prompt.prompt.replace(/'/g, "\\'")}')">📋 Copy</button>
                    <a href="https://claude.ai" target="_blank" class="btn-claude" onclick="copyPrompt('${prompt.prompt.replace(/'/g, "\\'")}'); alert('Prompt copied! Paste it in Claude.')">🔗 Try in Claude</a>
                    <button class="btn-delete" onclick="deletePrompt('${prompt.id}')">🗑</button>
                </div>
            `;
            
            container.appendChild(card);
        });
    }
    
    showPage('playbook-page');
}

// Playbook filter click handlers
document.getElementById('playbook-filters').addEventListener('click', (e) => {
    if (e.target.classList.contains('playbook-filter')) {
        document.querySelectorAll('.playbook-filter').forEach(f => f.classList.remove('active'));
        e.target.classList.add('active');
        currentPlaybookFilter = e.target.dataset.filter;
        showPlaybook();
    }
});

function copyPrompt(promptText) {
    navigator.clipboard.writeText(promptText);
}

function deletePrompt(promptId) {
    if (!confirm('Delete this saved prompt?')) return;
    
    let playbook = JSON.parse(getStorage('mx_playbook') || '[]');
    playbook = playbook.filter(p => p.id !== promptId);
    setStorage('mx_playbook', JSON.stringify(playbook));
    showPlaybook();
}
