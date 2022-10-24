import { getCurrentSchedule } from "~~/db/collections";

export default defineEventHandler<Tech.ResponseAPI<number[]>>(async () => {
    try {
        const data = await getCurrentSchedule();

        return {
            data,
            success: true,
        }
    } catch (e) {
        return {
            data: null,
            success: false,
            message: e.message,
        }
    }
});
