import { getCollection } from "../mongo";
import { useCalendar } from "~~/composables/useCalendar";

const collection = getCollection('schedule');
const { getTomorrow } = useCalendar();

export const getCurrentSchedule = async (): Promise<Tech.ScheduleItem[]> => {
    const schedule = await collection;

    const result: Tech.PatientFormData[] = await schedule.find({
        date: {
            $gt: getTomorrow().getTime()
        }
    }).sort({ date: 1 }).toArray();

    return result.map(({ date, procedures }) => ({
        date,
        procedures
    }));
}

export const findOne = async (date: number): Promise<Tech.ScheduleItem | undefined> => {
    const schedule = await collection;

    const result = await schedule.findOne({ date });

    if (!result) return;

    return {
        date: result.date,
        procedures: result.procedures,
    }
}

export const addToSchedule = async (data: Tech.PatientFormData) => {
    const schedule = await collection;

    if (await findOne(data.date)) {
        return false;
    }

    await schedule.insertOne(data);

    return true;
}
