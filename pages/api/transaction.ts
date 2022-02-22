import type { NextApiRequest, NextApiResponse } from 'next'

import { createTransaction, deleteTransaction, getTransactions as getTrans } from "../../db/transaction";
import { updateUserBalance } from "../../db/user";
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
  //update balance
  //await updateUserBalance(trans);
  return res.json(trans);
}
async function delTransaction(req: NextApiRequest, res: NextApiResponse) {
  const id = JSON.parse(req.body);

  const transaction = await deleteTransaction(id);
  if (transaction) {
    //await updateUserBalance(transaction, { delete: true });
    return res.json(transaction);
  }
}

async function getTransactions(req: NextApiRequest, res: NextApiResponse) {

  const { userId, year, month } = req.query;
  // const params = JSON.parse(req.);

  const trans = await getTrans({ _id: userId }, { year: Number(year), month: Number(month) })

  return res.json(trans);
}
