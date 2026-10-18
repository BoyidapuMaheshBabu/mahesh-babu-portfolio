import TechText from './components/TechText.jsx';

export default function App() {
  return (
    <main className="stage">
      {/* Screen-reader heading — invisible, preserves semantics */}
      <h1 className="sr-only">Mahesh Babu</h1>

      {/* Interactive TechText wordmark */}
      <div className="wordmark" aria-hidden="true">
        <TechText
          text="MAHESH BABU"
          fontFamily="'Sora', sans-serif"
          fontWeight={700}
          fontSize={260}
          letterSpacing={-0.05}
          color="#f8fafc"
          accentColor="#38bdf8"
          reveal="letter"
          dashLength={4}
          dashGap={2}
          specks={15}
          intro="split"
          introDuration={1.65}
          clickKick
          guides={false}
        />
      </div>
    </main>
  );
}
