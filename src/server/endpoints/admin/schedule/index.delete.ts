import { ADMIN_API_URL, BASE_ADMIN_API_URL } from '@/constants/adminUrls';
import { deleteOneSchedule } from '@/server/db/collections/schedule';
import { server } from '@/server/instance';

server.route({
  method: 'DELETE',
  path: BASE_ADMIN_API_URL(`${ADMIN_API_URL.SCHEDULE}/{id}`),
  handler: async (req) => {
    const { id } = req.params;

    try {
      const res = await deleteOneSchedule(id);

      return {
        data: res,
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
