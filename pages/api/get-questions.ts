// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

interface Data {
  message: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await fetch(
    'https://opentdb.com/api.php?amount=10&difficulty=hard&type=boolean',
    { method: 'get' }
  )
    .then(async (value: Response) => {
      const data = await value.json();
      res.status(200).json({ message: 'OK', ...data });
    })
    .catch((e) => {
      const str = JSON.stringify(e);
      res.status(400).json({ message: str });
    });
}
