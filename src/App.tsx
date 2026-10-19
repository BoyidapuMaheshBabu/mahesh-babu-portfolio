import { useEffect, useState } from "react";
import type { CSSProperties, ReactNode } from "react";

const GITHUB = "https://github.com/BoyidapuMaheshBabu";
const TERMRUNWAY = GITHUB + "/TermRunway-Android";
const PROBLEM_LOG = GITHUB + "/Problem-Solving-Logic";

type StorySectionProps = {
  id: string;
  index: number;
  className?: string;
  children: ReactNode;
};

function StorySection({ id, index, className = "", children }: StorySectionProps) {
  return (
    <section
      id={id}
      data-story-section
      className={"story-section " + className}
      style={{ zIndex: index + 1 }}
    >
      <div className="section-inner">{children}</div>
    </section>
  );
}

function setInert(element: HTMLElement, value: boolean) {
  (element as HTMLElement & { inert: boolean }).inert = value;
}

function useScrollStory() {
  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("[data-story-section]")
    );
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    document.documentElement.classList.add("motion-ready");

    let raf = 0;

    const update = () => {
      raf = 0;
      const vh = window.innerHeight;

      if (reduce.matches) {
        sections.forEach((section) => {
          section.style.setProperty("--p", "1");
          setInert(section, false);
        });
        return;
      }

      const rects = sections.map((section) => section.getBoundingClientRect());

      sections.forEach((section, index) => {
        const rect = rects[index];
        const progress = Math.min(1, Math.max(0, (vh - rect.top) / vh));
        section.style.setProperty("--p", progress.toFixed(3));

        const next = rects[index + 1];
        const coveredByNext = Boolean(next && next.top <= 1);
        const belowViewport = rect.top >= vh - 1;

        setInert(section, coveredByNext || belowViewport);
      });
    };

    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    reduce.addEventListener?.("change", schedule);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      reduce.removeEventListener?.("change", schedule);
      document.documentElement.classList.remove("motion-ready");
    };
  }, []);
}

function Hero() {
  const name = "MAHESH BABU";

  return (
    <StorySection id="top" index={0} className="hero-section">
      <div className="hero">
        <p className="eyebrow hero-eyebrow">Early-career software engineer</p>

        <h1 className="hero-name" aria-label={name}>
          <span aria-hidden="true" className="hero-name-chars">
            {name.split(" ").map((word, wordIndex) => (
              <span className="word" key={word + "-" + wordIndex}>
                {word.split("").map((char, charIndex) => (
                  <span
                    className="char"
                    key={char + "-" + charIndex}
                    style={{ "--i": wordIndex * 8 + charIndex } as CSSProperties}
                  >
                    {char}
                  </span>
                ))}
              </span>
            ))}
          </span>
        </h1>

        <p className="hero-role">AI Software Engineer</p>

        <p className="hero-line">
          AI is my assistant, not my replacement. I use it to move faster while
          staying responsible for the reasoning, review, and result.
        </p>

        <a className="scroll-cue" href="#mindset">
          Scroll to explore <span aria-hidden="true">↓</span>
        </a>
      </div>
    </StorySection>
  );
}

function Mindset() {
  return (
    <StorySection id="mindset" index={1}>
      <div className="section-grid">
        <div className="section-heading">
          <p className="eyebrow reveal">Engineering mindset</p>
          <h2 className="section-title reveal" data-delay="1">
            I start with the problem.
          </h2>
        </div>

        <div className="copy-stack">
          <p className="lead reveal" data-delay="2">
            Not with a framework, and not with the first AI-generated answer. I
            break the problem down, decide what the product actually needs, then
            use the tools that fit. AI helps me move faster; I remain responsible
            for the reasoning, the review, and the result.
          </p>

          <ul className="principle-list">
            <li className="reveal" data-delay="3">
              <span>01</span>
              <div>
                <strong>Understand before building.</strong>
                <p>
                  Read the problem, find the constraints, and decide what the
                  smallest useful version should do.
                </p>
              </div>
            </li>

            <li className="reveal" data-delay="4">
              <span>02</span>
              <div>
                <strong>Make product decisions.</strong>
                <p>
                  Treat AI output as a proposal, not an instruction. Keep the
                  choices that fit the user and the problem.
                </p>
              </div>
            </li>

            <li className="reveal" data-delay="5">
              <span>03</span>
              <div>
                <strong>Verify before trusting.</strong>
                <p>
                  Review the code, test the behaviour, and stay accountable for
                  what ships.
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </StorySection>
  );
}

function TermRunway() {
  return (
    <StorySection id="termrunway" index={2}>
      <div className="project-layout">
        <div className="section-heading">
          <p className="eyebrow reveal">Selected project / Android</p>
          <h2 className="section-title reveal" data-delay="1">
            TermRunway
          </h2>
          <p className="lead reveal" data-delay="2">
            A student-focused, offline-first personal finance and budget-tracking
            Android project. Its direction includes daily expense tracking,
            semester budget planning, income and expense categories, financial
            insights, and JSON backup/restore.
          </p>

          <div className="actions reveal" data-delay="3">
            <a
              className="button primary"
              href={TERMRUNWAY}
              target="_blank"
              rel="noreferrer"
            >
              Open the repository
            </a>
          </div>
        </div>

        <aside className="project-panel reveal" data-delay="2">
          <p className="panel-label">Engineering decisions</p>

          <ul className="decision-list">
            <li>
              <span>Approach</span>
              <p>
                Native Android for a practical, installable tool rather than a
                prototype that only works in a browser.
              </p>
            </li>
            <li>
              <span>Offline first</span>
              <p>
                Local data and JSON backup/restore keep the core experience
                useful without depending on a server.
              </p>
            </li>
            <li>
              <span>Student-shaped</span>
              <p>
                The product is framed around semester budgets and real student
                spending, not generic enterprise finance.
              </p>
            </li>
          </ul>

          <p className="status-note">
            Status: early project. Feature completeness, independent validation,
            and public release are not claimed here. Verify the current
            implementation in the repository.
          </p>
        </aside>
      </div>
    </StorySection>
  );
}

function ProblemSolving() {
  return (
    <StorySection id="problem-solving" index={3}>
      <div className="split-layout">
        <div className="section-heading">
          <p className="eyebrow reveal">Problem-solving evidence</p>
          <h2 className="section-title reveal" data-delay="1">
            Practice is the evidence.
          </h2>
        </div>

        <div className="copy-stack">
          <p className="lead reveal" data-delay="2">
            I keep a public problem-solving log to strengthen programming logic
            and reasoning fundamentals in C, Java, and Python. The goal is not to
            collect technologies; it is to get better at breaking a problem into
            steps and making the solution correct.
          </p>

          <p className="honesty reveal" data-delay="3">
            No solved-problem counts, rankings, or contribution statistics are
            displayed here because this site does not verify them. Open the
            repository to inspect the actual work.
          </p>

          <div className="actions reveal" data-delay="4">
            <a
              className="button secondary"
              href={PROBLEM_LOG}
              target="_blank"
              rel="noreferrer"
            >
              Open Problem-Solving-Logic
            </a>
          </div>
        </div>
      </div>
    </StorySection>
  );
}

type Repo = {
  full_name: string;
  description: string | null;
  language: string | null;
  default_branch: string;
  updated_at: string;
};

type RepoItem = {
  name: string;
  path: string;
  type: string;
  html_url: string;
};

type LoadState = "loading" | "success" | "error";

function GitHubExplorer() {
  const [state, setState] = useState<LoadState>("loading");
  const [repo, setRepo] = useState<Repo | null>(null);
  const [items, setItems] = useState<RepoItem[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    const api =
      "https://api.github.com/repos/BoyidapuMaheshBabu/TermRunway-Android";

    const load = async () => {
      setState("loading");
      setError("");

      try {
        const repoResponse = await fetch(api, {
          signal: controller.signal,
          headers: { Accept: "application/vnd.github+json" },
        });

        if (!repoResponse.ok) {
          throw new Error("GitHub API returned " + repoResponse.status);
        }

        const repoData = (await repoResponse.json()) as Repo;
        let contents: RepoItem[] = [];

        const contentsResponse = await fetch(api + "/contents", {
          signal: controller.signal,
          headers: { Accept: "application/vnd.github+json" },
        });

        if (contentsResponse.ok) {
          const data: unknown = await contentsResponse.json();
          if (Array.isArray(data)) {
            contents = (data as RepoItem[])
              .slice(0, 10)
              .map(({ name, path, type, html_url }) => ({
                name,
                path,
                type,
                html_url,
              }));
          }
        }

        setRepo(repoData);
        setItems(contents);
        setState("success");
      } catch (err) {
        if (controller.signal.aborted) return;
        setError(
          err instanceof Error ? err.message : "Unable to load repository data."
        );
        setState("error");
      }
    };

    load();
    return () => controller.abort();
  }, []);

  return (
    <StorySection id="source" index={4} className="source-section">
      <div className="explorer reveal" data-delay="1">
        <div className="explorer-topbar">
          <div className="window-dots" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <p className="explorer-title">Public GitHub API / read-only</p>
          <a href={TERMRUNWAY} target="_blank" rel="noreferrer">
            Open on GitHub
          </a>
        </div>

        <div className="explorer-body">
          <aside className="explorer-sidebar">
            <p className="panel-label">Repository</p>

            {state === "loading" && (
              <p className="explorer-muted" role="status">
                Loading public repository data…
              </p>
            )}

            {state === "error" && (
              <div className="explorer-error" role="alert">
                <p>{error}</p>
                <a href={TERMRUNWAY} target="_blank" rel="noreferrer">
                  View repository directly
                </a>
              </div>
            )}

            {repo && state === "success" && (
              <>
                <p className="repo-name">{repo.full_name}</p>
                <p className="explorer-muted">
                  {repo.description ?? "No description provided."}
                </p>

                <dl className="repo-meta">
                  <div>
                    <dt>Language</dt>
                    <dd>{repo.language ?? "Not reported"}</dd>
                  </div>
                  <div>
                    <dt>Default branch</dt>
                    <dd>{repo.default_branch}</dd>
                  </div>
                  <div>
                    <dt>Updated</dt>
                    <dd>{new Date(repo.updated_at).toLocaleDateString()}</dd>
                  </div>
                </dl>
              </>
            )}
          </aside>

          <div className="explorer-main">
            <div className="explorer-main-head">
              <span>Root contents</span>
              <span>{items.length ? items.length + " shown" : ""}</span>
            </div>

            {state === "loading" && (
              <div className="skeleton-list" aria-hidden="true">
                <span />
                <span />
                <span />
                <span />
              </div>
            )}

            {state === "success" &&
              (items.length ? (
                <ul className="file-list">
                  {items.map((item) => (
                    <li key={item.path}>
                      <a
                        href={item.html_url}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <span className={"file-kind " + item.type}>
                          {item.type === "dir" ? "DIR" : "FILE"}
                        </span>
                        <span>{item.name}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="explorer-muted">
                  Repository metadata loaded. Root contents are unavailable from
                  this API response.
                </p>
              ))}

            {state === "error" && (
              <p className="explorer-muted">
                The explorer is unavailable right now. The repository link remains
                functional.
              </p>
            )}

            <p className="explorer-footnote">
              This panel fetches public data from GitHub’s REST API. It is
              read-only and does not edit or push to any repository.
            </p>
          </div>
        </div>
      </div>
    </StorySection>
  );
}

function Learning() {
  const directions = [
    "Software architecture",
    "Backend development",
    "Authentication",
    "Security",
    "Testing",
    "AI-assisted software tools",
  ];

  return (
    <StorySection id="learning" index={5}>
      <div className="section-grid">
        <div className="section-heading">
          <p className="eyebrow reveal">Learning and direction</p>
          <h2 className="section-title reveal" data-delay="1">
            Building the engineering underneath.
          </h2>
        </div>

        <div className="copy-stack">
          <p className="lead reveal" data-delay="2">
            I am an early-career Diploma Computer Science student. My current
            focus is turning unclear problems into working software, and getting
            better at the engineering underneath. These are learning directions,
            not claims of completed expertise.
          </p>

          <ul className="direction-list">
            {directions.map((direction, index) => (
              <li
                className="reveal"
                data-delay={String(index + 3)}
                key={direction}
              >
                {direction}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </StorySection>
  );
}

function Explore() {
  return (
    <StorySection id="explore" index={6}>
      <div className="explore">
        <p className="eyebrow reveal">Explore further</p>
        <h2 className="explore-title reveal" data-delay="1">
          The repositories are the source of truth.
        </h2>
        <p className="lead reveal" data-delay="2">
          Start with TermRunway, then inspect the problem-solving log and the rest
          of my GitHub work. Links open the real repositories.
        </p>

        <div className="actions reveal" data-delay="3">
          <a
            className="button primary"
            href={TERMRUNWAY}
            target="_blank"
            rel="noreferrer"
          >
            TermRunway repository
          </a>
          <a
            className="button secondary"
            href={PROBLEM_LOG}
            target="_blank"
            rel="noreferrer"
          >
            Problem-Solving-Logic
          </a>
          <a
            className="button ghost"
            href={GITHUB}
            target="_blank"
            rel="noreferrer"
          >
            GitHub profile
          </a>
        </div>
      </div>
    </StorySection>
  );
}

export default function App() {
  useScrollStory();

  return (
    <main className="story">
      <Hero />
      <Mindset />
      <TermRunway />
      <ProblemSolving />
      <GitHubExplorer />
      <Learning />
      <Explore />
    </main>
  );
}