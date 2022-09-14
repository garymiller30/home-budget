import { iJar } from "@/interfaces/iJar";
import { getCollection } from "../getCollection";

export async function getJars(userId: string): Promise<iJar[]> {
    const col = await getCollection("Jar");

    const filter = { ownerId: userId };

    const jars = await col.find(filter).toArray();

    return jars.map((x: any) => ({ ...x, _id: x._id.toString() }));

}