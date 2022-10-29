import { getCollection } from "../mongo";
import { useCalendar } from "~~/composables/useCalendar";

const collection = getCollection('not_working_days');
const { getTomorrow } = useCalendar();

export const getNotWorkingDates = async (): Promise<Tech.NotWorkingDates> => {
    const schedule = await collection;

    const result: Tech.PatientFormData[] = await schedule.find({
        date: {
            $gt: getTomorrow()
        }
    }).sort({ date: 1 }).toArray();

    return result.map(({ date }) => date);
}

export const addNotWorkingDate = async (date: Tech.DateNumber) => {
    const schedule = await collection;

    await schedule.insertOne({ date });

    return true;
}
