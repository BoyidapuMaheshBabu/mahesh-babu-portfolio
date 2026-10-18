import { useEffect, useState } from 'react';
import TechText from './components/TechText.jsx';

const engineeringSteps = [
  {
    number: '01',
    title: 'Problem',
    description: 'Start with a real need worth solving.',
  },
  {
    number: '02',
    title: 'Research',
    description: 'Explore context, constraints, and options.',
  },
  {
    number: '03',
    title: 'Decide',
    description: 'Choose a clear direction and explain why.',
  },
  {
    number: '04',
    title: 'Build',
    description: 'Turn the decision into working software.',
  },
  {
    number: '05',
    title: 'Test',
    description: 'Check behavior against expectations.',
  },
  {
    number: '06',
    title: 'Review',
    description: 'Inspect outcomes, trade-offs, and gaps.',
  },
  {
    number: '07',
    title: 'Improve',
    description: 'Refine the product using evidence.',
  },
];

export default function App() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateScrollProgress = () => {
      const root = document.documentElement;
      const maxScroll = root.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY || root.scrollTop || 0;
      const nextProgress = maxScroll > 0
        ? Math.min(100, Math.max(0, (currentScroll / maxScroll) * 100))
        : 0;
      setScrollProgress(nextProgress);
    };

    // Match the main-branch motion system: reveal each section once it enters view.
    const revealItems = document.querySelectorAll('[data-reveal]');
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let revealObserver;

    if (reduceMotion) {
      revealItems.forEach(item => item.classList.add('is-visible'));
    } else if ('IntersectionObserver' in window) {
      revealObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        });
      }, { threshold: 0.12 });
      revealItems.forEach(item => revealObserver.observe(item));
    } else {
      revealItems.forEach(item => item.classList.add('is-visible'));
    }

    updateScrollProgress();
    window.addEventListener('scroll', updateScrollProgress, { passive: true });
    window.addEventListener('resize', updateScrollProgress, { passive: true });

    return () => {
      window.removeEventListener('scroll', updateScrollProgress);
      window.removeEventListener('resize', updateScrollProgress);
      revealObserver?.disconnect();
    };
  }, []);

  return (
    <main className="portfolio-page">
      <div
        className="scroll-progress"
        role="progressbar"
        aria-label="Page scroll progress"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(scrollProgress)}
      >
        <span style={{ width: `${scrollProgress}%` }} />
      </div>

      <section className="stage hero-stage" aria-labelledby="portfolio-name">
        <h1 id="portfolio-name" className="sr-only">
          Mahesh Babu — AI-Native Software Engineer and Product Builder
        </h1>

        <div className="identity-lockup" data-reveal>
          <div className="wordmark" aria-hidden="true">
            <TechText
              text="MAHESH BABU"
              fontFamily="'Oxanium', sans-serif"
              fontWeight={600}
              fontSize={260}
              letterSpacing={-0.05}
              color="#f8fafc"
              accentColor="#38bdf8"
              reveal="letter"
              dashLength={4}
              dashGap={2}
              specks={15}
              intro="none"
              clickKick
              guides={false}
            />
          </div>
          <div className="identity-tags">
            <div className="ai-native-tag" aria-label="AI-native software engineer">
              <span className="ai-native-tag__indicator" aria-hidden="true" />
              <span>AI-NATIVE SOFTWARE ENGINEER</span>
            </div>
            <div className="ai-native-tag product-tag" aria-label="Product builder">
              <span className="ai-native-tag__indicator" aria-hidden="true" />
              <span>PRODUCT BUILDER</span>
            </div>
            <div className="ai-native-tag additional-tag" aria-label="Problem solver">
              <span className="ai-native-tag__indicator" aria-hidden="true" />
              <span>PROBLEM SOLVER</span>
            </div>
            <div className="ai-native-tag additional-tag" aria-label="Logical thinker">
              <span className="ai-native-tag__indicator" aria-hidden="true" />
              <span>LOGICAL THINKER</span>
            </div>
            <div className="ai-native-tag additional-tag" aria-label="Client-side thinker">
              <span className="ai-native-tag__indicator" aria-hidden="true" />
              <span>CLIENT-SIDE THINKER</span>
            </div>
            <div className="ai-native-tag additional-tag" aria-label="Adaptive problem solver">
              <span className="ai-native-tag__indicator" aria-hidden="true" />
              <span>ADAPTIVE PROBLEM SOLVER</span>
            </div>
          </div>
        </div>

        <a className="scroll-cue" href="#engineering-loop">
          <span>SCROLL TO EXPLORE</span>
          <span className="scroll-cue__arrow" aria-hidden="true">↓</span>
        </a>
      </section>

      <section
        className="engineering-loop-section"
        id="engineering-loop"
        aria-labelledby="engineering-loop-title"
      >
        <div className="engineering-loop-inner">
          <p className="section-kicker" data-reveal>
            <span className="section-kicker__line" aria-hidden="true" />
            HOW I ENGINEER
          </p>
          <h2 id="engineering-loop-title" data-reveal>
            From problem <span>to product.</span>
          </h2>
          <p className="engineering-loop-intro" data-reveal>
            A repeatable loop for turning an unclear problem into useful,
            tested software — then learning from what happens next.
          </p>

          <div className="engineering-steps">
            {engineeringSteps.map(step => (
              <article className="engineering-step" data-reveal key={step.number}>
                <span className="engineering-step__number">{step.number}</span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </article>
            ))}
          </div>

          <p className="loop-footer" data-reveal>
            <span aria-hidden="true">↻</span>
            Improve, repeat, and keep moving forward.
          </p>
        </div>
      </section>
    </main>
  );
}
