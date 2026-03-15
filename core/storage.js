// function getStorage(key) {
//     return localStorage.getItem(key);
// }

// function setStorage(key, value) {
//     localStorage.setItem(key, value);
// }

// function clearAllStorage() {
//     localStorage.clear();
// }

// core/storage.js — NEW VERSION
const SUPABASE_URL = 'https://jeuwbynunjqfymyxabpq.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_VFLM0lkKdHY9OlL1BycdAw_tOL2svcG';

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

let _session = null;

// Call this once on app start — in initApp()
async function initSupabase() {
  const { data } = await supabase.auth.getSession();
  
  if (data.session) {
    _session = data.session;
  } else {
    // Anonymous sign in — no email, no friction
    const { data: anonData } = await supabase.auth.signInAnonymously();
    _session = anonData.session;
  }
  
  return _session;
}

function getUserId() {
  return _session?.user?.id || null;
}

// Keep localStorage as fast local cache — Supabase as source of truth
function getStorage(key) {
  return localStorage.getItem(key);
}

function setStorage(key, value) {
  localStorage.setItem(key, value);
  // Sync to Supabase in background (non-blocking)
  syncToSupabase(key, value);
}

async function syncToSupabase(key, value) {
  const userId = getUserId();
  if (!userId) return;
  
  await supabase
    .from('user_state')
    .upsert({ user_id: userId, key, value: String(value) }, 
             { onConflict: 'user_id,key' });
}

async function loadFromSupabase() {
  const userId = getUserId();
  if (!userId) return;
  
  const { data } = await supabase
    .from('user_state')
    .select('key, value')
    .eq('user_id', userId);
  
  if (data) {
    data.forEach(({ key, value }) => {
      localStorage.setItem(key, value); // hydrate local cache
    });
  }
}

function clearAllStorage() {
  localStorage.clear();
}
