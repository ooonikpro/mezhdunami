import { ObjectId } from 'mongodb';
import { getCollection } from '@/server/db/mongo';
import type { Patient } from '@/types';

const collection = getCollection('patients');

(async () => {
  (await collection).createIndex({ name: 'text', phone: 'text' });
})();

export const findPatients = async (searchStr = ''): Promise<Patient[]> => {
  const patients = await collection;

  let result = [];

  if (searchStr) {
    result = await patients.find<Patient>({
      $text: {
        $search: searchStr,
      },
    }).toArray();
  } else {
    result = await patients.find<Patient>({}).toArray();
  }

  return result;
};

export const findOnePatient = async (phone: Patient['phone']): Promise<Patient | null> => {
  const patients = await collection;

  const result = await patients.findOne<Patient>({ phone });

  if (!result) return null;

  return result;
};

export const updateOnePatient = async (_id: Patient['_id'], { _id: id, ...newData }: Patient): Promise<boolean> => {
  const patients = await collection;

  try {
    const result = await patients.updateOne(
      { _id: new ObjectId(_id) },
      {
        $set: { ...newData },
      },
    );

    if (result.modifiedCount > 0) {
      return true;
    }

    throw new Error('Не удалось обновить запись!');
  } catch (e) {
    console.error(e);

    return false;
  }
};

export const deleteOnePatient = async (_id: Patient['_id']): Promise<boolean> => {
  const patients = await collection;

  const result = await patients.deleteOne({ _id: new ObjectId(_id) });

  if (result.deletedCount > 0) {
    return true;
  }

  throw new Error('Не удалось удалить запись!');
};

export const insertOnePatient = async (data: Omit<Patient, '_id'>) => {
  const patients = await collection;

  if (await findOnePatient(data.phone)) {
    return true;
  }

  try {
    const result = await patients.insertOne(data);

    return result.insertedId;
  } catch (e) {
    throw new Error('Не удалось записать. Попробуйте чуть позже');
  }
};
