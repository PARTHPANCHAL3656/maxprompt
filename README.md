# MaxPrompt
> AI Literacy & Gamified Prompt Engineering Platform

Live: https://maxprompt-blue.vercel.app  
Built by: Parth Panchal | 1st Year BTech CSE | Vadodara, India  
Stack: HTML · CSS · JS · Vercel · OpenRouter · Canvas API  
Budget: ₹0 | Build time: 3 days ~ 14+ hrs

---

## What It Does

MaxPrompt is a gamified AI literacy platform built around one core idea: the gap between how people *think* they use AI and how they *actually* use it is massive — and measurable.

**The Quiz** — 10 scenario-based behavioural questions that reveal your real AI usage patterns. Not "do you use AI?" but *how* you use it. You predict your score first. The gap between prediction and reality is the whole product.

**The Vault** — 35 prompt techniques across 5 difficulty levels, written in plain English. No academic jargon. No "Chain-of-Thought" or "Few-Shot Prompting" — just "Make AI Think Out Loud" and "Give AI a Job Title." Cards unlock as your score improves.

**The Lab** — Levelled practice missions. You write a prompt for a real scenario, an AI evaluator scores it against a hidden rubric (0–100), gives you a breakdown, and tells you the one thing to fix. You never see the correct answer — only guidance. Save your best prompts when you score 75%+.

**My Playbook** — Your personal library of prompts you built yourself. Copy any saved prompt to clipboard, open it directly in Claude, ChatGPT, or Perplexity with one click.

---

## How Scoring Works

```
Quiz Score (base)     → 0–99% from the 10-question assessment
+ Vault Bonus         → up to +14% for reading technique cards
+ Lab Bonus           → up to +20% for passing missions at 75%+
= Effective Score     → shown on dashboard, capped at 99%
```

The 99% cap is intentional. Mastery is a direction, not a destination.

### Archetypes

| Score | Archetype |
|---|---|
| 0–19% | The Prompt Borrower |
| 20–39% | The Single-Shotter |
| 40–59% | The Refiner |
| 60–69% | The Structured User |
| 70–79% | The System Thinker |
| 80–89% | The AI Architect |
| 90–99% | The AI Native |

---

## Tech Stack

- **Frontend:** Vanilla HTML, CSS, JavaScript — no frameworks
- **AI Evaluator:** OpenRouter API (Llama 3.1 8B Instruct, free tier) for Lab mission scoring
- **Storage:** localStorage — no backend, no database, no accounts
- **Hosting:** GitHub Pages / Vercel / [profreehost](https://profreehost.com))

---

## Project Structure

```
maxprompt/
│
├── README.md      ← quick overview 
├── PRODUCT.md     ← full PRD content
├── index.html              ← single page app shell
│
├── api/
│   ├── evaluate.js      ← copy this used for Vercel 
│  
├── config/
│   ├── api.example.js      ← copy this, rename to api.js, add your key
│   └── api.js              ← your actual key (gitignored, never committed)
│
├── data/
│   ├── vault.js            ← all 35 vault technique cards
│   ├── missions.js         ← all 15 lab missions with rubrics
│   ├── challenges.js       ← 7-day challenge content
│   └── archetypes.js       ← archetype messages and score bands
│
├── core/
│   ├── storage.js          ← localStorage helpers
│   ├── scoring.js          ← quiz scoring + reward % calculation
│   └── router.js           ← hash-based navigation
│
├── pages/
│   ├── quiz.js             ← quiz flow
│   ├── dashboard.js        ← dashboard render
│   ├── vault.js            ← vault render + lock/unlock logic
│   ├── lab.js              ← lab + AI evaluator + save flow
│   └── playbook.js         ← playbook render + copy/delete
│
└── styles/
    ├── base.css            ← variables, reset, typography
    ├── components.css      ← cards, buttons, bars, badges
    └── pages.css           ← page-specific layouts
```

---

## Running Locally

**1. Clone the repo**
```bash
git clone https://github.com/PARTHPANCHAL3656/maxprompt.git
cd maxprompt
```

**2. Set up your API key**
```bash
cp config/api.example.js config/api.js

const API_CONFIG = {
    key: "YOUR_OPENROUTER_KEY_HERE",
    endpoint: "https://openrouter.ai/api/v1/chat/completions",
    model: "meta-llama/llama-3.1-8b-instruct:free",
    headers: {
        "HTTP-Referer": "https://your-domain-here.com",
        "X-Title": "MaxPrompt"
    }
};
```
Open `config/api.js` and replace `YOUR_API_KEY_HERE` with your Openrouter API key.
Get a free key at [openrouter.ai](https://openrouter.ai)

**3. Open in browser**

Open `index.html` directly in your browser, or use Live Server in VS Code.

No npm install. No build step. No dependencies to install.

---

## Getting an OpenRouter API Key (Free)

1. Go to [openrouter.ai](https://openrouter.ai)
2. Sign up → Settings → API Keys → Create Key
3. Copy the key into `config/api.js`
4. Go to Settings → Privacy → enable **"Allow training on free models"** (required for free tier)

The Lab evaluator uses `meta-llama/llama-3.1-8b-instruct:free` — free tier, no cost, handles structured JSON scoring well.

The Lab evaluator uses `llama-3.1-8b-instant` — fast, free tier, handles structured JSON scoring well.

---

## Security Note

`config/api.js` is in `.gitignore` and will never be committed to this repo.

The `config/api.example.js` file shows the required structure with a placeholder key. If you fork this project, follow the setup steps above to add your own key.

**For production deployment:** Use a serverless proxy (Vercel Edge Functions or Cloudflare Workers) so the API key never reaches the browser. See the deployment section below.

---

## Deploying

### GitHub Pages (quick, frontend only)
1. Push to GitHub
2. Settings → Pages → Deploy from main branch
3. Live at `https://yourusername.github.io/maxprompt`

⚠️ API key will be visible in the browser source. Fine for testing, not for production.

### Vercel (recommended for production)
1. Import repo to [vercel.com](https://vercel.com)
2. Add `openrouter_API_KEY` in Vercel Environment Variables
3. Create `/api/evaluate.js` serverless function as proxy
4. Update fetch URL in `config/api.js` to `/api/evaluate`

This keeps your key server-side and fully hidden from the browser.

---

## The Problem This Solves

AI tools are symmetric in access. Everyone has ChatGPT. But two people using the same tool get wildly different results — not because of intelligence or the tool — because of the **cognitive interface** between brain and model.

That interface — how you structure context, define constraints, evaluate outputs, and iterate — is trainable. MaxPrompt trains it.

---

## Built By

**Parth Panchal** — 1st year CSE student, Vadodara, India.

Building in public. No gatekeeping.

[LinkedIn]((https://www.linkedin.com/in/parth-panchal-a3a309366/)) · [GitHub](https://github.com/PARTHPANCHAL3656)

---

## License

MIT — use it, learn from it, build on it.
