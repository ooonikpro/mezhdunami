import { addToSchedule } from "~~/db/collections/schedule";
import { useCalendar } from '~~/composables/useCalendar';
import { useProcedures } from '~~/composables/useProcedures';
import { notifySubscribers } from '~~/services/telegramBot';

const getNotificationText = (data: Tech.PatientFormData) => {
    const { getLocalizedFullDate } = useCalendar();
    const { getNames } = useProcedures();

    return `<b>${getLocalizedFullDate(data.date)}</b>\nИмя: <b>${data.name}</b>\nТелефон: ${data.phone}\nПроцедуры: <b>${getNames(data.procedures)}</b>`;
}

export default defineEventHandler<Tech.ResponseAPI<boolean>>(async (event) => {
    try {
        const data = await readBody<Tech.PatientFormData>(event);
        const success = await addToSchedule(data);

        if (!success) {
            throw new Error('Это время уже занято. Пожалуйста, выберите другое');
        }

        notifySubscribers(getNotificationText(data))

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
