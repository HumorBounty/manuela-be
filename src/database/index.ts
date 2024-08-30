import { MongoClient } from "mongodb";

const url = process.env.MONGO_URI;
const dbName = process.env.MONGO_DB_NAME;
const client = new MongoClient(url);

export default async function database() {
  console.log("db is connected.");
  await client.connect();
  const db = client.db(dbName);
  return db;
}
