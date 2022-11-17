import { server } from '@/server/instance';
import { insertOneSchedule } from '@/server/db/collections/schedule';
import { notifyAboutNew } from '@/server/services';
import type { PatientFormData } from '@/types';
import { notifyPatientAboutNewReg } from '../../services/smsAero';

server.route({
  method: 'POST',
  path: '/api/schedules',
  handler: async (req: Record<string, any>) => {
    try {
      const patient = JSON.parse(req.payload) as PatientFormData;
      const success = await insertOneSchedule(patient);

      if (success) {
        notifyAboutNew(patient);
        // notifyPatientAboutNewReg(patient);
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
