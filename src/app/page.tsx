import Counter from './components/Counter';

export default function Home() {
  return (
    <div className="container text-center mt-5">
      <h1 className="mb-4">Counter Chronometer</h1>
      <Counter MAX_TIMER={10} />
    </div>
  );
}
