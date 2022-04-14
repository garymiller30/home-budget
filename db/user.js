import { getClient } from "../middleware/database";
import User from "../model/user";
import { ObjectId } from "mongodb";

/**
 * Get the user collection from the home-budget database.
 * @returns The collection object.
 */
async function getUserCollection() {
  const client = await getClient();
  const db = client.db("home-budget");
  const collection = db.collection("user");
  return collection;
}

export async function getUser(user) {
  const collection = await getUserCollection();
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

/**
 * It returns a promise that resolves to a user document, or null if no user document was found
 * @param userId - The id of the user to find.
 * @returns A promise that resolves to the user document.
 */
async function findUserById(userId) {
  const collection = await getUserCollection();
  const newId = new ObjectId(userId);
  const doc = await collection.findOne({ _id: newId });
  return doc;
}

// export async function updateUserBalance(
//   transaction,
//   options = { delete: false }
// ) {
//   const doc = await findUserById(transaction.ownerId);
//   let dbUser;
//   if (doc) {
//     let newBudget;
//     if (options.delete) {
//       newBudget = subFromBalance(doc, transaction);
//     } else {
//       switch (transaction.type) {
//         case "debit":
//           newBudget = addToBalance(doc, transaction);
//           break;
//         case "credit":
//           newBudget = subFromBalance(doc, transaction);
//           break;
//       }
//     }

//     const collection = await getUserCollection();

//     dbUser = await collection.updateOne(
//       { _id: doc._id },
//       { $set: { budget: newBudget } },
//       { upsert: true }
//     );
//   }

//   return dbUser;
// }

// function addToBalance(user, transaction) {
//   return Number(user.budget) + Number(transaction.amount);
// }
// function subFromBalance(user, transaction) {
//   return Number(user.budget) - Number(transaction.amount);
// }
