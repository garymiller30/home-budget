import Transaction from "../../model/transaction";
import { getCollection } from "../getCollection";

export default async function createTransaction(transaction: Transaction) {
    const collection = await getCollection();
    const doc = await collection.insertOne(transaction);
    return { ...transaction, _id: doc.insertedId };
}