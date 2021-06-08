import React, { useEffect, useState } from 'react';
import { useAccelerometer } from '../hooks/useAccelerometer';
import { postScore } from '../services/scores';

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
    if(timeLeft > 0){
      setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    }else if (max > 0){
      console.log(`post score ${max}`);
      resetMax();
    }
    if(timeLeft === 0){
      postScore({
        name: username,
        points: 89
      })
    }
  }, [timeLeft]);

  const { max, resetMax } = useAccelerometer();

  return (
    <div>
      { timeLeft === 0 &&
        <>
          <section>
            <label htmlFor="name">Username:</label>
            <input id="name" type="text" onChange={e => setUsername(e.target.value)} value={username ?? ''}/>
          </section>
        <button onClick={() => setTimeLeft(GAMETIME)}>START</button>
        </>
      }
      { timeLeft > 0 &&
        <>
          <p>Time: {timeLeft}</p>
          <p>{max}</p>
        </>
      }
    </div>
  )
}

export { Game }