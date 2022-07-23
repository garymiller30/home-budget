import { iTransaction } from "../../interfaces/iTransaction";
import Transaction from "../../model/transaction";
import User from "../../model/user";
import { getCollection } from "../getCollection";

export async function getTransactions(
  userId: string,
  options = {
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
  }
): Promise<iTransaction[]> {
  const collection = await getCollection();

  const filter = {
    ownerId: userId,
    "date.year": Number(options.year),
    "date.month": Number(options.month),
  };
  const transactions = await collection.find(filter).toArray();

  //return res.map((x) => ({ ...x, _id: x._id.toString() }));
  //return JSON.parse(JSON.stringify(transactions));
  return []
}
