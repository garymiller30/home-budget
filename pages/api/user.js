import nextConnect from "next-connect";
import { getSession } from "next-auth/react";
import middleware from "../../middleware/database";
import { ObjectId } from "mongodb";

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {
  const session = await getSession({ req });
  //console.log("session", req);
  if (session) {
    const { email } = session.user;

    console.log("session.user", session.user);
    const user = await req.db.collection("user").findOne({ email });
    if (!user) {
      res.status(404).json({ message: "User not found" });
    }
    console.log("user", user);
    res.status(200).json(user);
  } else {
    res.status(401).json({ message: "Unautorized request" });
  }
});

export default handler;
