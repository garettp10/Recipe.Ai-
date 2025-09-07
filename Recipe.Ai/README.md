
# Recipe.AI

This is a Next.js app that generates recipes using OpenAI.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Add your OpenAI API Key in a `.env.local` file:
   ```
   OPENAI_API_KEY=your_api_key_here
   ```

3. Run locally:
   ```bash
   npm run dev
   ```

4. Deploy to Vercel:
   - Push this project to GitHub
   - Import into Vercel
   - Add `OPENAI_API_KEY` in Vercel project settings → Environment Variables
   - Deploy

Visit your site → enter your goals/preferences → get recipes.
