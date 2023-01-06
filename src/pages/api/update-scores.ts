import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'

const updateScoresHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  try {
    const result = await axios.put(
      'https://react-project-server-default-rtdb.firebaseio.com/highestScores.json',
      req.body
    )
    res.status(200).json(result.data)
  } catch (e) {
    res.status(500)
  }
}

export default updateScoresHandler
