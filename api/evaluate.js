export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { messages, systemPrompt } = req.body;

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
      "HTTP-Referer": "https://maxprompt-blue.vercel.app/",
      "X-Title": "MaxPrompt"
    },
    body: JSON.stringify({
      model: "meta-llama/llama-3.3-70b-instruct:free",
      max_tokens: 1000,
      messages: [
        { role: "system", content: systemPrompt },
        ...messages
      ]
    })
  });

  const data = await response.json();
  return res.status(200).json(data);
}
