import { getClient } from "../middleware/database";
import Transaction from "../model/transaction";

export async function getTransactions(
  user,
  options = {
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
  }
) {
  const client = await getClient();
  const db = client.db("home-budget");
  const collection = db.collection("transaction");
  console.log("user._id:", user._id);

  const filter = {
    ownerId: user._id,
    "date.year": options.year,
    "date.month": options.month,
  };

  console.log("filter:", filter);
  const transactions = collection.find(filter);

  const res = await transactions.toArray();

  console.log("transactions:", res);
  return res.map((x) => ({ ...x, _id: x._id.toString() }));
}

export async function createTransaction(transaction) {
  const client = await getClient();
  const db = client.db("home-budget");
  const collection = db.collection("transaction");
  const doc = await collection.insertOne(transaction);
  return { ...transaction, _id: doc._id };
}
