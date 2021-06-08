import { Score } from '../types'

const getScores = async (): Promise<{ data: Score[], error?: undefined } | { data?: undefined, error: Error }> => {
  try {
    const response = await fetch('http://localhost:8080/scores');
    return { data: await response.json() };
  } catch (error) {
    return { error }
  }
}

const postScore = (score: Score) => {
  fetch('http://localhost:8080/scores', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(score),
  });
}

export { getScores, postScore }