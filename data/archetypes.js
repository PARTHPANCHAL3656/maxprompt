const archetypes = {
    prompt_borrower: {
        title: "The Prompt Borrower",
        subtitle: "0-19%",
        badge: "The Prompt Borrower",
        headline: "[NAME], you're using AI like a search engine with extra steps.",
        whatsHappening: "You're borrowing other people's prompts and getting other people's results. The tool is capable of far more — but it's waiting for you to tell it who you are, what you need, and what good looks like.",
        gap: "You've never built a prompt from scratch with a role, constraint, and format defined. You don't know you can.",
        focus: "Stop copying. Start constructing. One prompt, built from scratch, with a defined role and one constraint. That's the entire shift.",
        closer: "You're not bad at AI. You've never been shown what structured usage looks like. That changes today.",
        challenges: [
            { title: "Build Your First Structured Prompt", description: "For your next AI task, write a prompt from scratch that includes:\n\n1. A role (who AI should be)\n2. A specific task (what you need)\n3. One constraint (what to avoid or limit)\n4. A format (how the output should look)\n\nDon't copy anything. Write it yourself. This is the foundation of everything that comes next." },
            { title: "Role Play Practice", description: "Today's challenge: Give AI a specific role in 3 different prompts.\n\nExamples:\n- 'As a senior software engineer, review this code...'\n- 'Act as a marketing strategist. Help me create...'\n- 'You are a professional editor. Improve this...'\n\nNotice how the role changes the output quality." },
            { title: "Constraint Matters", description: "Today, add ONE constraint to every prompt you write.\n\nConstraints to try:\n- Word count limits\n- Tone restrictions ('avoid jargon')\n- Format rules ('use bullet points')\n- Audience exclusions ('not for beginners')\n\nConstraints force AI to be precise." },
            { title: "Format Blueprint", description: "Today's challenge: Define the output format BEFORE asking AI.\n\nInstead of 'Write a blog post', say:\n'Write a blog post with:\n- 3 bullet points at start\n- 2 subheadings\n- Conclusion under 50 words'\n\nStructure guides quality." },
            { title: "The Context Package", description: "Today, include context in every prompt:\n\n1. Who you are\n2. Why you need this\n3. How you'll use the output\n4. Any relevant background\n\nWatch how context transforms relevance." },
            { title: "Complete Structure Combo", description: "Put it all together: combine role + context + constraint + format.\n\nFor your next AI task, write a prompt with ALL four elements. This is the complete structured prompt framework. Use it as your template going forward." },
            { title: "Teach the Framework", description: "Final day: Share what you've learned.\n\nExplain the structured prompt framework to someone else. Teaching solidifies your understanding.\n\nYour challenge: Write a brief guide (5 sentences) explaining role + context + constraint + format to a beginner." }
        ]
    },
    single_shotter: {
        title: "The Single-Shotter",
        subtitle: "20-39%",
        badge: "The Single-Shotter",
        headline: "[NAME], you're one iteration away from outputs 40% better than what you're getting.",
        whatsHappening: "You write your own prompts — that already puts you ahead of most users. But you treat every AI interaction like a vending machine: one input, one output, done. The problem is that first outputs are always drafts.",
        gap: "You've never run a second pass on an output and compared it to the first. You don't know what you're leaving behind.",
        focus: "For every AI output this week, run one refinement before using it. One specific instruction about what to fix. That's it.",
        closer: "The gap between where you are and where you could be is literally one extra message per task.",
        challenges: [
            { title: "The Second Pass Challenge", description: "For the next 5 AI tasks you do this week, follow this rule:\n\n1. Get your first output\n2. BEFORE using it, send ONE refinement prompt\n3. Compare the original to the refined version\n\nNote what improved. This single habit can increase your output quality by 40%." },
            { title: "Specific Refinement", description: "Yesterday you tried one refinement. Today, make it SPECIFIC.\n\nInstead of 'improve this', say:\n- 'Make the intro more conversational'\n- 'Add more concrete examples'\n- 'Shorten the conclusion'\n\nSpecific instructions = better outputs." },
            { title: "Compare Two Approaches", description: "Today, for one important task, try TWO different prompt approaches:\n\n1. Write your normal prompt\n2. Rewrite it with different framing\n3. Compare both outputs\n\nChoose the better one. This builds prompt intuition." },
            { title: "Diagnose Before Fixing", description: "When AI output is wrong, DON'T just fix it. Diagnose WHY it failed.\n\nToday, for any poor output:\n- Identify what went wrong\n- Was it missing context? Unclear instructions? Wrong role?\n- Fix the prompt, not the output\n\nThis is the difference between troubleshooting and engineering." },
            { title: "The Third Pass", description: "Push for a third iteration on one important task.\n\nMost people stop at 2. The third pass often reveals:\n- Edge cases you missed\n- Deeper refinements possible\n- Structure improvements\n\nGo deeper than comfortable." },
            { title: "Iterate on Structure", description: "This week you've been refining outputs. Now refine your PROMPTS.\n\nIf output needs 3+ fixes, rewrite the prompt instead of sending more iterations.\n\nToday's challenge: Identify your most-used prompt, rewrite it with better structure, test it." },
            { title: "The Iteration System", description: "Final day: Create your personal iteration system.\n\nDocument:\n- When to refine vs. rewrite\n- How many passes is too many\n- What makes a prompt 'good enough'\n\nYou've built the habit. Now make it systematic." }
        ]
    },
    refiner: {
        title: "The Refiner",
        subtitle: "40-59%",
        badge: "The Refiner",
        headline: "[NAME], you iterate well. But you're fixing problems you could have prevented.",
        whatsHappening: "You know how to push back on AI, ask for revisions, and improve outputs. That's real skill. But you're spending 5 passes on something that good upfront structure would solve in 2.",
        gap: "You're reactive (fix what's wrong) rather than proactive (design prompts that don't fail). You're troubleshooting when you could be engineering.",
        focus: "Before writing your next prompt, spend 30 seconds defining: the role, the audience, and one constraint. Then write the prompt. See how many passes you need.",
        closer: "You already have the iteration habit. You just need to move it upstream.",
        challenges: [
            { title: "Structure Before You Prompt", description: "For your next 3 AI tasks:\n\n1. BEFORE typing anything, spend 30 seconds writing down:\n   - The role (who AI should be)\n   - The audience (who it's for)\n   - One constraint (what to avoid)\n2. THEN write your prompt\n3. Count how many refinement passes you need\n\nCompare this to your average. Good structure reduces iterations by 50%+." },
            { title: "Track Your Passes", description: "Today, track how many refinement passes you need for 3 different tasks.\n\nNote:\n- What type of prompts need more passes?\n- What's the common thread?\n- Could better upfront structure help?\n\nData reveals patterns." },
            { title: "The 2-Pass Maximum", description: "Challenge: Get any output to acceptable quality in 2 passes or fewer.\n\nIf you need more:\n- The prompt, not the output, needs work\n- Stop iterating, start restructuring\n\nThis forces upstream thinking." },
            { title: "Root Cause Analysis", description: "When an output isn't good enough, ask: WHY?\n\nWas it:\n- Missing context?\n- Unclear role?\n- No format specified?\n- Wrong audience assumed?\n\nFix the cause, not symptoms." },
            { title: "Prompt Surgery", description: "Take a prompt that's been needing many iterations and REWRITE it from scratch with full structure.\n\nCompare:\n- Old prompt: how many passes?\n- New prompt: how many passes?\n\nStructure pays dividends." },
            { title: "The Structure Template", description: "Create your personal structure template:\n\n[Role] + [Context] + [Task] + [Constraint] + [Format]\n\nKeep this handy. Use it for every important prompt. Track your pass count. Watch it drop." },
            { title: "Upstream Mastery", description: "Final day: Evaluate your progress.\n\nCompare this week's average pass count to before. Calculate your efficiency gain.\n\nYou've moved iteration upstream. You're now engineering prompts, not troubleshooting outputs." }
        ]
    },
    structured_user: {
        title: "The Structured User",
        subtitle: "60-69%",
        badge: "The Structured User",
        headline: "[NAME], your prompts are structured. Your workflows aren't — yet.",
        whatsHappening: "You think about context before you write. You define roles. You use constraints sometimes. You're operating well above average. The next frontier is connecting single interactions into systems.",
        gap: "You're excellent at individual prompts but haven't started thinking about AI pipelines — where the output of one task becomes the structured input of the next.",
        focus: "Pick one multi-step task you do regularly. Map how AI could handle each step, with outputs feeding forward. Build it once. Use it repeatedly.",
        closer: "You're close to a level where AI starts compounding your work rather than just assisting it.",
        challenges: [
            { title: "Build Your First AI Pipeline", description: "Pick a multi-step task you do regularly (e.g., research → outline → draft → edit).\n\nThis week:\n1. Map the workflow on paper\n2. Identify where AI can handle each step\n3. Build it: use AI output from step 1 as structured input for step 2\n4. Refine the chain\n\nOnce built, this pipeline runs in minutes instead of hours." },
            { title: "Map Your Common Tasks", description: "Identify 3 multi-step tasks you do regularly.\n\nFor each, list:\n- All the steps involved\n- Which could be AI-assisted\n- What the input/output of each step looks like\n\nThis is the foundation of workflow design." },
            { title: "Design the Handoffs", description: "For one of your tasks, design how outputs pass between steps.\n\nKey question: What format should each AI output be in so the NEXT step can use it easily?\n\nStructured outputs = smooth handoffs." },
            { title: "Build One Complete Chain", description: "Take one multi-step task and build a complete AI pipeline.\n\nUse output from step 1 as input for step 2.\nDocument:\n- The prompts for each step\n- The format expected\n- Where human review fits\n\nTest it. Refine it." },
            { title: "The Human-AI Rhythm", description: "Where does human judgment fit in your pipeline?\n\nIdentify:\n- Which steps need human input?\n- Which can run autonomously?\n- Where do you review?\n\nThe best pipelines optimize both AI and human time." },
            { title: "Scale Your Pipeline", description: "Now that you have one working pipeline, how would you scale it?\n\n- Could it handle 10x the volume?\n- What would need to change?\n- What about quality control?\n\nThink beyond single tasks to systems." },
            { title: "The Workflow Library", description: "Final day: Document your pipeline.\n\nCreate a simple guide:\n- What it does\n- The prompts for each step\n- Expected inputs/outputs\n- When to use it\n\nYou've built a reusable system. Now it's portable." }
        ]
    },
    system_thinker: {
        title: "The System Thinker",
        subtitle: "70-79%",
        badge: "The System Thinker",
        headline: "[NAME], you think in workflows. Now make them rigorous.",
        whatsHappening: "You design before you prompt. You have reusable patterns. You decompose complex tasks. You're in the top 7% of AI users by behaviour.",
        gap: "Output evaluation. You're producing good outputs but not scoring them against defined criteria before using them. Your standards are instinct-based, not systematic.",
        focus: "Before using your next 5 AI outputs, score each one: accuracy, tone, completeness, audience fit — out of 10. You'll find gaps you've been ignoring.",
        closer: "At your level, small systematic upgrades produce disproportionate output quality gains.",
        challenges: [
            { title: "Score Before You Use", description: "For your next 5 AI outputs, apply this evaluation framework:\n\n**Score each output out of 10 for:**\n- Accuracy (facts correct?)\n- Tone (right voice?)\n- Completeness (missing anything?)\n- Audience fit (right for who it's for?)\n\nIf any score is below 7, improve the prompt, not the output. Track your average — you'll find patterns in what you're missing." },
            { title: "Define Your Criteria", description: "Today, define specific scoring criteria for ONE type of output you commonly create.\n\nExample for blog posts:\n- Clarity: 1-10\n- SEO optimization: 1-10\n- CTA effectiveness: 1-10\n- Readability: 1-10\n\nHaving criteria makes evaluation objective." },
            { title: "Score 5 Outputs", description: "Apply your scoring criteria to 5 recent AI outputs.\n\nCalculate average scores. Identify your lowest-scoring area.\n\nWhat's your weakest dimension? That's where prompt improvement matters most." },
            { title: "Bridge the Gaps", description: "Focus on your weakest scoring dimension.\n\nIf outputs consistently score low on clarity, your prompts need:\n- Simpler language instructions\n- Shorter output requests\n- More specific guidance\n\nTargeted prompt improvements." },
            { title: "The 7-Point Threshold", description: "From now on: No output goes out below 7/10 on any criterion.\n\nIf it scores lower:\n- Improve the prompt\n- Run another iteration\n- Don't settle\n\nThis is your new quality floor." },
            { title: "Track the Patterns", description: "After a week of scoring, review your data.\n\n- Which dimensions score consistently low?\n- What prompt changes raised scores?\n- What's your average?\n\nPatterns emerge from systematic tracking." },
            { title: "The Evaluation System", description: "Final day: Formalize your evaluation system.\n\nDocument:\n- Your criteria and scoring rubric\n- Your threshold (minimum score)\n- How to improve low scores\n\nYou've moved from instinct to system." }
        ]
    },
    ai_architect: {
        title: "The AI Architect",
        subtitle: "80-89%",
        badge: "The AI Architect",
        headline: "[NAME], you're in the top 2%. Here's the 1% gap.",
        whatsHappening: "You design AI behaviour, not just use it. You build reusable systems. You iterate with intention. You evaluate critically. Most people reading about this level aren't here.",
        gap: "You're still working mostly in single-model, single-context interactions. You haven't started designing AI behaviour meta-level — using AI to critique AI, building multi-stage pipelines, systematically testing prompt variations.",
        focus: "Use AI to evaluate its own output against a rubric you define. Ask it to argue against its own answer. See what it catches that you didn't.",
        closer: "The gap between 84% and 92% is not more knowledge. It's more systematic rigour in the habits you already have.",
        challenges: [
            { title: "The Meta-Evaluation Challenge", description: "For your next important AI task:\n\n1. Define a scoring rubric (3-5 criteria specific to your use case)\n2. Get your AI output\n3. BEFORE evaluating yourself, ask AI to score its own output against your rubric\n4. Then evaluate it yourself\n5. Compare: what did AI miss that you caught?\n\nThis reveals blind spots in both your prompting and your evaluation." },
            { title: "The Adversarial Prompt", description: "Today, use AI to stress-test its own output.\n\nAsk: 'What are 5 weaknesses in this output?'\n'Where might this be wrong?'\n'What would make it better?'\n\nSelf-critique reveals blind spots." },
            { title: "Build a Test Suite", description: "For one type of prompt, create a test suite:\n\n- 5 different inputs/types of requests\n- Expected quality criteria for each\n- Run your prompt against all 5\n\nSystematic testing reveals which edge cases fail." },
            { title: "Iterate the Prompt, Not the Output", description: "When output isn't good, resist fixing the output. Instead:\n\n1. Identify what's wrong\n2. Rewrite the prompt\n3. Run again\n4. Compare original vs. new prompt\n\nThis builds prompt design skill." },
            { title: "The A/B Framework", description: "Design two different prompts for the same task:\n- Prompt A: Your current approach\n- Prompt B: New framing/hints/structure\n\nRun both. Compare outputs.\nWhich approach wins? Why?\n\nThis is systematic prompt optimization." },
            { title: "Multi-Stage Pipeline", description: "Build a pipeline where:\n- Stage 1: AI generates\n- Stage 2: AI critiques its own output\n- Stage 3: AI revises based on critique\n\nNo human in the loop. How close does it get to your standard?" },
            { title: "The Architect's Framework", description: "Final day: Document your meta-level framework.\n\n- Your evaluation criteria\n- Your testing methodology\n- When to iterate prompts vs. outputs\n- Your pipeline patterns\n\nYou've moved from using AI to designing AI behavior." }
        ]
    },
    ai_native: {
        title: "The AI Native",
        subtitle: "90-99%",
        badge: "The AI Native",
        headline: "[NAME], you're operating at a level most people don't know exists.",
        whatsHappening: "AI is not a tool you use — it's a medium you think in. You design systems, evaluate rigorously, iterate with structure, and build workflows that compound. You're in the top fraction of a percent.",
        gap: "Sharing what you know. At this level, the highest leverage move is building or teaching — because the gap between you and average users is so large they can't even see it from where they are.",
        focus: "Document one workflow that took you months to develop. Make it usable for someone at 40%. That process will also reveal your own assumptions.",
        closer: "99% is the ceiling on this scale. Not because you're done. Because mastery doesn't have a finish line.",
        challenges: [
            { title: "Teach What You Know", description: "At your level, the highest leverage move is teaching.\n\nThis week:\n1. Pick one workflow you've developed over months\n2. Document it as if explaining to someone at 40% level\n3. Include: the prompt structures, the evaluation criteria, the workflow logic\n4. Share it (internally, blog, wherever)\n\nTeaching reveals your own hidden assumptions and accelerates others' growth." },
            { title: "The Documentation Challenge", description: "Take one of your core workflows and write it down.\n\nInclude:\n- The prompts you use\n- The sequence\n- Evaluation criteria\n- Common failure modes\n\nDocumentation is the beginning of teaching." },
            { title: "Write for Beginners", description: "Yesterday's documentation was for you. Today, rewrite it for someone at 40% level.\n\nRemove jargon. Explain why, not just what. Make it accessible.\n\nIf you can't explain it simply, you don't understand it well enough." },
            { title: "Teach a Peer", description: "Find someone at similar level and teach each other.\n\nShare your workflows. Compare approaches.\nWhat do they do differently? What can you learn?\n\nTwo experts together learn faster than either alone." },
            { title: "The Feedback Loop", description: "Have someone try your workflow and give feedback.\n\n- Where did they get stuck?\n- What was unclear?\n- What worked well?\n\nReal teaching reveals gaps in your documentation." },
            { title: "Iterate on Teaching", description: "Based on feedback, improve your documentation.\n\nVersion 2 should:\n- Address the stuck points\n- Clarify the confusing parts\n- Keep what worked\n\nTeaching is iterative, like prompting." },
            { title: "Share Your Framework", description: "Final day: Publish or share your framework.\n\nBlog, internal doc, conversation — somewhere it helps others.\n\nAt your level, the highest leverage move is multiplying your knowledge through others." }
        ]
    }
};