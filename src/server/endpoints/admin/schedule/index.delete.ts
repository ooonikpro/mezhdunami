import { ADMIN_API_URL, BASE_ADMIN_API_URL } from '@/constants/adminUrls';
import { findOneScheduleById } from '@/server/db/collections';
import { deleteOneSchedule } from '@/server/db/collections/schedule';
import { server } from '@/server/instance';
import { notifyPatientAboutCancel } from '@/server/services';

server.route({
  method: 'DELETE',
  path: BASE_ADMIN_API_URL(`${ADMIN_API_URL.SCHEDULE}/{id}`),
  handler: async (req) => {
    const { id } = req.params;

    try {
      const patient = await findOneScheduleById(id);
      const res = await deleteOneSchedule(id);

      if (res) {
        notifyPatientAboutCancel(patient);
      }

      return {
        data: true,
        success: true,
      };
    } catch (e) {
      console.log(e);

      return {
        data: false,
        success: false,
        message: e,
      };
    }
  },
});
