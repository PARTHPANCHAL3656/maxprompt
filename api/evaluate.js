export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { messages, systemPrompt } = req.body;

  const models = [
    "qwen/qwen-2.5-7b-instruct:free",
    "meta-llama/llama-3.3-70b-instruct:free",
    "mistralai/mistral-7b-instruct:free",
    "google/gemma-3-4b-it:free",
    "microsoft/phi-3-mini-128k-instruct:free"
  ];

  for (const model of models) {
    try {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "HTTP-Referer": "https://maxprompt-blue.vercel.app",
          "X-Title": "MaxPrompt"
        },
        body: JSON.stringify({
          model: model,
          max_tokens: 1000,
          messages: [
            { role: "system", content: systemPrompt },
            ...messages
          ]
        })
      });

      const data = await response.json();

      if (data.error) continue;
      if (!data.choices?.[0]?.message?.content) continue;

      return res.status(200).json(data);

    } catch (e) {
      continue;
    }
  }

  return res.status(500).json({ 
    error: { message: "All models unavailable. Try again in a minute." }
  });
}
