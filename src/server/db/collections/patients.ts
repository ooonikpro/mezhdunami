import { ObjectId } from 'mongodb';
import { getCollection } from '@/server/db/mongo';
import type { Patient } from '@/types';

const collection = getCollection('patients');

export const findOnePatient = async (phone: number): Promise<Patient | null> => {
  const patients = await collection;

  const result = await patients.findOne({ phone });

  if (!result) return null;

  return result;
};

export const updateOnePatient = async (_id: string, { _id: id, ...newData }: Patient): Promise<boolean> => {
  const schedule = await collection;

  try {
    const result = await schedule.updateOne(
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

export const deletePatient = async (_id: string): Promise<boolean> => {
  const schedule = await collection;

  const result = await schedule.deleteOne({ _id: new ObjectId(_id) });

  if (result.deletedCount > 0) {
    return true;
  }

  throw new Error('Не удалось удалить запись!');
};
