import { getCollection } from '@/server/db/mongo';
import type { BookedDates, PatientFormData } from '@/types';
import { getTomorrow, getReservedTimeSlots } from '@/utils';

const collection = getCollection('schedule');

type ScheduleItem = Pick<PatientFormData, 'date' | 'procedures'>;

export const getBookedDates = async (): Promise<BookedDates> => {
  const schedule = await collection;

  const result: PatientFormData[] = await schedule.find({
    date: {
      $gt: getTomorrow(),
    },
  }).sort({ date: 1 }).toArray();

  return result.reduce((response, { date: startDate, procedures }) => response.concat(getReservedTimeSlots(startDate, procedures)), [] as number[]);
};

export const findOne = async (date: number): Promise<ScheduleItem | null> => {
  const schedule = await collection;

  const result = await schedule.findOne({ date });

  if (!result) return null;

  return {
    date: result.date,
    procedures: result.procedures,
  };
};

export const addToSchedule = async (data: PatientFormData) => {
  const schedule = await collection;

  if (await findOne(data.date)) {
    throw new Error('Это время уже занято. Пожалуйста, выберите другое');
  }

  await schedule.insertOne(data);

  return true;
};
