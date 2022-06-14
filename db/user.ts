import User from "../model/user";
import { ObjectId } from "mongodb";
import { getCollection } from "./getCollection";
import { iUser } from "../interfaces/iUser";

interface getUserProps {
  email?: string | null | undefined;
  name?: string | null | undefined;
  image?: string | null | undefined;
}
export async function getUser(user: getUserProps): Promise<iUser> {
  const collection = await getCollection("user");
  let dbUser = await collection.findOne({ email: user.email });

  if (!dbUser) {
    // create new User
    const userSchema = new User();
    userSchema.name = user.name;
    userSchema.email = user.email;
    userSchema.image = user.image;

    const doc = await collection.insertOne(userSchema);

    dbUser = { ...userSchema, _id: doc.insertedId };
  }

  return JSON.parse(JSON.stringify(dbUser))
}

async function findUserById(userId: string) {
  const collection = await getCollection("user");
  /* Converting the userId to an ObjectId. */
  const newId = new ObjectId(userId);
  const doc = await collection.findOne({ _id: newId });
  return doc;
}
