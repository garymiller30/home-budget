import User from "../model/user";
import { ObjectId } from "mongodb";
import { getCollection } from "./getCollection";

export async function getUser(user) {
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

  return { ...dbUser, _id: dbUser._id.toString() };
}

async function findUserById(userId) {
  const collection = await getCollection("user");
  /* Converting the userId to an ObjectId. */
  const newId = new ObjectId(userId);
  const doc = await collection.findOne({ _id: newId });
  return doc;
}
