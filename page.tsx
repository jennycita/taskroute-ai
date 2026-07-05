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
  other: "your current tool"
};

function analyzeTask(text: string, tags: string[]) {
  const t = text.toLowerCase();
  const has = (...words: string[]) => words.some((word) => t.includes(word));
  const existing = tags.includes("existing") || has("existing", "already built", "already have", "current app", "redesign");
  const design = tags.includes("design") || has("design", "layout", "color", "typography", "ui", "ux", "css", "style");
  const coding = tags.includes("coding") || has("app", "website", "code", "bug", "feature", "database", "api", "build");
  const research = tags.includes("research") || has("research", "sources", "latest", "compare", "evidence", "paper");
  const writing = tags.includes("writing") || has("write", "rewrite", "draft", "email", "post", "article", "caption");
  const image = tags.includes("image") || has("image", "logo", "illustration", "picture", "poster", "graphic");
  const data = tags.includes("data") || has("spreadsheet", "csv", "dataset", "chart", "analyze data", "excel");

  if (design && existing) return routes.designExisting;
  if (image) return routes.image;
  if (data) return routes.data;
  if (research) return routes.research;
  if (coding) return routes.codingBuild;
  if (writing) return routes.writing;
  return routes.simple;
}

export default function Home() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [task, setTask] = useState("");
  const [priority, setPriority] = useState("balanced");
  const [tags, setTags] = useState<string[]>([]);
  const [tool, setTool] = useState("not-started");
  const [result, setResult] = useState<Route | null>(null);
  const [showCompare, setShowCompare] = useState(false);
  const [copied, setCopied] = useState(false);
  const [view, setView] = useState<"home" | "history" | "saved">("home");
  const [history, setHistory] = useState<SavedRoute[]>([]);
  const [saved, setSaved] = useState<SavedRoute[]>([]);

  useEffect(() => {
    const savedTheme = localStorage.getItem("taskrouteTheme") as "dark" | "light" | null;
    if (savedTheme) setTheme(savedTheme);

    const storedHistory = JSON.parse(localStorage.getItem("taskrouteHistory") || "[]");
    const storedSaved = JSON.parse(localStorage.getItem("taskrouteSaved") || "[]");
    setHistory(storedHistory);
    setSaved(storedSaved);
  }, []);

  useEffect(() => {
    document.body.dataset.theme = theme;
    localStorage.setItem("taskrouteTheme", theme);
  }, [theme]);

  const switchAdvice = useMemo(() => {
    if (!result) return "";
    if (tool === "not-started") return `Start in ${result.workspace}.`;
    const current = toolNames[tool] || "your current tool";
    const match =
      (tool === "chatgpt" && result.title.toLowerCase().includes("chatgpt")) ||
      (tool === "claude" && result.title.toLowerCase().includes("claude")) ||
      (tool === "claude-code" && result.workspace.toLowerCase().includes("claude code")) ||
      (tool === "cursor" && result.workspace.toLowerCase().includes("cursor")) ||
      (tool === "gemini" && result.title.toLowerCase().includes("gemini")) ||
      (tool === "perplexity" && result.title.toLowerCase().includes("perplexity")) ||
      (tool === "replit" && result.workspace.toLowerCase().includes("replit"));

    return match
      ? `Stay in ${current}. Your current setup already fits this task.`
      : `Switch from ${current} to ${result.workspace}.`;
  }, [result, tool]);

  const readyPrompt = useMemo(() => {
    if (!result) return "";
    return `Current tool: ${toolNames[tool]}
Recommended workspace: ${result.workspace}

My task:
${task}

Please use ${result.effort.toLowerCase()} effort. Keep the solution practical, preserve existing functionality when relevant, and avoid unnecessary complexity.`;
  }, [result, task, tool]);

  function toggleTag(tag: string) {
    setTags((current) =>
      current.includes(tag) ? current.filter((item) => item !== tag) : [...current, tag]
    );
  }

  function findRoute() {
    if (!task.trim()) return;
    const match = { ...analyzeTask(task, tags) };
    if (priority === "cost" && match.effort === "Medium") match.usage = "Cost-conscious usage";
    if (priority === "speed") match.usage = "Fast-response setup";
    if (priority === "quality") match.usage = "Higher usage for extra polish";
    setResult(match);

    const item: SavedRoute = {
      id: crypto.randomUUID(),
      task: task.trim(),
      title: match.title,
      workspace: match.workspace,
      effort: match.effort,
      usage: match.usage,
      switchAdvice: "",
      createdAt: new Date().toISOString()
    };

    setTimeout(() => {
      const completedItem = { ...item, switchAdvice };
      setHistory((current) => {
        const updated = [completedItem, ...current].slice(0, 30);
        localStorage.setItem("taskrouteHistory", JSON.stringify(updated));
        return updated;
      });
    }, 0);
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
  }

  function clearTask() {
    setTask("");
    setTags([]);
    setPriority("balanced");
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
          <p>Your recommendations will appear here after you use TaskRoute.</p>
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

          <section className="hero-card">
            <span className="eyebrow">AI routing made simple</span>
            <h2>Use the right AI for the job</h2>
            <p className="hero-copy">
              Describe what you are trying to do, and TaskRoute will recommend the best AI platform,
              model, effort level, and workspace for the task.
            </p>
            <p className="hero-support">
              You will also get a budget option, a premium option, stay-or-switch guidance,
              and a ready-to-use prompt.
            </p>

            <div className="hero-examples">
              <article>
                <span>💻</span>
                <div>
                  <strong>Building something?</strong>
                  <p>Find the right coding workspace and model.</p>
                </div>
              </article>
              <article>
                <span>📚</span>
                <div>
                  <strong>Researching something?</strong>
                  <p>Choose the best tool for current sources and citations.</p>
                </div>
              </article>
              <article>
                <span>🔁</span>
                <div>
                  <strong>Already working?</strong>
                  <p>Learn whether to stay with your current setup or switch.</p>
                </div>
              </article>
            </div>
          </section>

          <section className="card task-card">
            <div className="card-heading">
              <div>
                <span className="eyebrow">✨ Tell me the task</span>
                <h2>Describe your task</h2>
              </div>
              <div className="cat-doodle">🐈‍⬛ 💻</div>
            </div>

            <textarea
              maxLength={500}
              value={task}
              onChange={(event) => setTask(event.target.value)}
              placeholder="Example: I built an app and only want to change the design. Which tool, model, and effort level should I use?"
            />

            <div className="input-footer">
              <div className="examples">
                <button className="example-chip" onClick={() => setTask("Build a simple web app that helps me organize my weekly goals.")}>Build a simple app</button>
                <button className="example-chip" onClick={() => setTask("I already built an app. I want to change the colors, typography, and layout without changing the logic.")}>Redesign my interface</button>
                <button className="example-chip" onClick={() => setTask("Research the latest options for choosing the best AI model for different tasks and compare the tradeoffs.")}>Research a topic</button>
              </div>
              <span>{task.length}/500</span>
            </div>

            <div className="priority-row">
              <span>What matters most?</span>
              {[
                ["balanced", "🌈 Balanced"],
                ["cost", "💰 Cost"],
                ["speed", "⚡ Speed"],
                ["quality", "⭐ Quality"]
              ].map(([value, label]) => (
                <button key={value} className={`pill ${priority === value ? "selected" : ""}`} onClick={() => setPriority(value)}>
                  {label}
                </button>
              ))}
            </div>

            <div className="task-tags">
              {[
                ["coding", "💻 Coding"],
                ["design", "🎨 Design"],
                ["research", "📚 Research"],
                ["writing", "✍️ Writing"],
                ["image", "🖼️ Images"],
                ["data", "📊 Data"],
                ["existing", "🧩 Existing project"]
              ].map(([value, label]) => (
                <button key={value} className={`tag ${tags.includes(value) ? "active" : ""}`} onClick={() => toggleTag(value)}>
                  {label}
                </button>
              ))}
            </div>

            <div className="current-tool-block">
              <div className="section-label-row">
                <span>Where are you working right now?</span>
                <small>This helps decide whether you should stay or switch.</small>
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
                  <button className="secondary-btn" onClick={saveRecommendation}>♡ Save recommendation</button>
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
                <span className="eyebrow">Ready-to-use prompt</span>
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
              <p className="collection-intro">A record of the recommendations TaskRoute has generated on this device.</p>
              {renderRouteList(history, "No history yet")}
            </section>
          )}

          {view === "saved" && (
            <section className="card collection-card">
              <span className="eyebrow">Keep the useful ones</span>
              <h2>Saved recommendations</h2>
              <p className="collection-intro">Recommendations you saved for later.</p>
              {renderRouteList(saved, "Nothing saved yet")}
            </section>
          )}
        </section>
      </main>
    </div>
  );
}
