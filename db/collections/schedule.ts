import { getCollection } from "../mongo";
import { useCalendar } from "~~/composables/useCalendar";

const collection = getCollection('schedule');
const { getTomorrow } = useCalendar();

type ScheduleItem = Pick<Tech.PatientFormData, 'date' | 'procedures'>;

export const getCurrentSchedule = async (): Tech.CollectionWithMap<ScheduleItem, Tech.PatientFormData['procedures']> => {
    const schedule = await collection;

    const result: Tech.PatientFormData[] = await schedule.find({
        date: {
            $gt: getTomorrow()
        }
    }).sort({ date: 1 }).toArray();

    const response = {
        data: [],
        map: {}
    }

    result.forEach(({ date, procedures }) => {
        response.map[date] = procedures;

        response.data.push({
            date,
            procedures
        });
    })

    return response;
}

export const findOne = async (date: number): Promise<ScheduleItem | undefined> => {
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
