import { ObjectId } from 'mongodb';
import { getCollection } from '@/server/db/mongo';
import type { NotificationPayload } from '@/types';

const collection = getCollection('notifications');

export const findNotifications = async (): Promise<NotificationPayload[]> => {
  const notifications = await collection;

  return notifications.find().sort({ date: 1 }).toArray();
};

export const insertOneNotification = async (data: NotificationPayload) => {
  const notifications = await collection;

  const result = await notifications.insertOne(data);

  if (result.insertedCount > 0) {
    return true;
  }

  throw new Error('Не удалось добавить запись!');
};

export const deleteOneNotification = async (_id: string): Promise<boolean> => {
  const notifications = await collection;

  const result = await notifications.deleteOne({ _id: new ObjectId(_id) });

  if (result.deletedCount > 0) {
    return true;
  }

  throw new Error('Не удалось удалить запись!');
};
