import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TechText from './components/TechText.jsx';

gsap.registerPlugin(useGSAP, ScrollTrigger);

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
  const pageRef = useRef(null);
  const heroSectionRef = useRef(null);
  const incomingSectionRef = useRef(null);
  const progressTrackRef = useRef(null);
  const progressFillRef = useRef(null);
  const cueTimerRef = useRef(0);

  const [scrollCueVisible, setScrollCueVisible] = useState(false);
  const [introPhase, setIntroPhase] = useState('arrival');
  const [identityTagsVisible, setIdentityTagsVisible] = useState(false);

  // Choreograph the opening: clean name arrival, TechText assembly, then role labels.
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;
    if (prefersReducedMotion) {
      setIntroPhase('tech');
      setIdentityTagsVisible(true);
      return undefined;
    }

    const prepareTechText = window.setTimeout(() => setIntroPhase('arming'), 900);
    const activateTechText = window.setTimeout(() => setIntroPhase('tech'), 1100);
    const revealIdentityTags = window.setTimeout(() => setIdentityTagsVisible(true), 2200);

    return () => {
      window.clearTimeout(prepareTechText);
      window.clearTimeout(activateTechText);
      window.clearTimeout(revealIdentityTags);
    };
  }, []);

  useGSAP(() => {
    const root = pageRef.current;
    const heroSection = heroSectionRef.current;
    const incomingSection = incomingSectionRef.current;
    if (!root || !heroSection || !incomingSection) return undefined;

    const reduceMotion = Boolean(
      window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches
    );
    const progressTrack = progressTrackRef.current;
    const progressFill = progressFillRef.current;
    const setProgressScale = progressFill
      ? gsap.quickSetter(progressFill, 'scaleX')
      : null;
    const revealTargets = Array.from(
      incomingSection.querySelectorAll('[data-reveal]')
    );
    const coverRevealTargets = Array.from(
      incomingSection.querySelectorAll('.section-kicker, #engineering-loop-title, .engineering-loop-intro')
    );
    const laterRevealTargets = Array.from(
      incomingSection.querySelectorAll('.engineering-step, .loop-footer')
    );

    const updateProgress = (progress) => {
      const normalized = Math.max(0, Math.min(1, progress));
      setProgressScale?.(normalized);
      progressTrack?.setAttribute(
        'aria-valuenow',
        String(Math.round(normalized * 100))
      );
    };

    const scheduleScrollCue = (delay) => {
      window.clearTimeout(cueTimerRef.current);
      cueTimerRef.current = window.setTimeout(() => {
        if (window.scrollY <= 4) setScrollCueVisible(true);
      }, delay);
    };

    const clearScrollCue = () => {
      window.clearTimeout(cueTimerRef.current);
      setScrollCueVisible(false);
    };

    // Reduced-motion users get a normal, unpinned page with all content visible.
    // For everyone else, pin the hero for exactly one viewport of scroll.
    if (!reduceMotion) {
      ScrollTrigger.create({
        trigger: heroSection,
        start: 'top top',
        end: () => '+=' + Math.max(1, heroSection.offsetHeight),
        pin: true,
        pinSpacing: false,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      });

      // Scrub only the incoming section's heading and introduction during the
      // cover. The panel itself moves naturally with document scroll.
      gsap.set(coverRevealTargets, { autoAlpha: 0, y: 24 });
      gsap.timeline({
        scrollTrigger: {
          trigger: incomingSection,
          start: 'top bottom',
          end: 'top top',
          scrub: 0.2,
          invalidateOnRefresh: true,
          onUpdate: (self) => updateProgress(self.progress),
          onEnter: clearScrollCue,
          onEnterBack: clearScrollCue,
          onLeaveBack: () => {
            updateProgress(0);
            scheduleScrollCue(700);
          },
          onLeave: () => {
            updateProgress(1);
            clearScrollCue();
          },
        },
      }).to(coverRevealTargets, {
        autoAlpha: 1,
        y: 0,
        duration: 0.84,
        stagger: 0.08,
        ease: 'none',
      }, 0.04);

      // Further-down content reveals when it actually enters the viewport,
      // rather than forcing the entire long section to animate during the cover.
      gsap.set(laterRevealTargets, { autoAlpha: 0, y: 20 });
      ScrollTrigger.batch(laterRevealTargets, {
        start: 'top 88%',
        interval: 0.12,
        onEnter: (batch) => {
          gsap.to(batch, {
            autoAlpha: 1,
            y: 0,
            duration: 0.48,
            stagger: 0.055,
            ease: 'power2.out',
            overwrite: 'auto',
            onComplete: () => gsap.set(batch, { clearProps: 'transform' }),
          });
        },
        onLeaveBack: (batch) => {
          gsap.to(batch, {
            autoAlpha: 0,
            y: 16,
            duration: 0.18,
            ease: 'power1.out',
            overwrite: 'auto',
          });
        },
      });
    } else {
      gsap.set(revealTargets, { autoAlpha: 1, y: 0, clearProps: 'filter' });

      // Reduced-motion fallback: ordinary page scrolling, visible content, and
      // lightweight progress/cue updates without pinning or animated reveals.
      ScrollTrigger.create({
        trigger: incomingSection,
        start: 'top bottom',
        end: 'top top',
        invalidateOnRefresh: true,
        onUpdate: (self) => updateProgress(self.progress),
        onEnter: clearScrollCue,
        onEnterBack: clearScrollCue,
        onLeaveBack: () => {
          updateProgress(0);
          scheduleScrollCue(700);
        },
        onLeave: () => {
          updateProgress(1);
          clearScrollCue();
        },
      });
    }

    updateProgress(0);
    ScrollTrigger.refresh();
    // Schedule after refresh so an initial onEnter callback cannot cancel this timer.
    scheduleScrollCue(2700);

    return () => {
      window.clearTimeout(cueTimerRef.current);
    };
  }, { scope: pageRef, dependencies: [] });
  return (
    <main ref={pageRef} className="portfolio-page aura-bg">
      <div className="aura-layer-1" aria-hidden="true" />
      <div className="aura-layer-2" aria-hidden="true" />
      <div className="portfolio-content">
      <div
        ref={progressTrackRef}
        className="scroll-progress"
        role="progressbar"
        aria-label="First section transition progress"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={0}
      >
        <span ref={progressFillRef} />
      </div>

      <section ref={heroSectionRef} className="stage hero-stage" aria-labelledby="portfolio-name">
        <h1 id="portfolio-name" className="sr-only">
          Mahesh Babu — AI-Native Software Engineer and Product Builder
        </h1>

        <div className={`identity-lockup${identityTagsVisible ? ' is-tags-visible' : ''}`}>
          <div className={`wordmark${introPhase === 'tech' ? ' wordmark--tech-active' : ''}`} aria-hidden="true">
            <span className={`wordmark-arrival${introPhase === 'tech' ? ' is-handoff' : ''}`}>
              MAHESH BABU
            </span>
            {introPhase !== 'arrival' && (
              <TechText
                text="MAHESH BABU"
                className="wordmark-tech-layer"
                fontFamily="'Oxanium', sans-serif"
                fontWeight={600}
                fontSize={260}
                letterSpacing={-0.05}
                color="#0f172a"
                accentColor="#2563eb"
                reveal="letter"
                dashLength={4}
                dashGap={2}
                specks={15}
                intro="assemble"
                introDuration={0.95}
                clickKick
                guides={false}
              />
            )}
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

        <button
          className={`scroll-cue${scrollCueVisible ? ' is-visible' : ''}`}
          type="button"
          aria-controls="engineering-loop"
          aria-label="Scroll down to explore the engineering loop"
          aria-hidden={!scrollCueVisible}
          tabIndex={scrollCueVisible ? 0 : -1}
          onClick={() => {
            setScrollCueVisible(false);
            const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;
            incomingSectionRef.current?.scrollIntoView({
              behavior: reduceMotion ? 'auto' : 'smooth',
              block: 'start',
            });
          }}
        >
          <span>SCROLL TO EXPLORE</span>
          <span className="scroll-cue__arrow" aria-hidden="true">↓</span>
        </button>
      </section>

      <section
        ref={incomingSectionRef}
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
      </div>
    </main>
  );
}
