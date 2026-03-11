# MaxPrompt — Product Requirements Document

> **Version:** 1.0 | **Date:** March 2026 | **Author:** Parth Panchal | **Status:** Live — V2 Shipped

| Field | Detail |
|---|---|
| Live URL | https://maxprompt-blue.vercel.app |
| GitHub | https://github.com/PARTHPANCHAL3656/maxprompt |
| Stack | HTML · CSS · JavaScript · Vercel · OpenRouter · Canvas API |
| Budget | ₹0 |
| Build Time | 3 days (~16 focused hours) |

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Problem Statement](#2-problem-statement)
3. [Product Goals & Success Metrics](#3-product-goals--success-metrics)
4. [Feature Specifications](#4-feature-specifications)
5. [Technical Architecture](#5-technical-architecture)
6. [User Flow](#6-user-flow)
7. [Business Model](#7-business-model)
8. [Roadmap](#8-roadmap)
9. [Bug History](#9-bug-history)
10. [Appendix](#10-appendix)

---

## 1. Executive Summary

MaxPrompt is a free, gamified AI literacy platform that measures how well users actually use AI — not how well they think they do. The product closes the gap between perceived and real AI skill through a behavioural quiz, a research-backed technique vault, an AI-evaluated practice lab, and a personal prompt playbook.

Built solo in 3 days with zero budget by a first-year BTech CSE student. Live, deployed, and tracking real users with Vercel Analytics. Performance score: **100/100 on Vercel Speed Insights.**

### 1.1 The Core Insight

The Dunning-Kruger effect is acutely visible in AI usage. People who use AI least are most confident about their skill. The average user self-reports their AI proficiency at 70%+ but scores below 50% on a behavioural assessment. MaxPrompt is built around this gap.

### 1.2 One-Line Pitch

> *"A mirror for your AI skills — and a gym to improve them."*

---

## 2. Problem Statement

### 2.1 The Problem

There is no reliable way for everyday AI users to measure their actual prompt engineering skill. Existing resources — YouTube tutorials, blog posts, Coursera courses — teach what prompting is but never evaluate whether the user can actually do it. The feedback loop is missing.

| Problem | Impact | Current "Solution" |
|---|---|---|
| Users overestimate their AI skill | Poor AI outputs, wasted time, false confidence | No measurement tool exists |
| Learning without practice is ineffective | Users read techniques but never apply them | YouTube / blog content only |
| No personalised feedback on prompts | Users don't know why their prompts fail | Manual trial and error |
| No progression system to maintain habit | Drop-off after first session | No gamification layer |

### 2.2 Target Users

- Knowledge workers who use ChatGPT/Claude daily but feel their outputs could be better
- Students learning AI tools who want to go beyond surface-level usage
- Developers and builders who want to sharpen their prompting workflow
- Anyone who has watched a prompting tutorial and wondered if they actually learned anything

---

## 3. Product Goals & Success Metrics

### 3.1 Primary Goals

- Give users an accurate, honest measurement of their real AI skill level
- Teach prompt techniques through use, not just reading
- Create a habit loop that compounds skill over time
- Keep zero barrier to entry — no login, no download, no paywall

### 3.2 Success Metrics

| Metric | Current | Target (90 days) |
|---|---|---|
| Unique visitors | 32 (pre-launch) | 10,000 |
| Quiz completion rate | — | >60% |
| Lab mission pass rate (75%+) | — | >40% |
| Users reaching Level 3+ | — | >25% |
| Certificate downloads | — | >500 |
| Bounce rate | 69% | <45% |
| Vercel RES Score | 100/100 | Maintain 100 |

---

## 4. Feature Specifications

### 4.1 Behavioural Quiz

The quiz is the entry point and the core hook. Designed around human psychology — specifically to prevent users from gaming it by selecting the "obviously correct" option.

**Design Principles**
- All 4 options on every question are written to appear equally reasonable
- Questions test behaviour, not knowledge — what the user actually does, not what they know
- Users predict their score before Question 1 — this delta is the core emotional moment
- 10 questions across 5 weighted categories

**Scoring Categories**

| Category | Questions | Weight |
|---|---|---|
| Context-Setting | Q1, Q2 | 25% |
| Iteration | Q3, Q4 | 25% |
| Task Decomposition | Q5, Q6 | 20% |
| Output Evaluation | Q7, Q8 | 20% |
| Workflow Thinking | Q9, Q10 | 10% |

**7 Archetypes**

| Score Range | Archetype |
|---|---|
| 0–19% | The Prompt Borrower |
| 20–39% | The Single-Shotter |
| 40–59% | The Refiner |
| 60–69% | The Structured User |
| 70–79% | The System Thinker |
| 80–89% | The AI Architect |
| 90–99% | The AI Native |

---

### 4.2 The Vault

35 prompt technique cards across 5 locked levels. Every card derived from real prompt engineering research and rewritten in plain English. Zero academic jargon.

**Card Structure**
- **Title** — Plain English technique name (not academic terminology)
- **What It Is** — 2-3 sentence explanation
- **Why It Works** — The mechanism behind the technique
- **When To Use** — Specific use cases
- **Bad Example** — Explicitly shows the wrong approach
- **Good Example** — Shows the correct implementation
- **Try It** — One concrete action to do right now

**Locking System**

| Vault Level | Unlocks At | Cards |
|---|---|---|
| Level 1 | 0% — available immediately | 7 cards |
| Level 2 | 20% effective score | 7 cards |
| Level 3 | 40% effective score | 7 cards |
| Level 4 | 60% effective score | 7 cards |
| Level 5 | 70% effective score | 7 cards |

**Vault Bonus System**

Reading cards earns bonus points added to the effective score:
- Level 1–2: +2% per level completed
- Level 3–4: +3% per level completed
- Level 5: +4% when fully completed
- **Maximum vault bonus: +14%**

**Got It → Lab Flow**

Clicking "Got It — Try it in The Lab" immediately navigates to a matching Lab mission at the same level. Transition is instant with zero page flash — vault page hidden synchronously before hash updates.

---

### 4.3 The Lab

The Lab is where users apply what they learn. AI evaluates actual prompt quality, not self-reported understanding.

**Mission Flow**
1. User given a real-world scenario and a specific task
2. A hint shown — one strategic insight, not the answer
3. User writes their prompt in the text area
4. Copy button available mid-session for useful AI outputs
5. "Evaluate My Prompt" sends prompt to AI evaluator
6. AI scores against a hidden rubric across 4 specific criteria
7. Score below 75%: cannot save. Must retry or improve.
8. Score 75%+: can save to Playbook

**AI Evaluator**

| Detail | Specification |
|---|---|
| API | OpenRouter (free tier) |
| Proxy | Vercel Edge Function |
| Key security | Environment variable — never exposed to browser |
| Fallback chain | Qwen 2.5 7B → Llama 3.3 70B → Mistral 7B → Gemma 3 4B → Phi-3 Mini |
| Score output | 0–100 with 4-criterion breakdown |
| Feedback | Missing element + specific tip (25 words max) |
| Save threshold | 75% minimum to save to Playbook |

**Mission Bonus System**

| Level | Bonus |
|---|---|
| Level 1 | +2% |
| Level 2 | +3% |
| Level 3 | +4% |
| Level 4 | +5% |
| Level 5 | +6% |
| **Maximum lab bonus** | **+20%** |

---

### 4.4 The Playbook

Personal prompt library. Every prompt saved from the Lab stored here, categorised by type, one-click launch in Claude, ChatGPT, or Perplexity.

**Features**
- Categories: Email, Content, Research, Problem Solving, Decisions
- Score displayed on each saved prompt card
- Copy button — copies prompt text to clipboard
- Try in Claude / ChatGPT / Perplexity / Poe / Arena — opens AI tool with prompt pre-loaded
- Delete prompt with one tap

---

### 4.5 Gamification & Level-Up System

Effective score recalculates live every dashboard load. Never frozen at quiz time. Users progress continuously without retaking the quiz.

**Effective Score Formula**

```
Effective Score = Quiz Base Score + Vault Bonus (max +14%) + Lab Bonus (max +20%)
```

**Level-Up Detection**
- Every dashboard load compares live archetype to stored archetype
- If different: celebration card animates in as overlay
- 7-day challenges reset to new archetype's personalised set
- Vault level threshold crossed: new cards unlock automatically
- User prompted to download achievement certificate before closing

**7-Day Challenges**

Each archetype has a unique set of 7 daily challenges. A Prompt Borrower (0–19%) receives entirely different challenges than an AI Native (90–99%). Challenges reset on level-up — always appropriate to current skill level.

---

### 4.6 Achievement Certificates

On level-up, users download a 1080×1080 PNG certificate generated in the browser using Canvas API. No server. No external service. Zero cost.

**Certificate Contents**
- MAXPROMPT header + ACHIEVEMENT UNLOCKED label
- Archetype badge emoji
- LEVELED UP ! in bold
- New archetype title
- Transition: Old Title → New Title
- Effective score percentage
- User's name (from localStorage)
- Date (Indian locale format)
- Site URL and tagline

---

## 5. Technical Architecture

### 5.1 Stack Overview

| Layer | Technology | Reason |
|---|---|---|
| Frontend | Vanilla HTML, CSS, JavaScript | Zero framework dependency, fast load, full control |
| Routing | Hash-based SPA router | Single file deployment, no server-side routing needed |
| State | localStorage | No backend, no accounts, instant persistence |
| AI API | OpenRouter (free tier) | Access to multiple free models with one API key |
| API Proxy | Vercel Edge Function | Keeps API key server-side, never exposed to browser |
| Deployment | Vercel | Auto-deploy from GitHub, analytics, speed insights, edge network |
| Certificates | Canvas API | Browser-native, zero server cost, instant download |
| Analytics | Vercel Analytics + Speed Insights | Real user data, custom events, Core Web Vitals |

### 5.2 File Architecture

```
maxprompt/
├── index.html              # Single page shell — scripts in dependency order
├── api/
│   └── evaluate.js         # Vercel serverless proxy — 5-model fallback, env key
├── core/
│   ├── storage.js          # localStorage get/set/clear wrappers
│   ├── scoring.js          # Score calc, archetype logic, bonus system, toasts
│   └── router.js           # Hash-based router — MUST load last
├── pages/
│   ├── quiz.js             # Quiz flow, score reveal, archetype assignment
│   ├── dashboard.js        # Dashboard, level-up detection, certificates
│   ├── vault.js            # Vault cards, locking, Got It → Lab transition
│   ├── lab.js              # Mission render, AI evaluation, score display
│   └── playbook.js         # Saved prompts, one-click AI launcher
├── data/
│   ├── archetypes.js       # Archetype definitions, challenges, badges
│   ├── vault.js            # 35 vault card definitions
│   └── missions.js         # Lab mission scenarios and rubrics
└── styles/
    ├── base.css            # Design tokens, dark navy theme, typography
    ├── components.css      # Reusable UI components
    └── pages.css           # Page-specific layouts
```

> **Critical:** `core/router.js` must be the last script loaded in `index.html`. All page functions must be defined before the router initialises.

### 5.3 API Security Model

The OpenRouter API key is stored as a Vercel environment variable (`OPENROUTER_API_KEY`). The Vercel Edge Function at `api/evaluate.js` handles all API communication server-side. The browser sends prompt data to the proxy endpoint — never to OpenRouter directly. The key is never present in any client-side code or response.

### 5.4 Performance (Vercel Speed Insights)

| Metric | Score | Benchmark |
|---|---|---|
| Real Experience Score | 100/100 | Good: >90 |
| First Contentful Paint | 1.41s | Good: <1.8s |
| Largest Contentful Paint | 1.52s | Good: <2.5s |
| Interaction to Next Paint | 88ms | Good: <200ms |
| Cumulative Layout Shift | 0 | Good: <0.1 |
| First Input Delay | 3ms | Good: <100ms |
| Error Rate | 0% | Target: 0% |

---

## 6. User Flow

### 6.1 Core Journey

| Step | Page | What Happens |
|---|---|---|
| 1 | Landing | User sees tagline and 'Start Assessment' button |
| 2 | Name Entry | User enters name — stored to localStorage |
| 3 | Prediction | User predicts their % before the quiz starts |
| 4 | Quiz | 10 questions — one at a time, no back button |
| 5 | Score Reveal | Animated progress bar → final score → archetype revealed |
| 6 | Archetype Page | Full archetype breakdown, category scores, 'Go to Dashboard' |
| 7 | Dashboard | Effective score, breakdown bars, 7-day challenges, retake gate |
| 8 | Vault | Browse technique cards by level — locked/unlocked by score |
| 9 | Card Detail | Read technique → Got It → instant transition to Lab mission |
| 10 | Lab Mission | Write prompt → Evaluate → Score + breakdown + tip |
| 11 | Save to Playbook | 75%+ score → prompt saved with category and score |
| 12 | Playbook | Browse saved prompts → one-click launch in Claude/ChatGPT |
| 13 | Level Up | Effective score crosses threshold → celebration card → certificate |

### 6.2 Retention Loop

```
Dashboard (check score)
    → Vault (learn technique)
        → Lab (practise technique)
            → Playbook (save and use)
                → Dashboard (score updated)
```

Each cycle raises the effective score and unlocks new content. Compounding progression by design.

---

## 7. Business Model

### 7.1 Current State

Fully free. No login. No paywall. No ads. Priority is user acquisition, real usage data, and product validation before any monetisation.

### 7.2 Planned Monetisation

| Tier | Price | Features |
|---|---|---|
| Free | ₹0 forever | Full quiz, Vault L1–L2, Lab L1–L2, Playbook (5 saves) |
| Pro | ₹750/month | Full vault, all lab missions, unlimited playbook, progress history, team sharing |
| Enterprise | Custom | Team dashboards, custom scenarios, API access, white-label, analytics export |

### 7.3 Market Context

| Market | Size | Basis |
|---|---|---|
| TAM (Global AI tools market) | $42B | All AI productivity tools |
| SAM (AI literacy & training) | $8.4B | 20% of TAM, addressable with current product |
| SOM (Initial target) | $420M | 5% of SAM — individual learners, small teams |

---

## 8. Roadmap

| Phase | Timeline | Milestones |
|---|---|---|
| Phase 1: Validate | M1–M3 | 10K users · LinkedIn launch campaign · Monitor quiz completion · Fix friction from real usage data |
| Phase 2: Product Depth | M4–M9 | User accounts · Cross-device sync · 50 more vault cards · 30 new lab missions · Mobile PWA · Shareable score cards |
| Phase 3: Scale | M10–M18 | Pro tier launch · Team features · Enterprise pilots · API for integrations · $10K MRR target |

### 8.1 Immediate Backlog (V2.1)

- [ ] Certificate: add QR code linking to MaxPrompt
- [ ] Lab: show example passing prompt after 3 failed attempts
- [ ] Vault: search/filter cards by technique type
- [ ] Dashboard: show next unlock threshold and distance to it
- [ ] Analytics: track vault card read rates by level
- [ ] SEO: meta tags, OG image, structured data

---

## 9. Bug History

### 9.1 Resolved (V1 → V2)

| Bug | Root Cause | Fix |
|---|---|---|
| 405 Error on API calls | Testing on localhost — proxy only runs on Vercel | Push to GitHub, test on live URL only |
| "User not found" error | Truncated API key in Vercel env variables | Create fresh key, re-paste carefully |
| Script load order error | router.js loading before page scripts | Moved router.js to last script tag in index.html |
| config/api.js 404 on Vercel | Gitignored file referenced in HTML | Removed script tag entirely |
| Free model "no endpoints" error | Single model dependency — goes offline randomly | 5-model fallback chain in api/evaluate.js |
| Score frozen at quiz time | Dashboard reading mx_archetype from storage | Live recalculation from effective score every load |
| Vault flash before lab loads | navigateTo() async — vault visible during hash change | showPage() called synchronously, history.replaceState() used |
| Navbar covering quiz buttons | Nav shown too early in quiz flow | Nav only shown when showDashboard() runs |
| Duplicate variable crash | `today` and `name` declared twice in downloadCertificate() | Removed duplicate code block |
| Level-up never triggered | Archetype frozen — no comparison logic existed | Live detection and comparison on every dashboard load |

### 9.2 Open / Future

- Mobile: touch targets on vault cards could be larger on small screens
- Accessibility: keyboard navigation not fully implemented
- Offline: no service worker — Lab requires internet connection
- 7-day challenges: do not update mid-journey without retake (by design for V2, revisit in V3)

---

## 10. Appendix

### 10.1 Key Links

| Resource | Link |
|---|---|
| Live Product | https://maxprompt-blue.vercel.app |
| GitHub Repo | https://github.com/PARTHPANCHAL3656/maxprompt |
| Vercel Dashboard | vercel.com → maxprompt project |
| OpenRouter | openrouter.ai (API key management) |
| Analytics | Vercel → Analytics tab (custom events enabled) |
| Speed Insights | Vercel → Speed Insights tab |

### 10.2 Glossary

| Term | Definition |
|---|---|
| Effective Score | Quiz base score + vault reading bonus + lab mission bonus. Recalculates live every session. |
| Archetype | One of 7 user profiles determined by effective score. Drives challenges, unlocks, and personalisation. |
| Vault Bonus | Percentage points earned by reading vault cards. Max +14%. |
| Lab Bonus | Percentage points earned by passing lab missions at 75%+. Max +20%. |
| Edge Function | Vercel serverless function that runs at the CDN edge. Used to proxy OpenRouter API calls securely. |
| RES | Real Experience Score — Vercel's composite metric for user-perceived performance. MaxPrompt scores 100/100. |
| Canvas API | Browser-native API for drawing graphics. Used to generate downloadable achievement certificates. |
| Dunning-Kruger Effect | Cognitive bias where people with limited knowledge overestimate their competence. Central to MaxPrompt's quiz design. |

### 10.3 Document History

| Version | Date | Changes |
|---|---|---|
| 1.0 | March 2026 | Initial PRD — written post-V2 launch to document the full product as shipped |

---

*MaxPrompt — Built solo. Deployed free. No gatekeeping.*
