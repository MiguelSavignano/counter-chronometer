import Counter from './components/Counter';

export default function Home() {
  return (
    <main style={{ width: '100%', display: 'flex', justifyContent: 'center', padding: '2rem 1rem' }}>
      <Counter MAX_TIMER={10} />
    </main>
  );
}
