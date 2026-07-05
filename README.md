# TaskRoute AI

**TaskRoute AI helps people choose the right AI setup for a specific task.**

Describe what you are trying to do, and the app recommends:

- the best AI platform
- the best model or model tier
- the right effort or reasoning level
- the best workspace for the task
- whether to stay with your current tool or switch
- a budget option
- a premium option
- a ready-to-use prompt

## Why this exists

AI users often choose the most powerful model by default, even when a faster or cheaper option would work just as well. Others use the right model in the wrong place, such as trying to manage a large codebase in a normal chat.

TaskRoute AI is designed to reduce that confusion.

The goal is not to recommend the most powerful AI every time. The goal is to recommend the **least expensive and simplest setup that can reliably complete the task**.

## Example use cases

### Building an app

TaskRoute can recommend a coding workspace, a capable coding model, and the right effort level.

### Redesigning an existing project

TaskRoute can suggest staying inside the current project and switching to a more economical model for visual changes.

### Researching a current topic

TaskRoute can recommend a web-connected research tool with citations.

### Writing or rewriting

TaskRoute can suggest a fast general model instead of an expensive reasoning model.

### Already working in an AI tool

TaskRoute can tell the user whether to stay with the current setup or switch.

## Current features

- dark and light modes
- responsive desktop and mobile layout
- task classification
- platform, model, effort, and workspace recommendations
- stay-or-switch guidance
- budget vs balanced vs premium comparison
- ready-to-copy prompt generation
- kawaii lo-fi visual design

## How the recommendation engine works

The current version uses a lightweight rules-based engine. It looks at:

- task type
- project phase
- current workspace
- cost, speed, or quality preference
- whether the task involves coding, research, writing, images, or data
- whether the user is starting fresh or continuing an existing project

This is an MVP. A future production version should use an updateable model catalog and a more advanced scoring engine.

## Run locally

1. Install Node.js 20 or newer.
2. Open this folder in Terminal.
3. Run:

```bash
npm install
npm run dev
```

4. Open:

```text
http://localhost:3000
```

## Deploy

The easiest deployment path is Vercel:

1. Push this project to GitHub.
2. Import the repository into Vercel.
3. Vercel will detect Next.js automatically.
4. Click Deploy.

## Project status

This is an early working product. The interface and core recommendation flow are functional, but the model catalog is currently stored inside the app.

Because AI models, pricing, limits, and capabilities change frequently, a future milestone should move that catalog into an updateable database or admin panel.

## License

Add your preferred open-source license before encouraging reuse or redistribution.
