import { ObjectId } from "mongodb";
import MonthBalance from "../../model/MonthBalance";
import { getCollection } from "../getCollection";

export default async function updateMonthBalance(mb: MonthBalance) {
    const collection = await getCollection("monthBalance");

    const filter = { _id: new ObjectId(mb._id) }

    await collection.updateOne(filter, {
        $set: { isPreviousMonthMoved: true },
    })

}