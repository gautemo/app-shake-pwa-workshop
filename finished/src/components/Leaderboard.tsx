import React, { useEffect, useState } from 'react'
import { useIsOnline } from '../hooks/useIsOnline';
import { getScores } from '../services/scores';
import { Score } from '../types';

const Leaderboard = () => {
  const [scores, setScores] = useState<Score[]>([]);
  const { isOnline } = useIsOnline();

  useEffect(() => {
    if (isOnline) {
      getScores().then(scores => setScores(scores));
    }
  }, [isOnline])

  return (
    <>
      { isOnline &&
        <ol>
          {
            scores.map(score =>
              <li key={score.name}>
                <span>{score.name}</span>:
              <span>{score.points}</span>
              </li>
            )
          }
        </ol>
      }
      { !isOnline &&
        <div>No internet</div>
      }
    </>
  )
}

export { Leaderboard }