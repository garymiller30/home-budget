import type { NextApiRequest, NextApiResponse } from 'next'
import { deleteTransaction, getTransactions as getTrans, createTransaction } from "../../db/transaction";



export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET': {
      return await getTransactions(req, res);
    }
    case "POST": {
      return await addTransaction(req, res);
    }
    case "DELETE": {
      return await delTransaction(req, res);
    }
  }
}

async function addTransaction(req: NextApiRequest, res: NextApiResponse) {
  const trans = await createTransaction(JSON.parse(req.body));
  return res.json(trans);
}
async function delTransaction(req: NextApiRequest, res: NextApiResponse) {
  const id = JSON.parse(req.body);

  const transaction = await deleteTransaction(id);
  if (transaction) {
    return res.json(transaction);
  }
}

async function getTransactions(req: NextApiRequest, res: NextApiResponse) {

  const { userId, year, month } = req.query;

  if (!userId || !year || !month) return res.json([]);

  const trans = await getTrans(userId as string, { year: Number(year), month: Number(month) })

  return res.json(trans);
}
