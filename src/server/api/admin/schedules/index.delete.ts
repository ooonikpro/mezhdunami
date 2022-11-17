import { deleteOneSchedule } from '@/server/db/collections/schedule';
import { server } from '@/server/instance';

server.route({
  method: 'DELETE',
  path: '/api/admin/schedules/{_id}',
  handler: async (req) => {
    const { _id } = req.params;

    try {
      const res = await deleteOneSchedule(_id);

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
