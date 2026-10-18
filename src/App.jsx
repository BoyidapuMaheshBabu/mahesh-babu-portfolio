import TechText from './components/TechText.jsx';

const principles = [
  { number: '01', label: 'PROBLEM', detail: 'Start with what matters.' },
  { number: '02', label: 'BUILD', detail: 'Turn ideas into software.' },
  { number: '03', label: 'VERIFY', detail: 'Trust evidence, not guesses.' },
];

function BrandMark() {
  return (
    <a className="brand" href="#home" aria-label="Mahesh Babu home">
      <span className="brand-mark">M<span>.</span></span>
      <span className="brand-name">MAHESH <span>BABU</span></span>
    </a>
  );
}

function CodePanel() {
  return (
    <div className="code-panel" aria-label="A sample code snippet illustrating the engineering mindset">
      <div className="code-panel-top">
        <div className="window-dots" aria-hidden="true"><i /><i /><i /></div>
        <span className="file-name"><span className="file-symbol">JS</span> mission.js</span>
        <span className="panel-status"><i /> READY</span>
      </div>
      <div className="code-lines" aria-hidden="true">
        <div><span className="line-number">01</span><span className="syntax-muted">const</span> <span className="syntax-name">mission</span> <span className="syntax-punc">=</span> <span className="syntax-string">"turn ideas into software"</span><span className="syntax-punc">;</span></div>
        <div><span className="line-number">02</span><span className="syntax-muted">const</span> <span className="syntax-name">approach</span> <span className="syntax-punc">=</span> <span className="syntax-punc">[</span></div>
        <div><span className="line-number">03</span>  <span className="syntax-string">"understand"</span><span className="syntax-punc">,</span> <span className="syntax-string">"build"</span><span className="syntax-punc">,</span> <span className="syntax-string">"verify"</span></div>
        <div><span className="line-number">04</span><span className="syntax-punc">];</span><span className="cursor-block" /></div>
      </div>
      <div className="code-panel-bottom">
        <span><i className="status-dot" /> ENGINEERING MINDSET</span>
        <span>UTF-8 <b>·</b> JS</span>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <div className="site-shell" id="home">
      <div className="ambient ambient-blue" aria-hidden="true" />
      <div className="ambient ambient-cyan" aria-hidden="true" />
      <div className="background-grid" aria-hidden="true" />
      <div className="circuit circuit-left" aria-hidden="true"><i /><i /><i /><i /></div>
      <div className="circuit circuit-right" aria-hidden="true"><i /><i /><i /><i /></div>

      <header className="site-header">
        <BrandMark />
        <nav className="header-nav" aria-label="Main navigation">
          <a href="#approach">Approach</a>
          <a href="#principles">Principles</a>
        </nav>
        <a className="header-status" href="https://github.com/BoyidapuMaheshBabu" target="_blank" rel="noreferrer">
          <span className="status-light" /> BUILDING IN PUBLIC <span className="status-arrow">↗</span>
        </a>
      </header>

      <main>
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-index"><span /> PORTFOLIO / ENGINEERING LOG <span className="index-rule" /> 001—026</div>
          <div className="hero-content">
            <div className="hero-overline"><span className="overline-bracket">[</span> SOFTWARE <span className="overline-divider">/</span> PRODUCT <span className="overline-divider">/</span> PROBLEM SOLVING <span className="overline-bracket">]</span></div>
            {/* Visually-hidden h1 preserves accessible heading + SEO */}
            <h1 id="hero-title" className="sr-only">Mahesh Babu — AI Software Engineer</h1>

            {/* Interactive TechText wordmark */}
            <div className="hero-wordmark" aria-hidden="true">
              <TechText
                text="MAHESH BABU"
                fontFamily="'Space Grotesk', sans-serif"
                fontWeight={600}
                fontSize={150}
                letterSpacing={-0.05}
                color="#f2f7ff"
                accentColor="#66e4ee"
                reveal="letter"
                dashLength={4}
                dashGap={2}
                specks={15}
                intro="none"
                introDuration={2}
                clickKick
                guides={false}
              />
            </div>
            <div className="role-line"><span className="role-rule" /><p>AI SOFTWARE <strong>ENGINEER</strong></p><span className="role-rule" /></div>
            <p className="hero-description">
              I turn problems into practical software, learning the engineering behind every step.
            </p>
            <div className="hero-actions">
              <a className="primary-action" href="#approach">Explore the approach <span>↘</span></a>
              <a className="text-action" href="https://github.com/BoyidapuMaheshBabu" target="_blank" rel="noreferrer">GitHub profile <span>↗</span></a>
            </div>
          </div>

          <div className="hero-decoration decoration-top" aria-hidden="true"><span className="decoration-cross">+</span><span>SYS.01</span></div>
          <div className="hero-decoration decoration-bottom" aria-hidden="true"><span>IDEA</span><i /><span>IMPLEMENTATION</span><i /><span>RESULT</span></div>
          <CodePanel />
          <div className="hero-side-note" aria-hidden="true"><span className="side-line" /> CURRENT MODE <b>BUILD / LEARN / REPEAT</b></div>
        </section>

        <section className="approach-section" id="approach">
          <div className="section-heading">
            <div><span className="section-kicker">HOW I WORK / 001</span><h2>Make it work.<br /><span>Know why it works.</span></h2></div>
            <p>Tools can accelerate the work. Understanding, decisions, and verification still belong to the engineer.</p>
          </div>
          <div className="principle-grid" id="principles">
            {principles.map((principle) => (
              <article className="principle-card" key={principle.number}>
                <div className="principle-top"><span>{principle.number} / 03</span><span className="principle-indicator" /></div>
                <div className="principle-mark" aria-hidden="true">{principle.number === '01' ? '⌘' : principle.number === '02' ? '{ }' : '✓'}</div>
                <h3>{principle.label}</h3>
                <p>{principle.detail}</p>
              </article>
            ))}
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <BrandMark />
        <span>BUILT WITH CURIOSITY. REFINED WITH EVIDENCE.</span>
        <span className="footer-coordinate">AP / INDIA <b>·</b> © {new Date().getFullYear()}</span>
      </footer>
    </div>
  );
}
