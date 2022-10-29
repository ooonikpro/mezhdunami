import { addToSchedule } from "~~/db/collections/schedule";
import { useTelegramBot } from "~~/composables/useTelegramBot";

export default defineEventHandler<Tech.ResponseAPI<boolean>>(async (event) => {
    try {
        const data = await readBody(event);
        const success = await addToSchedule(data);

        if (!success) {
            throw new Error('Это время уже занято. Пожалуйста, выберите другое');
        }

        useTelegramBot();

        return {
            data: true,
            success,
        }
    } catch (e) {
        return {
            data: null,
            success: false,
            message: e.message
        }
    }
});
