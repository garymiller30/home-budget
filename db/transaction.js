import { getClient } from "../middleware/database";
import { ObjectId } from "mongodb";
import fetch from "isomorphic-unfetch";

async function getCollection() {
  const client = await getClient();
  const db = client.db("home-budget");
  const collection = db.collection("transaction");
  return collection;
}

export async function getTransactions(
  user,
  options = {
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
  }
) {
  const collection = await getCollection();

  const filter = {
    ownerId: user._id,
    "date.year": Number(options.year),
    "date.month": Number(options.month),
  };

  const transactions = collection.find(filter);
  const res = await transactions.toArray();

  return res.map((x) => ({ ...x, _id: x._id.toString() }));
}

export async function createTransaction(transaction) {
  const collection = await getCollection();
  const doc = await collection.insertOne(transaction);
  return { ...transaction, _id: doc.insertedId };
}

export async function deleteTransaction(id) {
  const collection = await getCollection();
  const transaction = await getTransactionById(id);
  if (transaction) {
    const result = await collection.deleteOne({ _id: transaction._id });
    if (result.deletedCount === 1) {
      return transaction;
    }
  }
  return null;
}

export async function getTransactionById(id) {
  const collection = await getCollection();
  const doc = await collection.findOne({ _id: new ObjectId(id) });
  return doc;
}
