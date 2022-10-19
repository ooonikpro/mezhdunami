import { MongoClient } from "mongodb";

const url = 'mongodb://localhost:27017/';

const client = new MongoClient(url);

export async function main() {
    try {
        await client.connect();
        const list = await client.db().admin().listDatabases();

        return list.databases.map(db => db.name);
    } catch (e) {
        throw e;
    } finally {
        await client.close();
    }
}
