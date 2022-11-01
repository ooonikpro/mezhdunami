import { addToSchedule } from "~~/db/collections/schedule";
import { notifyAboutNew } from '~~/services/telegramBot';

export default defineEventHandler<Tech.ResponseAPI<boolean>>(async (event) => {
    try {
        const patient = await readBody<Tech.PatientFormData>(event);
        const success = await addToSchedule(patient);

        notifyAboutNew(patient)

        return {
            data: true,
            success,
        }
    } catch (e) {
        console.error(e);

        return {
            data: null,
            success: false,
            message: e.message
        }
    }
});
