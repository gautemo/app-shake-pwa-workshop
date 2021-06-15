import { Score } from '../types'

const getScores = async (): Promise<{ data: Score[], error?: undefined } | { data?: undefined, error: Error }> => {
  try {
    const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/scores`);
    if(response.ok){
      return { data: await response.json() };
    }
    return { error: new Error('Could not fetch leaderboard') }
  } catch (error) {
    return { error }
  }
}

const postScore = (score: Score) => {
  fetch(`${import.meta.env.VITE_SERVER_URL}/scores`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(score),
  });
}

export { getScores, postScore }