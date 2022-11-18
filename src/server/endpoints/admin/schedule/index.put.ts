import { ADMIN_API_URL, BASE_ADMIN_API_URL } from '@/constants/adminUrls';
import { updateOneSchedule } from '@/server/db/collections/schedule';
import { server } from '@/server/instance';
import { notifyPatientAboutUpdate } from '@/server/services';
import { PatientFormData } from '@/types';

server.route({
  method: 'PUT',
  path: BASE_ADMIN_API_URL(`${ADMIN_API_URL.SCHEDULE}/{_id}`),
  handler: async (req) => {
    const { _id } = req.params;
    const formData = req.payload as PatientFormData;

    try {
      const success = await updateOneSchedule(_id, formData);

      if (success) {
        notifyPatientAboutUpdate(formData);
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
});
