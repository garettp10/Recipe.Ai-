
export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { goal } = req.body;

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: "Missing OpenAI API Key" });
    }

    const prompt = `Suggest 3 recipes for someone with this goal: ${goal}.
    For each recipe, include:
    - Title
    - Ingredients (5-7 items)
    - Instructions (3-5 clear steps)`;

    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [{ role: "user", content: prompt }],
        }),
      });

      const json = await response.json();
      const text = json.choices[0].message.content;

      const recipes = text.split(/\n\n/).map(block => {
        const lines = block.split("\n").map(l => l.trim()).filter(Boolean);
        return {
          title: lines[0] || "Recipe",
          ingredients: lines.filter(l => l.startsWith("-")),
          instructions: lines.filter(l => /^[0-9]/.test(l)),
        };
      }).slice(0, 3);

      res.status(200).json({ recipes });
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch recipes" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
