# TaskRoute AI — Production Web App

This is the deployable Next.js version of the TaskRoute AI MVP.

## What this version includes

- Dark and light modes
- The approved kawaii lo-fi design
- Task classification
- Platform, model, effort, and workspace recommendations
- Stay-or-switch guidance
- Budget vs balanced vs premium comparison
- Copyable optimized prompt
- Responsive desktop and mobile layout

## Run locally

1. Install Node.js 20 or newer.
2. Open this folder in Terminal.
3. Run:

```bash
npm install
npm run dev
```

4. Open `http://localhost:3000`

## Deploy

The easiest deployment path is Vercel:

1. Put this folder in a GitHub repository.
2. Import the repository into Vercel.
3. Vercel will detect Next.js automatically.
4. Click Deploy.

## Important production note

The model catalog is currently stored inside the app. Because AI models and prices change frequently, the next production milestone should move that catalog to an updateable database or admin panel.
