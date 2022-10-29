import { getCollection } from "../mongo";
import { useCalendar } from "~~/composables/useCalendar";
import { useProcedures } from "~~/composables/useProcedures";

const collection = getCollection('schedule');

type ScheduleItem = Pick<Tech.PatientFormData, 'date' | 'procedures'>;

export const getBookedDates = async (): Promise<Tech.BookedDates> => {
    const { getTomorrow } = useCalendar();
    const { getReservedTimeSlots } = useProcedures();

    const schedule = await collection;

    const result: Tech.PatientFormData[] = await schedule.find({
        date: {
            $gt: getTomorrow()
        }
    }).sort({ date: 1 }).toArray();


    return result.reduce((response, { date: startDate, procedures }) => response.concat(getReservedTimeSlots(startDate, procedures)), []);
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
