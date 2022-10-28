import { getCurrentSchedule, getNotWorkingDates } from "~~/db/collections";
import { useCalendar } from "~~/composables/useCalendar";

const { getCalendarMonth } = useCalendar();

export default defineEventHandler<Tech.ResponseAPI<Tech.Schedule>>(async () => {
    try {
        const bookedDates = await getCurrentSchedule();
        const notWorkingDates = await getNotWorkingDates();

        const data = getCalendarMonth({ notWorkingDates: notWorkingDates.map, bookedDates: bookedDates.map });

        return {
            data,
            success: true,
        }
    } catch (e) {
        return {
            data: [],
            success: false,
            message: e.message,
        }
    }
});
