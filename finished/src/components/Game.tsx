import React, { useEffect, useState } from 'react';
import { useAccelerometer } from '../hooks/useAccelerometer';
import { postScore } from '../services/scores';
import styles from '../style/Game.module.css';

const GAMETIME = 5;

const Game = () => {
  const [username, setUsername] = useState(localStorage.getItem('username') ?? '');
  useEffect(() => {
    if (username) {
      localStorage.setItem('username', username);
    }
  }, [username]);

  const [timeLeft, setTimeLeft] = useState(0);
  useEffect(() => {
    if (timeLeft > 0) {
      setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    } else if (max > 0) {
      postScore({
        name: username,
        points: max
      });
      setLastScore(max);
      resetMax();
    }
  }, [timeLeft]);

  const { max, resetMax } = useAccelerometer();
  const [lastScore, setLastScore] = useState(-1);

  return (
    <section className={styles.game}>
      { timeLeft === 0 &&
        <>
          <div className={styles.username}>
            <label htmlFor="name">Username:</label>
            <input id="name" type="text" onChange={e => setUsername(e.target.value)} value={username ?? ''} />
          </div>
          { lastScore !== -1 && <p>You got {lastScore} points!</p>}
          <button onClick={() => setTimeLeft(GAMETIME)} className={styles.start}>START</button>
        </>
      }
      { timeLeft > 0 &&
        <>
          <p>Time: {timeLeft}</p>
          <p>{max}</p>
        </>
      }
    </section>
  )
}

export { Game }