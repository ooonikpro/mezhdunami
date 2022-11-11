import { addToSchedule } from '~~/db/collections/schedule';
import { notifyAboutNew } from '~~/services';

export default defineEventHandler<ResponseAPI<boolean>>(async (event) => {
  try {
    const patient = await readBody<PatientFormData>(event);
    const success = await addToSchedule(patient);

    if (success) {
      notifyAboutNew(patient);
    }

    return {
      data: true,
      success,
      message: null
    };
  } catch (e) {
    console.error(e);

    return {
      data: null,
      success: false,
      message: e.message
    };
  }
});
