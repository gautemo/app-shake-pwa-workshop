import React, { useEffect, useState } from 'react';
import { useIsOnline } from '../hooks/useIsOnline';
import { getScores } from '../services/scores';
import { Score } from '../types';

const Leaderboard = () => {
  const [scores, setScores] = useState<{ data: Score[], loading: boolean, error?: Error }>({ data: [], loading: false });
  const { isOnline } = useIsOnline();

  const get = async () => {
    setScores({ ...scores, loading: true });
    const result = await getScores();
    if (result.data) {
      setScores({ data: result.data, loading: false });
    } else {
      setScores({ data: [], loading: false, error: result.error });
    }
  }

  useEffect(() => {
    if (isOnline) get();
  }, [isOnline])

  return (
    <>
      { isOnline &&
        <>
          { scores.loading && <p>loading...</p>}
          { scores.error && <p>Error: {scores.error.message}</p>}
          <ol>
            {
              scores.data.map(score =>
                <li key={score.name}>
                  <span>{score.name}</span>:
              <span>{score.points}</span>
                </li>
              )
            }
          </ol>
        </>
      }
      { !isOnline &&
        <div>No internet</div>
      }
    </>
  )
}

export { Leaderboard }