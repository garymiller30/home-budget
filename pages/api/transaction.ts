import type { NextApiRequest, NextApiResponse } from 'next'

import { createTransaction } from "../../db/transaction";
import { updateUserBalance } from "../../db/user";
export default async function handler(req:NextApiRequest, res:NextApiResponse) {
  switch (req.method) {
    case "POST": {
      return addTransaction(req, res);
    }
  }
}

async function addTransaction(req:NextApiRequest, res:NextApiResponse) {
  const trans = await createTransaction(JSON.parse(req.body));
  //update balance
  const dbUser = await updateUserBalance(trans);
  return res.json(trans);
}
