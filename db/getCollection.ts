import { getClient } from "../middleware/database";

export async function getCollection(coll = "transaction") {
    const client = await getClient();
    const db = client.db("home-budget");
    const collection = db.collection(coll);
    return collection;
}