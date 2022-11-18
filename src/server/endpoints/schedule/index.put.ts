import { server } from '@/server/instance';
import { insertOneSchedule } from '@/server/db/collections/schedule';
import { notifyAboutNew } from '@/server/services';
import type { PatientFormData } from '@/types';
import { BASE_API_URL } from '@/constants/baseAPIUrl';
import { API_URL } from '@/constants/clientUrls';
import { notifyPatientAboutNewReg } from '@/server/services/smsAero';

server.route({
  method: 'PUT',
  path: BASE_API_URL(API_URL.SCHEDULE),
  handler: async (req: Record<string, any>) => {
    try {
      const patient = req.payload as PatientFormData;
      const success = await insertOneSchedule(patient);

      if (success) {
        notifyAboutNew(patient);
        notifyPatientAboutNewReg(patient);
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
        message: (e! as Error).message,
      };
    }
  },
});
