import { getCollection } from '@/server/db/mongo';
import type { DateNumber, NotWorkingDates, TimePeriod } from '@/types';
import { getTomorrow } from '@/utils';

const collection = getCollection('not_working_days');

export const findNonWorkingDates = async ({ from, until }: TimePeriod = {}): Promise<NotWorkingDates> => {
  const schedule = await collection;

  const result: { date: DateNumber }[] = await schedule.find({
    date: {
      $gte: from || getTomorrow(),
      ...(until ? { $lte: until } : {}),
    },
  }).sort().toArray();

  return result.map(({ date }) => date);
};

export const updateNonWorkingDates = async (dates: DateNumber[]) => {
  const schedule = await collection;

  if (Array.isArray(dates)) {
    await schedule.deleteMany({});

    if (dates.length) {
      await schedule.insertMany(dates.map((date) => ({ date })));
    }
  }

  return true;
};
