// function getStorage(key) {
//     return localStorage.getItem(key);
// }

// function setStorage(key, value) {
//     localStorage.setItem(key, value);
// }

// function clearAllStorage() {
//     localStorage.clear();
// }

// core/storage.js — NEW VERSION - 2
const SUPABASE_URL = 'https://jeuwbynunjqfymyxabpq.supabase.co';
const SUPABASE_ANON = 'sb_publishable_VFLM0lkKdHY9OlL1BycdAw_tOL2svcG';

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON);
let _session = null;

async function initSupabase() {
  const { data } = await supabase.auth.getSession();
  if (data.session) {
    _session = data.session;
  } else {
    const { data: anon } = await supabase.auth.signInAnonymously();
    _session = anon.session;
  }
  return _session;
}

function getUserId() {
  return _session?.user?.id || null;
}

// ─── localStorage stays as fast local cache ────────────────────────────────
function getStorage(key) {
  return localStorage.getItem(key);
}

function setStorage(key, value) {
  localStorage.setItem(key, value);
  _syncKey(key, value);  // background sync — non-blocking
}

function clearAllStorage() {
  localStorage.clear();
}

// ─── Supabase sync ─────────────────────────────────────────────────────────
async function _syncKey(key, value) {
  const userId = getUserId();
  if (!userId) return;
  await supabase
    .from('user_state')
    .upsert(
      { user_id: userId, key, value: String(value), updated_at: new Date().toISOString() },
      { onConflict: 'user_id,key' }
    );
}

async function loadFromSupabase() {
  const userId = getUserId();
  if (!userId) return;
  const { data } = await supabase
    .from('user_state')
    .select('key, value')
    .eq('user_id', userId);
  if (data && data.length > 0) {
    data.forEach(({ key, value }) => localStorage.setItem(key, value));
  }
}

// ─── Recovery code ─────────────────────────────────────────────────────────
function _generateCode() {
  // Removes confusing chars: 0 O 1 I L
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 8; i++) {
    if (i === 4) code += '-';
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code; // format: ABCD-1234
}

async function createRecoveryCode() {
  const userId = getUserId();
  if (!userId) return null;

  // Return existing code if they already have one
  const { data: existing } = await supabase
    .from('recovery_codes')
    .select('code')
    .eq('user_id', userId)
    .maybeSingle();

  if (existing?.code) return existing.code;

  const code = _generateCode();
  const { error } = await supabase
    .from('recovery_codes')
    .insert({ code, user_id: userId });

  return error ? null : code;
}

async function restoreFromCode(rawInput) {
  // Clean input — accept with or without dash
  const code = rawInput.trim().toUpperCase().replace(/[^A-Z0-9]/g, '');
  const formatted = code.length === 8 ? code.slice(0, 4) + '-' + code.slice(4) : rawInput.trim().toUpperCase();

  const { data, error } = await supabase
    .from('recovery_codes')
    .select('user_id')
    .eq('code', formatted)
    .maybeSingle();

  if (error || !data) {
    return { success: false, message: 'Code not found. Double-check and try again.' };
  }

  const targetUserId = data.user_id;

  // Load their saved state
  const { data: stateData } = await supabase
    .from('user_state')
    .select('key, value')
    .eq('user_id', targetUserId);

  if (!stateData || stateData.length === 0) {
    return { success: false, message: 'No saved data for this code.' };
  }

  // Wipe current local state and load theirs
  localStorage.clear();
  stateData.forEach(({ key, value }) => localStorage.setItem(key, value));

  // Copy their rows into current anonymous session for future syncs
  const currentUserId = getUserId();
  if (currentUserId && currentUserId !== targetUserId) {
    for (const { key, value } of stateData) {
      await supabase
        .from('user_state')
        .upsert(
          { user_id: currentUserId, key, value },
          { onConflict: 'user_id,key' }
        );
    }
  }

  return { success: true };
}
