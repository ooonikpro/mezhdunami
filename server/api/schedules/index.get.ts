import { getBookedDates, getNotWorkingDates } from "~~/db/collections";

export default defineEventHandler(async () => {
    try {
        const notWorkingDates = await getNotWorkingDates();
        const bookedDates = await getBookedDates()

        return {
            data: {
                excludedDates: [].concat(notWorkingDates, bookedDates).sort(),
            } as Tech.ScheduleFilters,
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
