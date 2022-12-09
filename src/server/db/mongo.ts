import { MongoClient } from 'mongodb';
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

export const getDB = async () => {
  await connect;

  return client.db(MONGO_DB_NAME);
};

export const getCollection = async (name: string) => (await getDB()).collection(name);
