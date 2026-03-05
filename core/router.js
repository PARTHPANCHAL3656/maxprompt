function navigateTo(section) {
    window.location.hash = section;
}

function renderSection(section) {
    const score = getStorage('mx_score');
    
    document.querySelectorAll('.page').forEach(p => p.classList.add('hidden'));
    document.getElementById('main-nav').classList.add('hidden');
    
    if (!score) {
        showPage('landing-page');
        return;
    }
    
    document.getElementById('main-nav').classList.remove('hidden');
    
    document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
    const activeNav = document.getElementById('nav-' + section);
    if (activeNav) activeNav.classList.add('active');
    
    switch(section) {
        case 'dashboard':
            showDashboard();
            break;
        case 'vault':
            showVault();
            break;
        case 'lab':
            showLab();
            break;
        case 'lab-mission':
            showLab();
            document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
            document.getElementById('nav-lab').classList.add('active');
            if (currentMission) {
                setTimeout(() => renderMissionDetail(currentMission), 100);
            }
            break;
        case 'playbook':
            showPlaybook();
            break;
        default:
            showDashboard();
    }
}

window.addEventListener('hashchange', () => {
    const section = window.location.hash.slice(1) || 'dashboard';
    renderSection(section);
});

if (window.location.hash) {
    const initialSection = window.location.hash.slice(1);
    setTimeout(() => renderSection(initialSection), 0);
}
