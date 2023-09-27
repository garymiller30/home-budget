import { ObjectId } from "mongodb";
import { getCollection } from "../getCollection";
export async function updateTransaction(trans: any) {
    const collection = await getCollection();
    const doc = await collection.updateOne({ _id: new ObjectId(trans._id) }, [{
        $set: {
            description: trans.description,
            amount: trans.amount,
            comment: trans.comment
        }
    }]);
    if (doc.matchedCount > 0) {
        const doc = await collection.findOne({ _id: new ObjectId(trans._id) });
        return doc;
    }
    return undefined;
}