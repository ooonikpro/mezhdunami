import { addToSchedule } from "../services/ScheduleService";

export default defineEventHandler(async (event) => {
    const data = await readBody(event);

    return await addToSchedule(data);
});
