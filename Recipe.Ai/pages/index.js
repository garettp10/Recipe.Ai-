
import { useState } from 'react';

export default function Home() {
  const [goal, setGoal] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

  async function getRecipes() {
    setLoading(true);
    const res = await fetch('/api/recipes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ goal })
    });
    const data = await res.json();
    setRecipes(data.recipes);
    setLoading(false);
  }

  return (
    <div style={{ padding: 20, fontFamily: 'sans-serif' }}>
      <h1>Recipe.AI</h1>
      <p>Enter your diet goal, preferences, or restrictions:</p>
      <input
        value={goal}
        onChange={(e) => setGoal(e.target.value)}
        placeholder="e.g. high protein vegetarian"
        style={{ padding: 8, width: '60%' }}
      />
      <button onClick={getRecipes} style={{ marginLeft: 10, padding: 8 }}>Get Recipes</button>

      {loading && <p>Loading recipes...</p>}

      {recipes.map((r, i) => (
        <div key={i} style={{ marginTop: 20, border: '1px solid #ddd', padding: 10 }}>
          <h3>{r.title}</h3>
          <h4>Ingredients:</h4>
          <ul>
            {r.ingredients.map((ing, j) => <li key={j}>{ing}</li>)}
          </ul>
          <h4>Instructions:</h4>
          <ol>
            {r.instructions.map((step, k) => <li key={k}>{step}</li>)}
          </ol>
        </div>
      ))}
    </div>
  );
}
