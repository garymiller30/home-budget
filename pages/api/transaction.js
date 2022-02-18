import { createTransaction } from "../../db/transaction";
import { updateUserBalance } from "../../db/user";
export default async function handler(req, res, next) {
  switch (req.method) {
    case "POST": {
      return addTransaction(req, res);
    }
  }
}

async function addTransaction(req, res) {
  const trans = await createTransaction(JSON.parse(req.body));
  //update balance
  const dbUser = await updateUserBalance(trans);
  return res.json(trans);
}
