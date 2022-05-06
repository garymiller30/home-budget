import { ObjectId } from "mongodb";
import { getCollection } from "../getCollection";

export async function getTransactionById(id: string) {
    const collection = await getCollection();
    const doc = await collection.findOne({ _id: new ObjectId(id) });
    return doc;
}