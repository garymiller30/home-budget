import Jar from "model/Jar";
import { getCollection } from "../getCollection";

export async function createJar(jar: Jar) {
    const col = await getCollection("Jar");
    const doc = await col.insertOne(jar);
    return { ...jar, _id: doc.insertedId };
}