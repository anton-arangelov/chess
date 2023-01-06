import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'
import { GetScoresData } from '../../config/types'

const scoresHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<GetScoresData>
): Promise<void> => {
  try {
    const method = req.body.method === 'get' ? axios.get : axios.put
    const result = await method(
      'https://react-project-server-default-rtdb.firebaseio.com/highestScores.json',
      req.body.data
    )
    res.status(200).json(result.data)
  } catch (e) {
    res.status(500)
  }
}

export default scoresHandler
