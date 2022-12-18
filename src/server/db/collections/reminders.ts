import { ObjectId } from 'mongodb';
import { getCollection } from '@/server/db/mongo';
import type { PatientFormData, Reminder, ReminderPayload } from '@/types';
import { createDate } from '@/utils';

const collection = getCollection('reminders');

export const findNearestReminders = async () => {
  const reminders = await collection;

  return reminders.find<Reminder>({
    // c 10-18
    deliveryDate: {
      $gte: createDate(Date.now() - 36e5).getTime(),
      $lte: createDate(Date.now() + 288e5).getTime(),
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

export const deleteOldReminders = async (): Promise<boolean> => {
  const reminders = await collection;

  const result = await reminders.deleteMany({
    deliveryDate: {
      $lte: Date.now(),
    },
  });

  if (result.deletedCount > 0) {
    return true;
  }

  throw new Error('Не удалось удалить записи!');
};
