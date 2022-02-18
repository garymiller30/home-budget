import { MongoClient } from "mongodb";
import nextConnect from "next-connect";

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB_NAME;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export async function getClient() {
  if (!client.isConnected) await client.connect();
  return client;
}

async function database(req, res, next) {
  const c = await getClient();

  req.dbClient = c;
  req.db = c.db(dbName);
  return next();
}

const middleware = nextConnect();
middleware.use(database);

export default middleware;
