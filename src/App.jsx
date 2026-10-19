import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import TechText from './components/TechText.jsx';

gsap.registerPlugin(useGSAP);

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
  const activeSectionRef = useRef(0);
  const isTransitioningRef = useRef(false);
  const navigationRef = useRef(null);

  const [activeSection, setActiveSection] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrollCueVisible, setScrollCueVisible] = useState(false);
  const { contextSafe } = useGSAP({ scope: pageRef });
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
    const sections = Array.from(root?.querySelectorAll('[data-fullpage-section]') ?? []);
    if (!root || sections.length === 0) return undefined;

    const reduceMotion = Boolean(
      window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches
    );
    let transitionTimeline = null;
    let cueTimer = 0;
    let wheelIdleTimer = 0;
    let wheelMode = null;
    let wheelAccumulated = 0;
    let wheelDirection = 0;
    let touchStart = null;

    const resetWheelGesture = () => {
      wheelMode = null;
      wheelAccumulated = 0;
      wheelDirection = 0;
    };

    const scheduleWheelReset = () => {
      window.clearTimeout(wheelIdleTimer);
      wheelIdleTimer = window.setTimeout(resetWheelGesture, 210);
    };

    const canScrollPanel = (panel, direction) => {
      if (!panel) return false;
      const maxScroll = panel.scrollHeight - panel.clientHeight;
      if (maxScroll <= 3) return false;
      return direction > 0
        ? panel.scrollTop < maxScroll - 3
        : panel.scrollTop > 3;
    };

    const scheduleScrollCue = (delay) => {
      window.clearTimeout(cueTimer);
      cueTimer = window.setTimeout(() => {
        if (activeSectionRef.current === 0 && !isTransitioningRef.current) {
          setScrollCueVisible(true);
        }
      }, delay);
    };

    const setSectionProgress = (index) => {
      const progress = sections.length > 1
        ? (index / (sections.length - 1)) * 100
        : 0;
      setScrollProgress(progress);
    };

    // One active full-screen section; inactive sections sit out of view.
    gsap.set(sections, {
      autoAlpha: 0,
      yPercent: 100,
      scale: 0.99,
      zIndex: 0,
      force3D: true,
    });

    sections.forEach((section) => {
      gsap.set(section.querySelectorAll('[data-reveal]'), {
        autoAlpha: 0,
        y: 28,
        filter: 'blur(5px)',
      });
    });

    gsap.set(sections[0], {
      autoAlpha: 1,
      yPercent: 0,
      scale: 1,
      zIndex: 2,
    });

    activeSectionRef.current = 0;
    isTransitioningRef.current = false;
    setActiveSection(0);
    setSectionProgress(0);

    const navigateToSection = contextSafe((requestedIndex) => {
      if (!Number.isFinite(requestedIndex) || isTransitioningRef.current) return;

      const targetIndex = Math.max(0, Math.min(sections.length - 1, requestedIndex));
      const currentIndex = activeSectionRef.current;
      if (targetIndex === currentIndex) return;

      const outgoing = sections[currentIndex];
      const incoming = sections[targetIndex];
      if (!outgoing || !incoming) return;

      isTransitioningRef.current = true;
      window.clearTimeout(cueTimer);
      setScrollCueVisible(false);

      const focusedElement = document.activeElement;
      if (
        focusedElement &&
        outgoing.contains(focusedElement) &&
        typeof focusedElement.blur === 'function'
      ) {
        focusedElement.blur();
      }

      activeSectionRef.current = targetIndex;
      setActiveSection(targetIndex);
      setSectionProgress(targetIndex);

      const direction = targetIndex > currentIndex ? 1 : -1;
      const contentTargets = Array.from(
        targetIndex === 0
          ? incoming.querySelectorAll('.identity-lockup')
          : incoming.querySelectorAll('[data-reveal]')
      );

      contentTargets.forEach((element) => element.classList.add('is-entrance-animating'));

      gsap.set(incoming, {
        autoAlpha: 1,
        yPercent: direction > 0 ? 100 : -100,
        scale: 1,
        zIndex: 10,
      });
      gsap.set(contentTargets, {
        autoAlpha: 0,
        y: 34,
        filter: 'blur(5px)',
      });

      const finishTransition = () => {
        sections.forEach((section, index) => {
          if (index === targetIndex) {
            gsap.set(section, { autoAlpha: 1, yPercent: 0, scale: 1, zIndex: 2 });
          } else {
            gsap.set(section, {
              autoAlpha: 0,
              yPercent: index < targetIndex ? -5 : 100,
              scale: 1,
              zIndex: 0,
            });
          }
        });

        contentTargets.forEach((element) => element.classList.remove('is-entrance-animating'));
        isTransitioningRef.current = false;
        transitionTimeline = null;

        if (targetIndex === 0) scheduleScrollCue(1350);
      };

      if (reduceMotion) {
        gsap.set(outgoing, {
          autoAlpha: 0,
          yPercent: direction > 0 ? -5 : 5,
          scale: 1,
          zIndex: 0,
        });
        gsap.set(incoming, { autoAlpha: 1, yPercent: 0, scale: 1, zIndex: 2 });
        gsap.set(contentTargets, { autoAlpha: 1, y: 0, filter: 'blur(0px)' });
        finishTransition();
        return;
      }

      // The incoming section covers the previous section while its content reveals
      // before the covering movement finishes.
      transitionTimeline = gsap.timeline({
        defaults: { overwrite: 'auto' },
        onComplete: finishTransition,
      });

      transitionTimeline.to(outgoing, {
        yPercent: direction > 0 ? -4 : 4,
        scale: 0.985,
        autoAlpha: 0.88,
        duration: 0.86,
        ease: 'power2.inOut',
      }, 0);

      transitionTimeline.to(incoming, {
        yPercent: 0,
        scale: 1,
        duration: 0.92,
        ease: 'power4.inOut',
      }, 0);

      if (contentTargets.length > 0) {
        transitionTimeline.to(contentTargets, {
          autoAlpha: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.58,
          stagger: targetIndex === 0 ? 0 : 0.065,
          ease: 'power3.out',
        }, 0.24);
      }
    });

    navigationRef.current = navigateToSection;
    scheduleScrollCue(2700);

    const handleWheel = (event) => {
      // Preserve browser zoom and horizontal trackpad gestures.
      if (event.ctrlKey || Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;

      const multiplier = event.deltaMode === 1
        ? 16
        : event.deltaMode === 2
          ? window.innerHeight
          : 1;
      const delta = event.deltaY * multiplier;
      if (!delta) return;
      const direction = Math.sign(delta);

      if (isTransitioningRef.current) {
        if (event.cancelable) event.preventDefault();
        wheelMode = 'locked';
        scheduleWheelReset();
        return;
      }

      // Choose native panel scrolling or section navigation once per wheel burst.
      if (!wheelMode) {
        const currentPanel = sections[activeSectionRef.current];
        wheelMode = canScrollPanel(currentPanel, direction) ? 'native' : 'navigate';
      }

      if (wheelMode === 'native') {
        scheduleWheelReset();
        return;
      }

      if (event.cancelable) event.preventDefault();

      if (wheelMode === 'locked' || wheelMode === 'consumed') {
        scheduleWheelReset();
        return;
      }

      if (wheelDirection !== direction) {
        wheelAccumulated = 0;
        wheelDirection = direction;
      }
      wheelAccumulated += delta;

      if (Math.abs(wheelAccumulated) >= 62) {
        const nextIndex = activeSectionRef.current + direction;
        wheelMode = 'consumed';
        wheelAccumulated = 0;
        wheelDirection = 0;
        navigateToSection(nextIndex);
      }

      scheduleWheelReset();
    };

    const handleTouchStart = (event) => {
      if (event.touches.length !== 1 || isTransitioningRef.current) {
        touchStart = null;
        return;
      }

      const touch = event.touches[0];
      const index = activeSectionRef.current;
      const panel = sections[index];
      touchStart = {
        x: touch.clientX,
        y: touch.clientY,
        index,
        canScrollDown: canScrollPanel(panel, 1),
        canScrollUp: canScrollPanel(panel, -1),
      };
    };

    const handleTouchEnd = (event) => {
      if (!touchStart || isTransitioningRef.current || !event.changedTouches.length) {
        touchStart = null;
        return;
      }

      const start = touchStart;
      touchStart = null;
      if (start.index !== activeSectionRef.current) return;

      const touch = event.changedTouches[0];
      const deltaY = start.y - touch.clientY;
      const deltaX = start.x - touch.clientX;
      if (Math.abs(deltaY) < 58 || Math.abs(deltaY) < Math.abs(deltaX) * 1.12) return;

      const direction = deltaY > 0 ? 1 : -1;
      // Let an overflowing section scroll naturally before changing sections.
      if (direction > 0 ? start.canScrollDown : start.canScrollUp) return;

      navigateToSection(start.index + direction);
    };

    const handleTouchCancel = () => {
      touchStart = null;
    };

    const handleKeyDown = (event) => {
      if (event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey) return;

      const target = event.target instanceof Element ? event.target : null;
      if (target?.closest('input, textarea, select, button, a, [role="button"], [contenteditable="true"]')) return;

      let direction = 0;
      let targetIndex = activeSectionRef.current;

      if (event.key === 'ArrowDown' || event.key === 'PageDown' || event.key === ' ') direction = 1;
      else if (event.key === 'ArrowUp' || event.key === 'PageUp') direction = -1;
      else if (event.key === 'Home') targetIndex = 0;
      else if (event.key === 'End') targetIndex = sections.length - 1;
      else return;

      if (direction !== 0) {
        const currentPanel = sections[activeSectionRef.current];
        if (canScrollPanel(currentPanel, direction)) {
          event.preventDefault();
          currentPanel.scrollBy({
            top: direction * Math.max(120, currentPanel.clientHeight * 0.72),
            behavior: reduceMotion ? 'auto' : 'smooth',
          });
          return;
        }
        targetIndex += direction;
      }

      event.preventDefault();
      navigateToSection(targetIndex);
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    window.addEventListener('touchcancel', handleTouchCancel, { passive: true });
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.clearTimeout(cueTimer);
      window.clearTimeout(wheelIdleTimer);
      transitionTimeline?.kill();
      navigationRef.current = null;
      isTransitioningRef.current = false;
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('touchcancel', handleTouchCancel);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, { scope: pageRef, dependencies: [] });
  return (
    <main ref={pageRef} className="portfolio-page aura-bg">
      <div className="aura-layer-1" aria-hidden="true" />
      <div className="aura-layer-2" aria-hidden="true" />
      <div className="portfolio-content">
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

      <section className="site-section stage hero-stage" data-fullpage-section="true" data-section-index="0" aria-hidden={activeSection !== 0} inert={activeSection !== 0} aria-labelledby="portfolio-name">
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
            navigationRef.current?.(1);
          }}
        >
          <span>SCROLL TO EXPLORE</span>
          <span className="scroll-cue__arrow" aria-hidden="true">↓</span>
        </button>
      </section>

      <section
        className="site-section engineering-loop-section"
        data-fullpage-section="true"
        data-section-index="1"
        id="engineering-loop"
        aria-hidden={activeSection !== 1}
        inert={activeSection !== 1}
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
