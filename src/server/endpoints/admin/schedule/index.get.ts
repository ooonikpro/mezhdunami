import { ADMIN_API_URL, BASE_ADMIN_API_URL } from '@/constants/adminUrls';
import { findSchedule } from '@/server/db/collections/schedule';
import { server } from '@/server/instance';
import { getRouteOptions } from '@/utils/getRouteOptions';

server.route({
  method: 'GET',
  path: BASE_ADMIN_API_URL(ADMIN_API_URL.SCHEDULE),
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
  options: getRouteOptions(),
});
