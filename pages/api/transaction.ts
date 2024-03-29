import type { NextApiRequest, NextApiResponse } from 'next'
import { deleteTransaction, getTransactions as getTrans, createTransaction, updateTransaction as updateTrans } from "../../db/transaction";

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
    case "PUT": {
      return await updateTransaction(req, res);
    }
  }
  return res.status(404)
}

async function addTransaction(req: NextApiRequest, res: NextApiResponse) {
  const trans = await createTransaction(JSON.parse(req.body));
  return res.status(201).json(trans);
}
async function delTransaction(req: NextApiRequest, res: NextApiResponse) {
  const id = JSON.parse(req.body);

  const transaction = await deleteTransaction(id);
  if (transaction) {
    return res.json(transaction);
  }
  return res.status(404).json(null);
}

async function updateTransaction(req: NextApiRequest, res: NextApiResponse) {
  const trans = JSON.parse(req.body);
  const updatedTransaction = await updateTrans(trans);
  if (updatedTransaction) {
    return res.json(updatedTransaction);
  }
  return res.status(404)
}

async function getTransactions(req: NextApiRequest, res: NextApiResponse) {

  const { userId, year, month } = req.query;

  if (!userId || !year || !month) return res.json([]);

  const trans = await getTrans(userId as string, { year: Number(year), month: Number(month) })

  return res.status(200).json(trans);
}
