import Counter from './components/Counter';

export default function Home() {
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card text-center">
            <div className="card-header">
              <h1 className="card-title">Counter Chronometer</h1>
            </div>
            <div className="card-body">
              <Counter MAX_TIMER={10} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
