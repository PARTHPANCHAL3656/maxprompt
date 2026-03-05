const missions = [
    {
        id: "M01",
        level: 1,
        category: "email",
        vaultCardId: "give-ai-a-job",
        title: "The Professional Email",
        scenario: "You need to email your college professor asking for a 3-day extension on your assignment. You have a valid reason.",
        taskDescription: "Write a prompt that will get AI to write this extension request email for you — professional, respectful, and convincing.",
        hint: "Think about who you want AI to BE in this scenario. A job title changes everything.",
        evaluatorRubric: [
            "Does the prompt assign AI a specific professional role or expertise? (25pts)",
            "Does the prompt include enough context about the situation? (25pts)",
            "Does the prompt specify tone requirements for the output? (25pts)",
            "Does the prompt define what a successful email looks like? (25pts)"
        ]
    },
    {
        id: "M02",
        level: 1,
        category: "email",
        vaultCardId: "draw-the-lines",
        title: "The Constraint Master",
        scenario: "You need to write a follow-up email to a client who hasn't responded in 2 weeks. It must not sound needy or desperate.",
        taskDescription: "Write a prompt that gets AI to write this follow-up email — but explicitly tell AI what to avoid.",
        hint: "The best prompts define the edges. What should this email absolutely NOT sound like?",
        evaluatorRubric: [
            "Does the prompt include at least 2 explicit 'avoid' constraints? (30pts)",
            "Does the prompt include audience context (who is the client)? (25pts)",
            "Does the prompt specify tone (confident, professional, etc.)? (25pts)",
            "Is the objective clearly stated? (20pts)"
        ]
    },
    {
        id: "M03",
        level: 1,
        category: "content",
        vaultCardId: "shape-the-output",
        title: "The Format Engineer",
        scenario: "You want AI to explain the pros and cons of freelancing vs. a full-time job to share with a friend considering switching careers.",
        taskDescription: "Write a prompt that gets a clearly structured, easy-to-read comparison — not a wall of text.",
        hint: "Define how the output should look BEFORE asking for the content. Structure your ask.",
        evaluatorRubric: [
            "Does the prompt specify an explicit output format (table, list, sections, etc.)? (35pts)",
            "Does the prompt specify audience (who this is for)? (25pts)",
            "Does the prompt set length or scope boundaries? (20pts)",
            "Does the prompt have a clear objective? (20pts)"
        ]
    },
    {
        id: "M04",
        level: 2,
        category: "content",
        vaultCardId: "know-your-reader",
        title: "The Audience Shift",
        scenario: "You want AI to explain the concept of compound interest. But you need it explained to three very different people: a 10-year-old, a college student, and a working professional.",
        taskDescription: "Write ONE prompt that gets AI to produce all three explanations — each genuinely tailored to its reader, not just slightly reworded.",
        hint: "The secret is in how precisely you describe each reader — their age, knowledge level, and what they actually care about.",
        evaluatorRubric: [
            "Does the prompt define all three audiences with specific detail (not just age)? (30pts)",
            "Does the prompt ask for genuinely different explanations, not just different lengths? (30pts)",
            "Does the prompt specify a format that makes the three versions easy to compare? (20pts)",
            "Does the prompt include what each audience should be able to DO with this knowledge? (20pts)"
        ]
    },
    {
        id: "M05",
        level: 2,
        category: "decisions",
        vaultCardId: "set-the-scene",
        title: "The Context Builder",
        scenario: "You need advice on whether to take on a freelance project while studying. A generic answer would be useless — you need advice for YOUR specific situation.",
        taskDescription: "Write a prompt that gives AI enough context about your real situation that the advice it gives could not apply to anyone else.",
        hint: "Think about what makes your situation different from everyone else in the same position. That difference is the context AI needs.",
        evaluatorRubric: [
            "Does the prompt include at least 3 specific details about the user's situation? (30pts)",
            "Does the prompt mention the specific constraints or pressures involved? (25pts)",
            "Does the prompt ask for advice that addresses the specific context, not generic guidance? (25pts)",
            "Does the prompt define what a useful answer looks like for this specific situation? (20pts)"
        ]
    },
    {
        id: "M06",
        level: 2,
        category: "research",
        vaultCardId: "think-out-loud",
        title: "The Reasoning Request",
        scenario: "You want to know whether starting a side business while studying full-time is worth the risk.",
        taskDescription: "Write a prompt that doesn't just get an opinion — it gets reasoned analysis with the logic shown.",
        hint: "Ask AI to show its work. The path to the answer is as valuable as the answer itself.",
        evaluatorRubric: [
            "Does the prompt explicitly ask for step-by-step or shown reasoning? (30pts)",
            "Does the prompt include your specific context (student, time constraints, etc.)? (25pts)",
            "Does the prompt ask for a recommendation or conclusion after the reasoning? (25pts)",
            "Does the prompt define what 'good analysis' looks like for this scenario? (20pts)"
        ]
    },
    {
        id: "M07",
        level: 3,
        category: "content",
        vaultCardId: "get-three-versions",
        title: "The Options Generator",
        scenario: "You need a catchy title for your personal portfolio website that shows you're a developer who builds real things.",
        taskDescription: "Write a prompt that generates multiple title options — each taking a different angle — so you can choose the best.",
        hint: "One option is a guess. Three options is a decision. Ask for variety, not just quantity.",
        evaluatorRubric: [
            "Does the prompt ask for multiple versions (3+)? (25pts)",
            "Does the prompt specify that each version should take a different approach or angle? (30pts)",
            "Does the prompt include enough context about who you are? (25pts)",
            "Does the prompt ask for a recommendation or rationale? (20pts)"
        ]
    },
    {
        id: "M08",
        level: 3,
        category: "email",
        vaultCardId: "show-me-first",
        title: "The Example Method",
        scenario: "You have a specific email writing style — direct, no fluff, warm but professional. You want AI to match it exactly.",
        taskDescription: "Write a prompt that teaches AI your style using an example, then asks it to write in that style.",
        hint: "Don't describe your style with words. Show it. One example is worth a hundred adjectives.",
        evaluatorRubric: [
            "Does the prompt include a concrete example of the desired style? (35pts)",
            "Does the prompt explicitly reference the example and ask to match it? (25pts)",
            "Does the prompt clearly state the new task to write? (25pts)",
            "Does the prompt include the key context about the new email? (15pts)"
        ]
    },
    {
        id: "M09",
        level: 3,
        category: "problem-solving",
        vaultCardId: "roast-your-own-work",
        title: "The Self-Critic",
        scenario: "You've been writing the same project pitch for 3 days and you think it's good — but something feels off.",
        taskDescription: "Write a prompt that makes AI review and critique your work, then improve it. Assume you will paste your draft after the prompt.",
        hint: "Ask for the problem first, then the solution. Critique before rewrite — in that order.",
        evaluatorRubric: [
            "Does the prompt ask for specific weaknesses first, before any improvement? (30pts)",
            "Does the prompt specify what dimensions to critique (clarity, tone, persuasion, etc.)? (30pts)",
            "Does the prompt ask for a revised version after the critique? (25pts)",
            "Does the prompt set a standard for what 'good' looks like? (15pts)"
        ]
    },
    {
        id: "M10",
        level: 4,
        category: "research",
        vaultCardId: "fact-check-yourself",
        title: "The Verification Loop",
        scenario: "You want to use AI to research statistics about social media's effect on productivity to include in a presentation.",
        taskDescription: "Write a prompt that gets statistics AND builds in a verification step — so you don't accidentally use a hallucinated number.",
        hint: "Ask AI to check its own work. A two-step prompt — answer, then verify — is more reliable than one-shot.",
        evaluatorRubric: [
            "Does the prompt ask for a first response with claims/data? (20pts)",
            "Does the prompt then ask AI to generate verification questions for its own output? (30pts)",
            "Does the prompt ask AI to answer those verification questions? (25pts)",
            "Does the prompt ask for a revised, verified final answer? (25pts)"
        ]
    },
    {
        id: "M11",
        level: 4,
        category: "problem-solving",
        vaultCardId: "one-task-at-a-time",
        title: "The Splitter",
        scenario: "You need help with your LinkedIn presence: you want a profile headline, a summary section, and 3 post ideas — all in one go.",
        taskDescription: "Your challenge: write this as three separate, focused prompts instead of one. Write Prompt 1 only — but include a comment explaining what Prompts 2 and 3 would be and why splitting improves the result.",
        hint: "Each task needs different context and a different AI 'mode'. Combining them dilutes all three.",
        evaluatorRubric: [
            "Is Prompt 1 focused on exactly one deliverable with no other tasks mixed in? (30pts)",
            "Does Prompt 1 have strong context, role, and constraints for that single task? (30pts)",
            "Does the comment clearly explain what Prompts 2 and 3 would cover? (20pts)",
            "Does the comment explain WHY splitting produces better results than combining? (20pts)"
        ]
    },
    {
        id: "M12",
        level: 4,
        category: "decisions",
        vaultCardId: "chain-the-conversation",
        title: "The Workflow Builder",
        scenario: "You need to choose between two job offers. You want a thorough analysis — not just a quick pros/cons list.",
        taskDescription: "Design a multi-step prompt sequence where each step builds on the previous. Write only Step 1 for now, but include a note about what Steps 2 and 3 will be.",
        hint: "A chain is stronger than a link. Map the sequence before you write any single step.",
        evaluatorRubric: [
            "Does Step 1 have a clear, specific objective that produces usable output? (30pts)",
            "Is there a clear logical connection from Step 1 to what Step 2 would use? (30pts)",
            "Does the plan show at least 2 more steps with described objectives? (25pts)",
            "Does Step 1 itself follow good prompt structure (role, context, format)? (15pts)"
        ]
    },
    {
        id: "M13",
        level: 5,
        category: "content",
        vaultCardId: "ask-for-options",
        title: "The Range Finder",
        scenario: "You are starting a YouTube channel about learning to code. You need a channel name that feels right — but you have no idea what direction to go.",
        taskDescription: "Write a prompt that generates genuinely different name options — not variations of the same idea — so you can see the full range of what is possible.",
        hint: "Force divergence by specifying that each option must take a completely different approach or personality. Same topic, different angles.",
        evaluatorRubric: [
            "Does the prompt ask for multiple options (4 or more)? (20pts)",
            "Does the prompt explicitly specify that each option must take a different angle or approach? (35pts)",
            "Does the prompt include enough context about the channel's audience and tone? (25pts)",
            "Does the prompt ask for a recommendation with reasoning after the options? (20pts)"
        ]
    },
    {
        id: "M14",
        level: 5,
        category: "decisions",
        vaultCardId: "argue-against-yourself",
        title: "The Devil's Advocate",
        scenario: "You've decided to drop out of college to work on your startup. AI agrees with you when you ask for feedback. But you need to be sure.",
        taskDescription: "Write a prompt that forces AI to argue against your decision — even if AI initially agrees — to surface the strongest counterarguments.",
        hint: "Force the opposite view. A recommendation you can't argue against is a recommendation you can trust.",
        evaluatorRubric: [
            "Does the prompt explicitly ask AI to argue AGAINST the stated position? (35pts)",
            "Does the prompt ask for the strongest possible counterarguments, not weak ones? (25pts)",
            "Does the prompt include enough context about the decision? (20pts)",
            "Does the prompt ask for a final revised recommendation after the counter-arguments? (20pts)"
        ]
    },
    {
        id: "M15",
        level: 5,
        category: "problem-solving",
        vaultCardId: "the-meta-prompt",
        title: "The Prompt Doctor",
        scenario: "Here is a weak prompt that a real user submitted: 'Help me write better emails at work.' It is vague, has no role, no context, no constraints, no format. It will produce a useless generic response.",
        taskDescription: "Write a meta-prompt: a prompt that asks AI to diagnose what is wrong with the weak prompt above and rewrite it into a strong, structured version.",
        hint: "You are not fixing the email writing prompt yourself. You are writing a prompt that ASKS AI to fix it — and to explain every change it makes.",
        evaluatorRubric: [
            "Does the prompt clearly present the weak prompt as the subject to be improved? (25pts)",
            "Does the prompt ask AI to diagnose specific weaknesses before rewriting? (30pts)",
            "Does the prompt ask AI to explain what it changed and why for each change? (25pts)",
            "Does the prompt ask for a final quality check on the improved version? (20pts)"
        ]
    }
];