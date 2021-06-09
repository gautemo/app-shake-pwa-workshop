import { Score } from '../types'

const getScores = async (): Promise<{ data: Score[], error?: undefined } | { data?: undefined, error: Error }> => {
  try {
    const response = await fetch('http://localhost:8080/scores');
    if(response.ok){
      return { data: await response.json() };
    }
    return { error: new Error('Could not fetch leaderboard') }
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