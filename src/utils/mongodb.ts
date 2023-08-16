// utils/mongodb.ts
import { MongoClient } from "mongodb";

const uri = (process.env.NODE_ENV === "development" ? process.env.MONGODB_URI_DEV : process.env.MONGODB_URI_PROD) as string;

const client = new MongoClient(uri);

export default client;
