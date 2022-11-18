import { findSchedule } from '@/server/db/collections/schedule';
import { server } from '@/server/instance';

server.route({
  method: 'GET',
  path: '/api/admin/schedules',
  handler: async (req) => {
    const from = req.query.from ? Number(req.query.from) : undefined;
    const until = req.query.until ? Number(req.query.until) : undefined;

    try {
      return {
        data: await findSchedule({ from, until }),
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
