import { getCollection } from '@/server/db/mongo';
import { getTomorrow } from '@/utils';

const collection = getCollection('not_working_days');

export const getNotWorkingDates = async (): Promise<NotWorkingDates> => {
  const schedule = await collection;

  const result: PatientFormData[] = await schedule.find({
    date: {
      $gt: getTomorrow(),
    },
  }).sort({ date: 1 }).toArray();

  return result.map(({ date }) => date);
};

export const addNotWorkingDate = async (date: DateNumber) => {
  const schedule = await collection;

  await schedule.insertOne({ date });

  return true;
};
