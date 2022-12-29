import { ADMIN_API_URL, BASE_ADMIN_API_URL } from '@/constants/adminUrls';
import { updateOneSchedule } from '@/server/db/collections/schedule';
import { server } from '@/server/instance';
import { notifyPatientAboutUpdate } from '@/server/services';
import { deleteReminder, createReminder } from '@/server/services/reminders';
import { PatientFormData } from '@/types';
import { getRouteOptions } from '@/utils/getRouteOptions';
import { ObjectId } from 'mongodb';

server.route({
  method: 'PUT',
  path: BASE_ADMIN_API_URL(`${ADMIN_API_URL.SCHEDULE}/{id}`),
  handler: async (req) => {
    const { id } = req.params;
    const formData = req.payload as PatientFormData;

    try {
      const success = await updateOneSchedule(id, formData);

      if (success) {
        deleteReminder(new ObjectId(id));
        notifyPatientAboutUpdate(formData);

        if (formData.notify) {
          createReminder(id, formData);
        }
      }

      return {
        data: success,
        success: true,
      };
    } catch (e) {
      console.log(e);

      return {
        data: [],
        success: false,
        message: e,
      };
    }
  },
  options: getRouteOptions(),
});
