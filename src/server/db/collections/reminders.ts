import { ObjectId } from 'mongodb';
import { getCollection } from '@/server/db/mongo';
import type { PatientFormData, Reminder, ReminderPayload } from '@/types';

const collection = getCollection('reminders');

export const findNearestReminders = async () => {
  const reminders = await collection;

  return reminders.find<Reminder>({
    // c 10-18
    deliveryDate: {
      $gt: Date.now() - 36e5,
      $lt: Date.now() + 288e5,
    },
  }).toArray();
};

export const insertOneReminder = async (payload: ReminderPayload) => {
  const reminders = await collection;

  const result = await reminders.insertOne(payload);

  if (result?.insertedId) {
    return result.insertedId;
  }

  throw new Error('Не удалось добавить запись!');
};

export const deleteOneReminder = async (scheduleId: PatientFormData['_id']): Promise<boolean> => {
  const reminders = await collection;

  const result = await reminders.deleteOne({ scheduleId: new ObjectId(scheduleId) });

  if (result.deletedCount > 0) {
    return true;
  }

  throw new Error('Не удалось удалить запись!');
};
