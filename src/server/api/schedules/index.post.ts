import { addToSchedule } from '@/server/db/collections/schedule';
import { notifyAboutNew } from '@/server/services';
import type { PatientFormData } from '@/types';

export const postSchedules = async (req: Record<string, any>) => {
  try {
    const patient = req.payload as PatientFormData;
    const success = await addToSchedule(patient);

    if (success) {
      notifyAboutNew(patient);
    }

    return {
      data: true,
      success,
      message: null,
    };
  } catch (e) {
    console.error(e);

    return {
      data: null,
      success: false,
      message: e,
    };
  }
};
