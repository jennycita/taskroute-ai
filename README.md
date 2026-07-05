# TaskRoute AI

**TaskRoute AI helps people choose the right AI setup or workflow for a specific result.**

Describe what you want to accomplish, and the app recommends:

- the best AI platform or sequence of tools
- the best model or model tier
- the right effort or reasoning level
- the best workspace for the task
- whether to stay with your current tool, switch, or add another tool
- a budget option
- a premium option
- a ready-to-use prompt for the next step

## Why this exists

AI users often choose the most powerful model by default, even when a faster or cheaper option would work just as well. They may also choose the right model for planning but the wrong tool for producing the final result.

For example:

- a chat model can help write lyrics and a strong music-generation prompt
- a dedicated music tool is needed to generate the finished song
- a chat model can create a script and storyboard
- a dedicated video tool is needed to generate or edit the final video

TaskRoute AI reduces that confusion.

The goal is not to recommend the most powerful AI every time. The goal is to recommend the **simplest, least expensive setup that can reliably complete the actual job**.

## Primary and secondary priorities

Users can select up to two priorities.

- The first selection is marked with a visible **1** and becomes the primary priority
- The second selection is marked with a visible **2** and becomes the secondary priority
- TaskRoute evaluates the choices in that order
- A third selection is blocked so the recommendation does not become contradictory or unfocused

Available priorities:

- Balanced
- Cost
- Speed
- Quality

This allows combinations such as:

- Quality first, cost second
- Speed first, quality second
- Cost first, speed second

## Task categories

The task-category section is separate from the priority section.

Priorities describe what the user values most:

- Balanced
- Cost
- Speed
- Quality

Categories describe the kind of work being done:

- Coding
- Design
- Research
- Writing
- Images
- Music
- Video
- Data
- Existing project

Users can select multiple categories when a task crosses more than one area.

## Music routing

TaskRoute distinguishes between planning a song and creating the finished audio.

### Planning or preparing

Recommended for:

- lyrics
- hooks
- structure
- genre and mood
- creative direction
- generation prompts

Typical workflow:

1. ChatGPT or Claude for creative development
2. Suno when the user is ready to generate the finished song

### Creating the finished song

Typical workflow:

1. ChatGPT or Claude for lyrics and a production-ready prompt
2. Suno for the full generated song with vocals and production
3. Optional audio editor or DAW for final polish

## Video routing

TaskRoute distinguishes between planning, generating, and editing video.

### Planning or preparing

Recommended for:

- scripts
- storyboards
- shot lists
- scene prompts
- camera direction
- pacing and structure

### Creating the finished video

Typical workflow:

1. ChatGPT or Claude for the script and shot prompts
2. Sora, Runway, or another video-generation tool for the scenes
3. A video editor for assembly, captions, sound, and final polish

### Editing existing footage

TaskRoute can recommend tools such as:

- Runway
- CapCut
- Canva
- Adobe Premiere Pro

The recommendation depends on whether the user wants fast social editing, AI-assisted effects, or professional control.

## Current features

- dark and light modes
- responsive desktop and mobile layout
- descriptive onboarding and examples
- clearly separated priorities and task categories
- visible 1 and 2 markers for primary and secondary priorities
- task classification
- up to two ranked priorities
- platform, model, effort, workspace, and workflow recommendations
- music planning and finished-song routing
- video planning, generation, and editing routing
- stay, switch, or add-another-tool guidance
- budget vs balanced vs premium comparison
- ready-to-copy prompt generation
- working history and saved recommendation views using browser storage
- kawaii lo-fi visual design

## How the recommendation engine works

The current version uses a lightweight rules-based engine. It looks at:

- task type
- desired output
- project phase
- current workspace
- primary and secondary priorities
- whether the user needs planning, final generation, or editing
- whether the task involves coding, research, writing, images, music, video, or data
- whether the user is starting fresh or continuing an existing project

This is an MVP. A future production version should use an updateable model and tool catalog plus a more advanced scoring engine.

## History and saved recommendations

History and saved items are stored in the browser using local storage.

They normally survive closing and reopening the browser, but they are:

- device-specific
- browser-specific
- not synced across devices
- removable if browser storage is cleared
- unavailable in a new private or incognito session

A future version could add accounts and database-backed syncing.

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

This is an early working product. The interface and core recommendation flow are functional, but the model and tool catalog is currently stored inside the app.

Because AI models, pricing, limits, and capabilities change frequently, a future milestone should move the catalog into an updateable database or admin panel.

## License

The repository uses the license included in the project. The TaskRoute AI name, branding, and artwork should be treated separately from the source-code license unless explicitly stated otherwise.
