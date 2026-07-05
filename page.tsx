"use client";

import { useEffect, useMemo, useState } from "react";

type SavedRoute = {
  id: string;
  task: string;
  title: string;
  workspace: string;
  effort: string;
  usage: string;
  switchAdvice: string;
  createdAt: string;
};

type Route = {
  title: string;
  workspace: string;
  effort: string;
  usage: string;
  fit: number;
  badges: string[];
  why: string;
  premiumReason: string;
  alternatives: [string, string, number][];
  budget: { name: string; note: string; effort: string; usage: string };
  premium: { name: string; note: string; effort: string; usage: string };
  upgrade: string;
  workflow?: { label: string; tool: string; description: string }[];
  promptLabel?: string;
};

const routes: Record<string, Route> = {
  designExisting: {
    title: "Claude Sonnet 5",
    workspace: "Continue inside the existing coding project",
    effort: "Medium",
    usage: "Low to moderate usage",
    fit: 98,
    badges: ["Excellent UI iteration", "Preserves logic", "Cost-aware"],
    why: "This is a visual change inside something that already works. A balanced coding model should handle layout, typography, colors, responsive behavior, and component polish without wasting premium usage.",
    premiumReason: "A frontier premium model would spend extra usage on work that is mostly interface refinement.",
    alternatives: [
      ["ChatGPT", "Good for iterative UI edits", 92],
      ["Cursor", "Great when edits span several files", 90],
      ["Lovable", "Fast visual prototyping", 84]
    ],
    budget: {
      name: "A lightweight coding model",
      note: "Good for contained CSS, spacing, copy, and component edits.",
      effort: "Low or Medium",
      usage: "Low"
    },
    premium: {
      name: "A frontier reasoning model",
      note: "Use only when the redesign also requires architecture or complex interaction changes.",
      effort: "High",
      usage: "High"
    },
    upgrade: "Upgrade only if the redesign touches state, architecture, authentication, performance, or core behavior."
  },
  codingBuild: {
    title: "Claude Sonnet 5",
    workspace: "Claude Code or a coding project workspace",
    effort: "Medium",
    usage: "Moderate usage",
    fit: 96,
    badges: ["Strong coding", "Good value", "Project-aware"],
    why: "This task needs dependable coding and multi-step reasoning, but not the most expensive model by default. Use a coding workspace that can inspect and edit project files.",
    premiumReason: "A premium autonomous model is only justified for unusually large builds, difficult architecture, or long-running agentic work.",
    alternatives: [
      ["ChatGPT coding workspace", "Balanced alternative", 93],
      ["Cursor", "Strong inside an existing repository", 90],
      ["Replit Agent", "Beginner-friendly end-to-end workflow", 85]
    ],
    budget: {
      name: "A lightweight coding model",
      note: "Use for routine edits and smaller features.",
      effort: "Medium",
      usage: "Low"
    },
    premium: {
      name: "A premium autonomous coding model",
      note: "Use for major transformations or long autonomous sessions.",
      effort: "High",
      usage: "Very high"
    },
    upgrade: "Upgrade only for architecture problems, stubborn bugs, large refactors, or long autonomous builds."
  },
  research: {
    title: "Perplexity",
    workspace: "Perplexity or another citation-first research workspace",
    effort: "Medium",
    usage: "Moderate usage",
    fit: 96,
    badges: ["Fresh sources", "Inline citations", "Fast comparison"],
    why: "This task depends on current information and source comparison. A search-grounded workspace is the best first stop.",
    premiumReason: "A frontier reasoning model is only necessary when sources conflict or the analysis is highly technical.",
    alternatives: [
      ["ChatGPT with web research", "Strong synthesis", 95],
      ["Gemini Deep Research", "Broad web investigation", 91],
      ["Claude", "Strong document synthesis", 88]
    ],
    budget: {
      name: "A fast search-grounded model",
      note: "Good for broad factual research and simple comparisons.",
      effort: "Low or Medium",
      usage: "Low"
    },
    premium: {
      name: "A frontier reasoning model",
      note: "Use for difficult synthesis and high-stakes analysis.",
      effort: "High",
      usage: "High"
    },
    upgrade: "Use high effort when evidence conflicts, stakes are high, or technical judgment is required."
  },
  writing: {
    title: "ChatGPT",
    workspace: "Normal chat",
    effort: "Low or Medium",
    usage: "Low usage",
    fit: 96,
    badges: ["Fast drafting", "Easy revision", "Good voice control"],
    why: "Most writing tasks do not need a coding agent or maximum reasoning. Start with a fast general model and increase effort only when the work becomes strategically complex.",
    premiumReason: "Premium reasoning is unnecessary unless the writing depends on dense sources, difficult argumentation, or high-stakes strategy.",
    alternatives: [
      ["Claude", "Strong long-form writing", 93],
      ["Gemini", "Useful long-context alternative", 88],
      ["Lightweight model", "Good for short edits", 84]
    ],
    budget: {
      name: "A lightweight chat model",
      note: "Use for short rewrites, formatting, summaries, and simple drafts.",
      effort: "Low",
      usage: "Very low"
    },
    premium: {
      name: "A frontier reasoning model",
      note: "Use for difficult strategy, argumentation, or editorial structure.",
      effort: "High",
      usage: "High"
    },
    upgrade: "Use a reasoning model only for complex strategy, source-heavy work, or high-stakes communication."
  },
  image: {
    title: "ChatGPT image generation",
    workspace: "An image-generation chat",
    effort: "Medium",
    usage: "Moderate usage",
    fit: 97,
    badges: ["Direct creation", "Natural edits", "Visual iteration"],
    why: "The task is visual, so use a workspace that can generate or edit the image directly rather than a text-only model.",
    premiumReason: "A premium text model adds little value until the visual direction itself becomes strategically complex.",
    alternatives: [
      ["Midjourney", "Strong stylized generation", 92],
      ["Adobe Firefly", "Production design workflow", 87],
      ["Canva AI", "Fast and beginner-friendly", 84]
    ],
    budget: {
      name: "Canva AI",
      note: "Good for quick social graphics and simple branded assets.",
      effort: "Low",
      usage: "Low"
    },
    premium: {
      name: "Midjourney",
      note: "Use for highly stylized visual exploration.",
      effort: "Medium",
      usage: "High"
    },
    upgrade: "Refine the prompt and direction before spending more generations."
  },
  data: {
    title: "ChatGPT with data analysis",
    workspace: "A workspace that can run code and inspect files",
    effort: "Medium",
    usage: "Moderate to high usage",
    fit: 97,
    badges: ["Runs code", "Handles files", "Strong analysis"],
    why: "This task benefits from code execution, calculations, charts, and careful reasoning. Use a workspace that can inspect files and run analysis.",
    premiumReason: "The premium tier is only necessary for especially difficult modeling, technical work, or high-stakes analysis.",
    alternatives: [
      ["Gemini", "Long context and multimodal analysis", 92],
      ["Claude", "Strong document and table reasoning", 90],
      ["Notebook environment", "Best for reproducibility", 88]
    ],
    budget: {
      name: "A lightweight analysis model",
      note: "Use for cleanup, formulas, summaries, and basic charts.",
      effort: "Medium",
      usage: "Low"
    },
    premium: {
      name: "A frontier reasoning model",
      note: "Use for advanced modeling or complex scientific analysis.",
      effort: "High",
      usage: "Very high"
    },
    upgrade: "Increase effort for messy data, statistical modeling, or high-stakes interpretation."
  },
  musicPlan: {
    title: "ChatGPT or Claude",
    workspace: "A normal chat for lyrics, concept, structure, and generation prompts",
    effort: "Medium",
    usage: "Low to moderate usage",
    fit: 96,
    badges: ["Lyrics and structure", "Creative direction", "Prompt building"],
    why: "You are preparing the creative material rather than generating the finished audio. A strong chat model is the best place to shape the concept, lyrics, arrangement, mood, and production prompt.",
    premiumReason: "A premium reasoning model is unnecessary unless the song concept is unusually complex or tied to a larger creative campaign.",
    alternatives: [
      ["Claude", "Strong lyrical and long-form development", 93],
      ["ChatGPT", "Good iterative creative direction", 93],
      ["Gemini", "Useful brainstorming alternative", 86]
    ],
    budget: {
      name: "A lightweight chat model",
      note: "Good for quick lyric drafts, titles, hooks, and simple prompts.",
      effort: "Low",
      usage: "Low"
    },
    premium: {
      name: "A frontier reasoning model",
      note: "Use only for complex narrative concepts or extensive creative strategy.",
      effort: "High",
      usage: "High"
    },
    upgrade: "Move to a dedicated music generator when you are ready to create the finished audio.",
    workflow: [
      { label: "Step 1", tool: "ChatGPT or Claude", description: "Develop the concept, lyrics, structure, genre, mood, and production prompt." },
      { label: "Step 2", tool: "Suno", description: "Use the prepared prompt and lyrics to generate the finished song." }
    ],
    promptLabel: "Prompt for the planning step"
  },
  musicGenerate: {
    title: "ChatGPT → Suno",
    workspace: "Plan in ChatGPT or Claude, then generate the finished song in Suno",
    effort: "Medium",
    usage: "Moderate usage",
    fit: 99,
    badges: ["Finished audio", "Vocals and production", "Two-step workflow"],
    why: "A normal chat can help write the lyrics and production prompt, but it does not create the finished song audio. Use a chat model to prepare the creative direction, then use Suno to generate the track.",
    premiumReason: "The value comes from using the right sequence of tools, not from using the most expensive language model.",
    alternatives: [
      ["Suno directly", "Fastest when the concept is already clear", 95],
      ["ChatGPT → another music generator", "Flexible two-step workflow", 89],
      ["A DAW plus AI tools", "Best for hands-on production control", 84]
    ],
    budget: {
      name: "ChatGPT or Claude → Suno",
      note: "Prepare one clear prompt and iterate selectively to control generation costs.",
      effort: "Medium",
      usage: "Moderate"
    },
    premium: {
      name: "AI generator → DAW production",
      note: "Generate drafts, then arrange, edit, mix, and master in a full music-production workflow.",
      effort: "High",
      usage: "High"
    },
    upgrade: "Do not keep upgrading the chat model. Improve the lyrics and generation prompt, then iterate in the music tool.",
    workflow: [
      { label: "Step 1", tool: "ChatGPT or Claude", description: "Create lyrics, song structure, genre references, vocal direction, mood, and a clean generation prompt." },
      { label: "Step 2", tool: "Suno", description: "Generate the complete song with vocals and production." },
      { label: "Optional", tool: "Audio editor or DAW", description: "Trim, arrange, mix, or polish the generated track." }
    ],
    promptLabel: "Prompt to prepare your Suno generation"
  },
  videoPlan: {
    title: "ChatGPT or Claude",
    workspace: "A normal chat for script, storyboard, shot list, and video prompts",
    effort: "Medium",
    usage: "Low to moderate usage",
    fit: 96,
    badges: ["Script and storyboard", "Shot planning", "Prompt building"],
    why: "You are planning the video rather than rendering it. A chat model is the best place to develop the script, structure, shot list, visual style, and generation prompts.",
    premiumReason: "Premium reasoning is only needed for a complicated campaign, dense source material, or a highly technical production plan.",
    alternatives: [
      ["ChatGPT", "Strong iterative scripting", 94],
      ["Claude", "Strong long-form structure", 93],
      ["Gemini", "Useful multimodal planning", 88]
    ],
    budget: {
      name: "A lightweight chat model",
      note: "Good for short scripts, hooks, captions, and simple shot lists.",
      effort: "Low",
      usage: "Low"
    },
    premium: {
      name: "A frontier reasoning model",
      note: "Use for complex narrative structure or large campaign planning.",
      effort: "High",
      usage: "High"
    },
    upgrade: "Move to a dedicated video generator or editor when you are ready to produce the final video.",
    workflow: [
      { label: "Step 1", tool: "ChatGPT or Claude", description: "Write the script, storyboard, shot list, visual direction, and generation prompts." },
      { label: "Step 2", tool: "Sora, Runway, or another video tool", description: "Generate the scenes or assemble the final video." }
    ],
    promptLabel: "Prompt for the video-planning step"
  },
  videoGenerate: {
    title: "ChatGPT → Sora or Runway",
    workspace: "Plan the scenes in chat, then generate the final video in a dedicated video tool",
    effort: "Medium",
    usage: "Moderate to high usage",
    fit: 98,
    badges: ["Text or image to video", "Scene planning", "Two-step workflow"],
    why: "A chat model is useful for the script, storyboard, and shot prompts, but the finished video needs a dedicated generation tool. Use Sora or Runway after the creative direction is clear.",
    premiumReason: "Using a more expensive chat model will not replace the video-generation stage.",
    alternatives: [
      ["Sora", "Direct text or image-based video creation", 95],
      ["Runway", "Generation plus creative editing tools", 94],
      ["Canva", "Simpler template-based social video", 84]
    ],
    budget: {
      name: "ChatGPT → Canva or a lightweight video tool",
      note: "Best for short social content, templates, and simple motion.",
      effort: "Medium",
      usage: "Moderate"
    },
    premium: {
      name: "ChatGPT → Sora or Runway → full editor",
      note: "Use for cinematic scenes, multiple iterations, and professional finishing.",
      effort: "High",
      usage: "High"
    },
    upgrade: "Improve the storyboard and shot prompts before spending more video generations.",
    workflow: [
      { label: "Step 1", tool: "ChatGPT or Claude", description: "Create the script, shot list, timing, style, camera movement, and scene prompts." },
      { label: "Step 2", tool: "Sora or Runway", description: "Generate the video scenes from text or reference images." },
      { label: "Step 3", tool: "Video editor", description: "Assemble clips, add audio, captions, transitions, and final polish." }
    ],
    promptLabel: "Prompt to prepare your video generation"
  },
  videoEdit: {
    title: "Runway or a video editor",
    workspace: "A video-editing workspace that can work with your existing footage",
    effort: "Medium",
    usage: "Moderate usage",
    fit: 97,
    badges: ["Existing footage", "Editing and polish", "Visual workflow"],
    why: "Because you already have footage, the main need is editing rather than generation. Use a video editor or an AI video tool that supports cleanup, effects, captions, background changes, or scene adjustments.",
    premiumReason: "A premium language model can help plan edits, but it cannot replace the actual editing workspace.",
    alternatives: [
      ["Runway", "AI-assisted editing and generation", 94],
      ["CapCut", "Fast social editing and captions", 90],
      ["Adobe Premiere Pro", "Full professional editing control", 88]
    ],
    budget: {
      name: "CapCut or Canva",
      note: "Good for fast social edits, captions, templates, and simple polish.",
      effort: "Low or Medium",
      usage: "Low"
    },
    premium: {
      name: "Runway or Premiere Pro",
      note: "Use for more advanced effects, cleanup, compositing, and professional finishing.",
      effort: "High",
      usage: "High"
    },
    upgrade: "Choose the editor based on the footage and finishing needs, not the most powerful chat model.",
    workflow: [
      { label: "Step 1", tool: "ChatGPT or Claude", description: "Optional: create an edit plan, cut list, captions, titles, and scene order." },
      { label: "Step 2", tool: "Runway, CapCut, or Premiere Pro", description: "Edit and polish the existing footage." }
    ],
    promptLabel: "Prompt for your video edit plan"
  },
  simple: {
    title: "A fast general model",
    workspace: "Normal chat",
    effort: "Low",
    usage: "Very low usage",
    fit: 97,
    badges: ["Fast", "Simple", "Enough for the job"],
    why: "This looks straightforward. A fast general model should complete it without premium reasoning.",
    premiumReason: "There is no reason to use a premium model for a simple everyday task.",
    alternatives: [
      ["Claude lightweight model", "Fast alternative", 91],
      ["Gemini fast model", "Good general assistant", 89],
      ["Budget chat model", "Lowest-cost capable option", 88]
    ],
    budget: {
      name: "A lightweight chat model",
      note: "Use when cost matters most and the task is simple.",
      effort: "Low",
      usage: "Very low"
    },
    premium: {
      name: "A balanced general model",
      note: "Use only if the task grows into a longer workflow.",
      effort: "Medium",
      usage: "Moderate"
    },
    upgrade: "Move up only if the first result misses important nuance or cannot finish the task."
  }
};

const toolNames: Record<string, string> = {
  "not-started": "Not started",
  chatgpt: "ChatGPT",
  claude: "Claude",
  "claude-code": "Claude Code",
  cursor: "Cursor",
  gemini: "Gemini",
  perplexity: "Perplexity",
  replit: "Replit",
  suno: "Suno",
  sora: "Sora",
  runway: "Runway",
  canva: "Canva",
  other: "your current tool"
};

const priorityOptions = [
  ["balanced", "🌈 Balanced", "A practical mix of quality, speed, and cost."],
  ["cost", "💰 Cost", "Prefer the least expensive capable setup."],
  ["speed", "⚡ Speed", "Favor fast answers and shorter workflows."],
  ["quality", "⭐ Quality", "Prioritize the strongest result, without unnecessary overkill."]
] as const;

const mediaStageOptions = [
  ["auto", "✨ Decide for me", "TaskRoute will infer whether you are planning, creating, or editing."],
  ["plan", "📝 Plan or prepare", "Scripts, lyrics, storyboards, concepts, prompts, or shot lists."],
  ["create", "🎬 Create the final output", "Generate the finished song, video, image, or other media."],
  ["edit", "✂️ Edit or polish", "Improve existing audio, footage, or media you already have."]
] as const;

function analyzeTask(text: string, tags: string[], mediaStage: string) {
  const t = text.toLowerCase();
  const has = (...words: string[]) => words.some((word) => t.includes(word));

  const music = tags.includes("music") || has("song", "music", "lyrics", "track", "vocals", "suno", "melody", "album");
  const video = tags.includes("video") || has("video", "film", "clip", "reel", "animation", "sora", "runway", "footage", "storyboard");
  const existing = tags.includes("existing") || has("existing", "already built", "already have", "current app", "redesign");
  const design = tags.includes("design") || has("design", "layout", "color", "typography", "ui", "ux", "css", "style");
  const coding = tags.includes("coding") || has("app", "website", "code", "bug", "feature", "database", "api", "build");
  const research = tags.includes("research") || has("research", "sources", "latest", "compare", "evidence", "paper");
  const writing = tags.includes("writing") || has("write", "rewrite", "draft", "email", "post", "article", "caption");
  const image = tags.includes("image") || has("image", "logo", "illustration", "picture", "poster", "graphic");
  const data = tags.includes("data") || has("spreadsheet", "csv", "dataset", "chart", "analyze data", "excel");

  const wantsCreate = mediaStage === "create" || (mediaStage === "auto" && has("make a song", "create a song", "generate a song", "finished song", "full song", "make a video", "create a video", "generate a video", "final video"));
  const wantsEdit = mediaStage === "edit" || (mediaStage === "auto" && has("edit", "polish", "improve footage", "existing footage", "trim", "captions"));
  const wantsPlan = mediaStage === "plan" || (!wantsCreate && !wantsEdit);

  if (music) return wantsCreate ? routes.musicGenerate : routes.musicPlan;
  if (video) {
    if (wantsEdit) return routes.videoEdit;
    return wantsCreate ? routes.videoGenerate : routes.videoPlan;
  }
  if (design && existing) return routes.designExisting;
  if (image) return routes.image;
  if (data) return routes.data;
  if (research) return routes.research;
  if (coding) return routes.codingBuild;
  if (writing) return routes.writing;
  return routes.simple;
}

function buildSwitchAdvice(result: Route, tool: string) {
  if (tool === "not-started") return `Start in ${result.workspace}.`;

  const current = toolNames[tool] || "your current tool";
  const haystack = `${result.title} ${result.workspace}`.toLowerCase();
  const aliases: Record<string, string[]> = {
    chatgpt: ["chatgpt"],
    claude: ["claude"],
    "claude-code": ["claude code"],
    cursor: ["cursor"],
    gemini: ["gemini"],
    perplexity: ["perplexity"],
    replit: ["replit"],
    suno: ["suno"],
    sora: ["sora"],
    runway: ["runway"],
    canva: ["canva"]
  };

  const matches = (aliases[tool] || []).some((alias) => haystack.includes(alias));
  return matches
    ? `Stay in ${current}. Your current setup is part of the recommended workflow.`
    : `Move from ${current} to ${result.workspace}.`;
}

function applyPriorities(route: Route, priorities: string[]) {
  const adjusted: Route = {
    ...route,
    badges: [...route.badges],
    alternatives: route.alternatives.map((item) => [...item] as [string, string, number]),
    budget: { ...route.budget },
    premium: { ...route.premium },
    workflow: route.workflow?.map((item) => ({ ...item }))
  };

  const [primary, secondary] = priorities;

  if (primary === "cost") {
    adjusted.usage = "Cost-conscious usage";
    adjusted.badges.unshift("Cost is primary");
    adjusted.why += " Cost is your primary priority, so the recommendation avoids premium capability that the task does not require.";
  } else if (primary === "speed") {
    adjusted.usage = "Fast-response setup";
    adjusted.badges.unshift("Speed is primary");
    adjusted.why += " Speed is your primary priority, so the workflow favors fewer steps and faster tools.";
  } else if (primary === "quality") {
    adjusted.usage = "Higher usage for extra polish";
    adjusted.badges.unshift("Quality is primary");
    adjusted.why += " Quality is your primary priority, so the recommendation allows more iteration where it meaningfully improves the output.";
  } else {
    adjusted.badges.unshift("Balanced choice");
  }

  if (secondary && secondary !== "balanced") {
    adjusted.badges.push(`${secondary[0].toUpperCase()}${secondary.slice(1)} is secondary`);
    if (secondary === "cost") adjusted.why += " Cost remains the secondary guardrail.";
    if (secondary === "speed") adjusted.why += " Speed remains the secondary guardrail.";
    if (secondary === "quality") adjusted.why += " Quality remains the secondary guardrail.";
  }

  return adjusted;
}

export default function Home() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [task, setTask] = useState("");
  const [priorities, setPriorities] = useState<string[]>(["balanced"]);
  const [priorityMessage, setPriorityMessage] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [mediaStage, setMediaStage] = useState("auto");
  const [tool, setTool] = useState("not-started");
  const [result, setResult] = useState<Route | null>(null);
  const [showCompare, setShowCompare] = useState(false);
  const [copied, setCopied] = useState(false);
  const [savedNotice, setSavedNotice] = useState(false);
  const [view, setView] = useState<"home" | "history" | "saved">("home");
  const [history, setHistory] = useState<SavedRoute[]>([]);
  const [saved, setSaved] = useState<SavedRoute[]>([]);

  useEffect(() => {
    const savedTheme = localStorage.getItem("taskrouteTheme") as "dark" | "light" | null;
    if (savedTheme) setTheme(savedTheme);

    try {
      setHistory(JSON.parse(localStorage.getItem("taskrouteHistory") || "[]"));
      setSaved(JSON.parse(localStorage.getItem("taskrouteSaved") || "[]"));
    } catch {
      setHistory([]);
      setSaved([]);
    }
  }, []);

  useEffect(() => {
    document.body.dataset.theme = theme;
    localStorage.setItem("taskrouteTheme", theme);
  }, [theme]);

  const hasMediaTag = tags.includes("music") || tags.includes("video");
  const switchAdvice = useMemo(() => result ? buildSwitchAdvice(result, tool) : "", [result, tool]);

  const readyPrompt = useMemo(() => {
    if (!result) return "";
    const workflowText = result.workflow?.length
      ? `\nRecommended workflow:\n${result.workflow.map((step) => `${step.label}: ${step.tool} — ${step.description}`).join("\n")}\n`
      : "";

    return `Current tool: ${toolNames[tool]}
Recommended setup: ${result.title}
Recommended workspace: ${result.workspace}
Primary priority: ${priorities[0] || "balanced"}
Secondary priority: ${priorities[1] || "none"}
${workflowText}
My task:
${task}

Please help me complete the preparation step for this workflow. Keep the solution practical, preserve existing work when relevant, and give me a clean prompt I can copy into the next tool if another tool is required.`;
  }, [result, task, tool, priorities]);

  function toggleTag(tag: string) {
    setTags((current) =>
      current.includes(tag) ? current.filter((item) => item !== tag) : [...current, tag]
    );
  }

  function selectPriority(value: string) {
    setPriorityMessage("");

    setPriorities((current) => {
      if (current.includes(value)) {
        const remaining = current.filter((item) => item !== value);
        return remaining.length ? remaining : ["balanced"];
      }

      const withoutBalanced = value === "balanced"
        ? []
        : current.filter((item) => item !== "balanced");

      if (value === "balanced") return ["balanced"];

      if (withoutBalanced.length >= 2) {
        setPriorityMessage("Choose up to two priorities so the recommendation stays focused.");
        return current;
      }

      return [...withoutBalanced, value];
    });
  }

  function findRoute() {
    if (!task.trim()) return;
    const baseRoute = analyzeTask(task, tags, mediaStage);
    const match = applyPriorities(baseRoute, priorities);
    setResult(match);

    const advice = buildSwitchAdvice(match, tool);
    const item: SavedRoute = {
      id: crypto.randomUUID(),
      task: task.trim(),
      title: match.title,
      workspace: match.workspace,
      effort: match.effort,
      usage: match.usage,
      switchAdvice: advice,
      createdAt: new Date().toISOString()
    };

    setHistory((current) => {
      const updated = [item, ...current].slice(0, 30);
      localStorage.setItem("taskrouteHistory", JSON.stringify(updated));
      return updated;
    });
  }

  async function copyPrompt() {
    await navigator.clipboard.writeText(readyPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 1400);
  }

  function saveRecommendation() {
    if (!result) return;

    const item: SavedRoute = {
      id: crypto.randomUUID(),
      task,
      title: result.title,
      workspace: result.workspace,
      effort: result.effort,
      usage: result.usage,
      switchAdvice,
      createdAt: new Date().toISOString()
    };

    setSaved((current) => {
      const updated = [item, ...current].slice(0, 30);
      localStorage.setItem("taskrouteSaved", JSON.stringify(updated));
      return updated;
    });

    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 1600);
  }

  function clearTask() {
    setTask("");
    setTags([]);
    setPriorities(["balanced"]);
    setMediaStage("auto");
    setTool("not-started");
    setResult(null);
    setView("home");
  }

  function renderRouteList(items: SavedRoute[], emptyTitle: string) {
    if (!items.length) {
      return (
        <div className="empty-state">
          <div className="empty-cat">🐾</div>
          <h3>{emptyTitle}</h3>
          <p>Your recommendations are stored in this browser on this device.</p>
        </div>
      );
    }

    return (
      <div className="route-list">
        {items.map((item) => (
          <article className="route-list-item" key={item.id}>
            <div>
              <span className="eyebrow">{new Date(item.createdAt).toLocaleDateString()}</span>
              <h3>{item.title}</h3>
              <p>{item.task}</p>
            </div>
            <div className="route-meta">
              <span>{item.effort}</span>
              <span>{item.usage}</span>
            </div>
            <small>{item.switchAdvice}</small>
          </article>
        ))}
      </div>
    );
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand">
          <div className="brand-cat">🐱</div>
          <div>
            <h1>TaskRoute <span>AI</span></h1>
            <p>The right AI for the job ✨</p>
          </div>
        </div>
        <nav className="top-actions">
          <button className={`nav-btn ${view === "home" ? "active" : ""}`} onClick={() => setView("home")}>⌂ Home</button>
          <button className={`nav-btn ${view === "history" ? "active" : ""}`} onClick={() => setView("history")}>◷ History</button>
          <button className={`nav-btn ${view === "saved" ? "active" : ""}`} onClick={() => setView("saved")}>♡ Saved</button>
          <button className="theme-toggle" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
            {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
          </button>
        </nav>
      </header>

      <main className="layout">
        <aside className="cozy-panel">
          <img src="/sidebar-illustration.png" alt="Kawaii lo-fi girl with cat illustration" />
        </aside>

        <section className="workspace">
          {view === "home" && (
            <>
              <section className="hero-card">
                <span className="eyebrow">AI routing made simple</span>
                <h2>Use the right AI for the whole job</h2>
                <p className="hero-copy">
                  Describe the result you want. TaskRoute recommends the best platform, model,
                  effort level, workspace, or multi-tool workflow to complete it.
                </p>
                <p className="hero-support">
                  It can route a single task or show a sequence such as ChatGPT → Suno for a song,
                  or ChatGPT → Sora or Runway for a video.
                </p>

                <div className="hero-examples">
                  <article>
                    <span>💻</span>
                    <div>
                      <strong>Building or redesigning?</strong>
                      <p>Find the right coding workspace and effort level.</p>
                    </div>
                  </article>
                  <article>
                    <span>🎵</span>
                    <div>
                      <strong>Creating music?</strong>
                      <p>Separate lyric and prompt development from finished song generation.</p>
                    </div>
                  </article>
                  <article>
                    <span>🎬</span>
                    <div>
                      <strong>Making video?</strong>
                      <p>Plan the script and shots, then route the final production to a video tool.</p>
                    </div>
                  </article>
                </div>
              </section>

              <section className="card task-card">
                <div className="card-heading">
                  <div>
                    <span className="eyebrow">✨ Tell me the task</span>
                    <h2>Describe the result you want</h2>
                  </div>
                </div>

                <textarea
                  maxLength={500}
                  value={task}
                  onChange={(event) => setTask(event.target.value)}
                  placeholder="Example: I want to create a complete 90s alternative-rock theme song with vocals for my show. Which tools and workflow should I use?"
                />

                <div className="input-footer">
                  <div className="examples">
                    <button className="example-chip" onClick={() => setTask("Build a simple web app that helps me organize my weekly goals.")}>Build an app</button>
                    <button className="example-chip" onClick={() => setTask("Create a complete 90s alternative-rock theme song with vocals for my show.")}>Make a song</button>
                    <button className="example-chip" onClick={() => setTask("Create a short cinematic promotional video from a script and reference image.")}>Make a video</button>
                  </div>
                  <span>{task.length}/500</span>
                </div>

                <div className="guided-section">
                  <div className="section-label-row">
                    <div>
                      <span>What matters most?</span>
                      <small>Choose one primary priority and, optionally, one secondary priority.</small>
                    </div>
                    <span className="selection-count">{priorities.length}/2 selected</span>
                  </div>

                  <div className="priority-grid">
                    {priorityOptions.map(([value, label, description]) => {
                      const index = priorities.indexOf(value);
                      return (
                        <button
                          key={value}
                          className={`priority-card ${index >= 0 ? "selected" : ""}`}
                          onClick={() => selectPriority(value)}
                        >
                          <span className="priority-rank">
                            {index === 0 ? "Primary" : index === 1 ? "Secondary" : ""}
                          </span>
                          <strong>{label}</strong>
                          <small>{description}</small>
                        </button>
                      );
                    })}
                  </div>
                  {priorityMessage && <p className="helper-warning">{priorityMessage}</p>}
                </div>

                <div className="guided-section">
                  <div className="section-label-row">
                    <div>
                      <span>What kind of task is it?</span>
                      <small>Select anything that helps describe the work.</small>
                    </div>
                  </div>

                  <div className="task-tags">
                    {[
                      ["coding", "💻 Coding"],
                      ["design", "🎨 Design"],
                      ["research", "📚 Research"],
                      ["writing", "✍️ Writing"],
                      ["image", "🖼️ Images"],
                      ["music", "🎵 Music"],
                      ["video", "🎬 Video"],
                      ["data", "📊 Data"],
                      ["existing", "🧩 Existing project"]
                    ].map(([value, label]) => (
                      <button key={value} className={`tag ${tags.includes(value) ? "active" : ""}`} onClick={() => toggleTag(value)}>
                        {label}
                      </button>
                    ))}
                  </div>
                </div>

                {hasMediaTag && (
                  <div className="guided-section media-stage-section">
                    <div className="section-label-row">
                      <div>
                        <span>What stage are you at?</span>
                        <small>This prevents TaskRoute from recommending a chat app when you need the finished media.</small>
                      </div>
                    </div>

                    <div className="stage-grid">
                      {mediaStageOptions.map(([value, label, description]) => (
                        <button
                          key={value}
                          className={`stage-card ${mediaStage === value ? "selected" : ""}`}
                          onClick={() => setMediaStage(value)}
                        >
                          <strong>{label}</strong>
                          <small>{description}</small>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="current-tool-block">
                  <div className="section-label-row">
                    <div>
                      <span>Where are you working right now?</span>
                      <small>This helps decide whether you should stay, switch, or add another tool.</small>
                    </div>
                  </div>
                  <div className="tool-options">
                    {[
                      ["not-started", "✨ I have not started yet"],
                      ["chatgpt", "ChatGPT"],
                      ["claude", "Claude"],
                      ["claude-code", "Claude Code"],
                      ["cursor", "Cursor"],
                      ["gemini", "Gemini"],
                      ["perplexity", "Perplexity"],
                      ["replit", "Replit"],
                      ["suno", "Suno"],
                      ["sora", "Sora"],
                      ["runway", "Runway"],
                      ["canva", "Canva"],
                      ["other", "Other"]
                    ].map(([value, label]) => (
                      <button key={value} className={`tool-option ${tool === value ? "selected" : ""}`} onClick={() => setTool(value)}>
                        {label}
                      </button>
                    ))}
                  </div>
                </div>

                <button className="primary-btn" onClick={findRoute}>Find my best setup ✨</button>
              </section>

              {result && (
                <section className="result-grid">
                  <article className="card recommendation-card">
                    <div className="ribbon">Best match</div>
                    <div className="recommendation-top">
                      <div>
                        <span className="eyebrow">Recommended setup</span>
                        <h2>{result.title}</h2>
                        <p className="workspace-label">Best place: {result.workspace}</p>
                        <p className="switch-advice">{switchAdvice}</p>
                      </div>
                      <div className="fit-score" data-score={`${result.fit}%`} />
                    </div>
                    <div className="badge-row">
                      {result.badges.map((badge) => <span className="badge" key={badge}>✓ {badge}</span>)}
                    </div>
                    <p className="why-text">{result.why}</p>

                    {result.workflow && (
                      <div className="workflow-card">
                        <span className="eyebrow">Recommended workflow</span>
                        <div className="workflow-steps">
                          {result.workflow.map((step, index) => (
                            <article key={`${step.label}-${step.tool}`}>
                              <div className="workflow-number">{index + 1}</div>
                              <div>
                                <small>{step.label}</small>
                                <h3>{step.tool}</h3>
                                <p>{step.description}</p>
                              </div>
                            </article>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="premium-note">
                      <span>Why not the most powerful model?</span>
                      <p>{result.premiumReason}</p>
                    </div>
                    <div className="effort-box">
                      <span>Effort</span>
                      <strong>{result.effort}</strong>
                      <small>{result.usage}</small>
                    </div>
                    <div className="action-row">
                      <button className="secondary-btn" onClick={saveRecommendation}>
                        {savedNotice ? "Saved ✓" : "♡ Save recommendation"}
                      </button>
                      <button className="secondary-btn" onClick={clearTask}>↻ New task</button>
                    </div>
                  </article>

                  <article className="card alternatives-card">
                    <span className="eyebrow">Other good options</span>
                    {result.alternatives.map(([name, note, score]) => (
                      <div className="alt-item" key={name}>
                        <div><strong>{name}</strong><small>{note}</small></div>
                        <span className="alt-score">{score}%</span>
                      </div>
                    ))}
                  </article>

                  <article className="card compare-card">
                    <div className="compare-heading">
                      <div>
                        <span className="eyebrow">Quick comparison</span>
                        <h3>Budget vs balanced vs premium</h3>
                      </div>
                      <button className="secondary-btn" onClick={() => setShowCompare(!showCompare)}>
                        {showCompare ? "Hide details" : "Show details"}
                      </button>
                    </div>

                    <div className="compare-summary">
                      {[
                        ["Budget", result.budget.name, result.budget.note],
                        ["Best balance", result.title, result.why],
                        ["Premium", result.premium.name, result.premium.note]
                      ].map(([label, name, note], index) => (
                        <article className={`compare-option ${index === 1 ? "recommended" : ""}`} key={label}>
                          <span className="option-label">{label}</span>
                          <h4>{name}</h4>
                          <p>{note}</p>
                        </article>
                      ))}
                    </div>

                    {showCompare && (
                      <div className="compare-details">
                        {[
                          ["Budget", result.budget.name, result.budget.effort, result.budget.usage],
                          ["Best balance", result.title, result.effort, result.usage],
                          ["Premium", result.premium.name, result.premium.effort, result.premium.usage]
                        ].map(([label, name, effort, usage], index) => (
                          <article className={`compare-option ${index === 1 ? "recommended" : ""}`} key={label}>
                            <div className="compare-detail-row">
                              <span><strong>{name}</strong></span>
                              <span>Effort: <strong>{effort}</strong></span>
                              <span>Expected usage: <strong>{usage}</strong></span>
                            </div>
                          </article>
                        ))}
                      </div>
                    )}
                  </article>

                  <article className="card prompt-card">
                    <span className="eyebrow">{result.promptLabel || "Ready-to-use prompt"}</span>
                    <textarea readOnly value={readyPrompt} />
                    <button className="primary-btn small" onClick={copyPrompt}>
                      {copied ? "Copied! ✨" : "Copy prompt 📋"}
                    </button>
                  </article>

                  <article className="card note-card">
                    <div className="note-cat">🐾</div>
                    <div>
                      <span className="eyebrow">Tiny reminder</span>
                      <p>{result.upgrade}</p>
                    </div>
                  </article>
                </section>
              )}
            </>
          )}

          {view === "history" && (
            <section className="card collection-card">
              <span className="eyebrow">Your routes</span>
              <h2>History</h2>
              <p className="collection-intro">
                A record of recommendations generated on this browser and device. It is not synced across devices.
              </p>
              {renderRouteList(history, "No history yet")}
            </section>
          )}

          {view === "saved" && (
            <section className="card collection-card">
              <span className="eyebrow">Keep the useful ones</span>
              <h2>Saved recommendations</h2>
              <p className="collection-intro">
                Click “Save recommendation” on a result to keep it here. Saved items live in this browser on this device.
              </p>
              {renderRouteList(saved, "Nothing saved yet")}
            </section>
          )}
        </section>
      </main>
    </div>
  );
}
