import { MongoClient } from "mongodb";

const connectingString = process.env.ATLAS_URI || "";

const client = new MongoClient(connectingString);

let conn;
try {
  conn = await client.connect();
} catch (e) {
  console.error(e);
}

let db = conn.db("expenses_db");

export default db;

