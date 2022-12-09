import { server } from '@/server/instance';
import { insertOneSchedule } from '@/server/db/collections/schedule';
import { notifyAboutNew, notifyPatientAboutNewReg } from '@/server/services';
import type { PatientFormData } from '@/types';
import { BASE_API_URL, API_URL } from '@/constants/urls';
import { patientReminderMsg } from '@/templates/messages';
import { insertOneReminder } from '../../db/collections/reminders';

server.route({
  method: 'PUT',
  path: BASE_API_URL(API_URL.SCHEDULE),
  handler: async (req: Record<string, any>) => {
    try {
      const patient = req.payload as PatientFormData;
      const scheduleId = await insertOneSchedule(patient);

      if (scheduleId) {
        notifyAboutNew(patient);
        notifyPatientAboutNewReg(patient);

        if (patient.notify) {
          insertOneReminder({
            scheduleId,
            deliveryDate: patient.date - 24 * 36e5,
            notificationPayload: {
              to: patient.phone,
              method: patient.notificationType,
              message: patientReminderMsg(patient),
            },
          });
        }
      }

      return {
        data: true,
        success: true,
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
