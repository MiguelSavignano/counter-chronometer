"use client";
import React from 'react';
import * as _ from 'lodash';

const styles: Record<string, React.CSSProperties> = {
  card: {
    background: 'rgba(255,255,255,0.05)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '2rem',
    padding: '3rem 2.5rem',
    maxWidth: 420,
    width: '100%',
    textAlign: 'center',
    boxShadow: '0 25px 60px rgba(0,0,0,0.4)',
  },
  title: {
    fontSize: '1.1rem',
    fontWeight: 600,
    letterSpacing: '0.15em',
    textTransform: 'uppercase' as const,
    color: 'rgba(255,255,255,0.5)',
    marginBottom: '0.25rem',
  },
  emoji: {
    fontSize: '2rem',
    display: 'block',
    marginBottom: '0.5rem',
  },
  timerReady: {
    fontSize: '6rem',
    fontWeight: 800,
    lineHeight: 1,
    color: '#a78bfa',
    animation: 'glow 2s ease-in-out infinite, float 3s ease-in-out infinite',
    margin: '1rem 0',
  },
  timerActive: {
    fontSize: '6rem',
    fontWeight: 800,
    lineHeight: 1,
    color: '#34d399',
    animation: 'glow 1s ease-in-out infinite',
    margin: '1rem 0',
  },
  timerDanger: {
    fontSize: '6rem',
    fontWeight: 800,
    lineHeight: 1,
    color: '#f87171',
    animation: 'danger-glow 0.5s ease-in-out infinite, shake 0.4s ease-in-out infinite',
    margin: '1rem 0',
  },
  timerDone: {
    fontSize: '6rem',
    fontWeight: 800,
    lineHeight: 1,
    color: '#6b7280',
    margin: '1rem 0',
  },
  divider: {
    height: 1,
    background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.15), transparent)',
    margin: '1.5rem 0',
  },
  statsRow: {
    display: 'flex',
    justifyContent: 'center',
    gap: '2rem',
    marginBottom: '1.5rem',
  },
  statBox: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    gap: '0.25rem',
  },
  statLabel: {
    fontSize: '0.75rem',
    letterSpacing: '0.1em',
    textTransform: 'uppercase' as const,
    color: 'rgba(255,255,255,0.4)',
  },
  statValue: {
    fontSize: '2rem',
    fontWeight: 700,
    color: '#fff',
  },
  statValueBest: {
    fontSize: '2rem',
    fontWeight: 700,
    color: '#fbbf24',
  },
  btnClick: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    fontSize: '1.25rem',
    fontWeight: 700,
    padding: '1rem 2.5rem',
    border: 'none',
    borderRadius: '999px',
    cursor: 'pointer',
    background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
    color: '#fff',
    boxShadow: '0 4px 24px rgba(99,102,241,0.5)',
    animation: 'pulse-ring 2s ease-out infinite',
    transition: 'transform 0.1s',
    letterSpacing: '0.05em',
  },
  btnClickActive: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    fontSize: '1.25rem',
    fontWeight: 700,
    padding: '1rem 2.5rem',
    border: 'none',
    borderRadius: '999px',
    cursor: 'pointer',
    background: 'linear-gradient(135deg, #10b981, #34d399)',
    color: '#fff',
    boxShadow: '0 4px 24px rgba(52,211,153,0.5)',
    transition: 'transform 0.1s',
    letterSpacing: '0.05em',
  },
  btnClickDone: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    fontSize: '1.25rem',
    fontWeight: 700,
    padding: '1rem 2.5rem',
    border: 'none',
    borderRadius: '999px',
    cursor: 'default',
    background: 'linear-gradient(135deg, #374151, #4b5563)',
    color: 'rgba(255,255,255,0.5)',
    letterSpacing: '0.05em',
  },
  btnRestart: {
    marginTop: '1rem',
    background: 'none',
    border: '1px solid rgba(255,255,255,0.15)',
    borderRadius: '999px',
    color: 'rgba(255,255,255,0.5)',
    padding: '0.5rem 1.25rem',
    fontSize: '0.875rem',
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.4rem',
    transition: 'all 0.2s',
  },
  newRecord: {
    display: 'inline-block',
    background: 'linear-gradient(135deg, #f59e0b, #fbbf24)',
    color: '#1f2937',
    fontWeight: 800,
    fontSize: '0.85rem',
    padding: '0.35rem 1rem',
    borderRadius: '999px',
    letterSpacing: '0.08em',
    textTransform: 'uppercase' as const,
    marginBottom: '1rem',
    animation: 'pop-in 0.4s ease-out',
  },
};

class Counter extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    _.bindAll(this, ['timerStart', 'restart', 'onCountUp', 'finish']);
    this.state = { count: 0, timer: props.MAX_TIMER, maxCount: 0, newRecord: false };
  }

  finish() {
    return this.state.timer <= 0;
  }

  onCountUp() {
    const { count, timer } = this.state;
    if (count === 0) this.timerStart();
    if (timer > 0.0) this.setState({ count: count + 1 });
  }

  timerStart() {
    const interval = setInterval(() => {
      const { count, maxCount, timer } = this.state;
      if (this.finish()) {
        const isNew = count > maxCount;
        this.setState({
          maxCount: isNew ? count : maxCount,
          newRecord: isNew && maxCount > 0,
        });
        clearInterval(interval);
      } else {
        this.setState({ timer: parseFloat((timer - 0.1).toFixed(1)) });
      }
    }, 100);
    this.setState({ interval });
  }

  restart() {
    clearInterval(this.state.interval);
    this.setState({ count: 0, timer: this.props.MAX_TIMER, newRecord: false });
  }

  render() {
    const { count, timer, maxCount, newRecord } = this.state;
    const done = this.finish();
    const started = count > 0;
    const danger = timer <= 3 && timer > 0 && started;

    const timerStyle = !started
      ? styles.timerReady
      : done
      ? styles.timerDone
      : danger
      ? styles.timerDanger
      : styles.timerActive;

    const btnStyle = done
      ? styles.btnClickDone
      : started
      ? styles.btnClickActive
      : styles.btnClick;

    return (
      <div style={styles.card}>
        <span style={styles.emoji}>⏱️</span>
        <p style={styles.title}>Counter Chronometer</p>

        <div style={timerStyle as React.CSSProperties}>
          {!started ? this.props.MAX_TIMER : timer}
        </div>

        <div style={styles.divider} />

        <div style={styles.statsRow}>
          <div style={styles.statBox}>
            <span style={{ fontSize: '1.25rem' }}>🖱️</span>
            <span style={styles.statLabel}>Clicks</span>
            <span style={styles.statValue}>{count}</span>
          </div>
          {maxCount > 0 && (
            <div style={styles.statBox}>
              <span style={{ fontSize: '1.25rem' }}>🏆</span>
              <span style={styles.statLabel}>Best</span>
              <span style={styles.statValueBest}>{maxCount}</span>
            </div>
          )}
        </div>

        {newRecord && <div style={styles.newRecord}>🎉 New Record!</div>}

        <button style={btnStyle} onClick={this.onCountUp} disabled={done}>
          {!started ? '🚀 Start clicking!' : done ? '⛔ Time\'s up!' : '👆 Click!'}
        </button>

        {(started || done) && (
          <div>
            <button style={styles.btnRestart} onClick={this.restart}>
              🔄 Restart
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default Counter;
