import React, { useEffect, useState } from 'react';
import { useIsOnline } from '../hooks/useIsOnline';
import { getScores } from '../services/scores';
import { Score } from '../types';
import { Alert } from './Alert';
import { Loader } from './icons/Loader';
import { Refresh } from './icons/Refresh';
import styles from '../style/Leaderboard.module.css';

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

  const Content = () => {
    if (!isOnline) {
      return <Alert type="warning" message="No internet" />
    }
    if (scores.loading) {
      return <Loader />
    }
    if (scores.error) {
      return <Alert type="error" message={scores.error.message} />
    }
    return (
      <ol className={styles.list}>
        {
          scores.data.map((score, i) =>
            <li key={score.name}>
              <span className={styles.name}>{i+1}. {score.name}</span>
              <span>{score.points}</span>
            </li>
          )
        }
      </ol>
    )
  }


  return (
    <section>
      <div className={styles.top}>
        <h1>Leaderboard 🏆</h1>
        <Refresh onClick={get} />
      </div>
      <Content />
    </section>
  )
}

export { Leaderboard }