import { getCollection } from "../getCollection";
import { getTransactionById } from './getTransactionById';

export async function deleteTransaction(id: string) {
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