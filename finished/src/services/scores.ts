import { Score } from '../types'

const getScores = async (): Promise<Score[]> => {
  return [
    { name: 'Ole', points: 100 },
    { name: 'Dole', points: 80 },
    { name: 'Doffen', points: 20 },
  ]
}

export { getScores }