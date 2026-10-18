import TechText from './components/TechText.jsx';

export default function App() {
  return (
    <main className="stage">
      {/* Screen-reader heading — invisible, preserves semantics */}
      <h1 className="sr-only">Mahesh Babu</h1>

      {/* Wordmark with a restrained AI-native identity tag */}
      <div className="identity-lockup">
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
    </main>
  );
}
