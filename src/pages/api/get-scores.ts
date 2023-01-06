import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'

const getScoresHandler = async (
  _req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  try {
    const result = await axios.get(
      'https://react-project-server-default-rtdb.firebaseio.com/highestScores.json'
    )
    res.status(200).json(result.data)
  } catch (e) {
    res.status(500)
  }
}

export default getScoresHandler
