import { server } from '@/server/instance';
import { insertOneSchedule } from '@/server/db/collections/schedule';
import { notifyAboutNew, notifyPatientAboutNewReg } from '@/server/services';
import type { PatientFormData } from '@/types';
import { BASE_API_URL, API_URL } from '@/constants/urls';
import { createReminder } from '@/server/services/reminders';
import { getRouteOptions } from '@/utils/getRouteOptions';
import { insertOnePatient } from '@/server/db/collections';

server.route({
  method: 'POST',
  path: BASE_API_URL(API_URL.SCHEDULE),
  handler: async (req: Record<string, any>) => {
    try {
      const patient = req.payload as PatientFormData;
      const scheduleId = await insertOneSchedule(patient);

      if (scheduleId) {
        insertOnePatient({
          name: patient.name,
          phone: patient.phone,
          createdAt: new Date(),
          comments: [],
          gender: 'female',
        });

        notifyAboutNew(patient);
        notifyPatientAboutNewReg(patient);

        if (patient.notify) {
          createReminder(scheduleId, patient);
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
  options: getRouteOptions(),
});
