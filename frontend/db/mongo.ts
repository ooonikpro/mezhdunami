import { Document, MongoClient } from 'mongodb';

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017';
const DB_NAME = process.env.DB_NAME || 'default';
const client: MongoClient = new MongoClient(MONGO_URI);

const connect = (async () => {
  try {
    await client.connect();

    console.log('Connected successfully to server');
  } catch (e) {
    console.error(e);
  }
})();

export const getCollection = async (name: string): Promise<Document> => {
  await connect;

  return client.db(DB_NAME).collection(name);
};
