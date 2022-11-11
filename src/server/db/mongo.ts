import { Document, MongoClient } from 'mongodb';
import { MONGO_DB_NAME, MONGO_URI } from '@/constants/env';

const client: MongoClient = new MongoClient(MONGO_URI);

const connect = (async () => {
  try {
    await client.connect();

    console.log('Connected successfully to database');
  } catch (e) {
    console.error(e);
  }
})();

export const getCollection = async (name: string): Promise<Document> => {
  await connect;

  return client.db(MONGO_DB_NAME).collection(name);
};
