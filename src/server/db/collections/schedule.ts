import { ObjectId, OptionalId } from 'mongodb';
import { getCollection } from '@/server/db/mongo';
import type {
  BookedDates, PatientFormData, ScheduleItem, TimePeriod,
} from '@/types';
import { getTomorrow, getReservedTimeSlots } from '@/utils';

const collection = getCollection('schedule');

export const findBookedDates = async (): Promise<BookedDates> => {
  const schedule = await collection;

  const result = await schedule.find<PatientFormData>({
    date: {
      $gt: getTomorrow(),
    },
  }).sort({ date: 1 }).toArray();

  return result.reduce((response, { date: startDate, procedures }) => response.concat(getReservedTimeSlots(startDate, procedures)), [] as number[]);
};

export const findSchedule = async ({ from, until }: TimePeriod = {}): Promise<PatientFormData[]> => {
  const schedule = await collection;

  return schedule.find<PatientFormData>({
    date: {
      $gte: from || getTomorrow(),
      ...(until ? { $lte: until } : {}),
    },
  }).sort({ date: 1 }).toArray();
};

export const findOneSchedule = async (date: number): Promise<ScheduleItem | null> => {
  const schedule = await collection;

  const result = await schedule.findOne<ScheduleItem>({ date });

  if (!result) return null;

  return {
    date: result.date,
    procedures: result.procedures,
  };
};

export const findOneScheduleById = async (_id: string): Promise<PatientFormData> => {
  const schedule = await collection;

  const result = await schedule.findOne<PatientFormData>({ _id: new ObjectId(_id) });

  if (result) {
    return result;
  }

  throw new Error('Не удалось найти запись!');
};

export const updateOneSchedule = async (_id: string, { _id: id, ...newData }: PatientFormData): Promise<boolean> => {
  const schedule = await collection;

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
};

export const deleteOneSchedule = async (_id: string): Promise<boolean> => {
  const schedule = await collection;

  try {
    const result = await schedule.deleteOne({ _id: new ObjectId(_id) });

    if (result.deletedCount > 0) {
      return true;
    }

    throw new Error('Не удалось удалить запись!');
  } catch (e) {
    console.error(e);

    throw e;
  }
};

export const insertOneSchedule = async (data: Omit<PatientFormData, '_id'>) => {
  const schedule = await collection;

  if (await findOneSchedule(data.date)) {
    throw new Error('К сожалению, выбранное время уже занято. Пожалуйста, выберите другое');
  }

  try {
    const result = await schedule.insertOne(data);

    return result.insertedId;
  } catch (e) {
    throw new Error('Не удалось записать. Попробуйте чуть позже');
  }
};
