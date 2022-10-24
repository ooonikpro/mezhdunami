import { getCollection } from "../mongo";
import { useCalendar } from "~~/composables/useCalendar";

const collection = getCollection('schedule');
const { getTomorrow } = useCalendar();

export const getCurrentSchedule = async (): Promise<number[]> => {
    const schedule = await collection;

    const result = await schedule.find({
        date: {
            $gt: getTomorrow().getTime()
        }
    }).sort({ date: 1 }).toArray();

    return await result.map((item) => item.date);
}

export const findOne = async (date: number): Promise<number | undefined> => {
    const schedule = await collection;

    return await schedule.findOne({ date });
}

export const addToSchedule = async (data: Tech.PatientFormData) => {
    const schedule = await collection;

    if (await findOne(data.date)) {
        return false;
    }

    schedule.insertOne(data);

    return true;
}
