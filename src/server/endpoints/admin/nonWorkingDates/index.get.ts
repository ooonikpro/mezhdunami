import { server } from '@/server/instance';
import { findNonWorkingDates } from '@/server/db/collections';

server.route({
  method: 'GET',
  path: '/api/admin/non-working-dates',
  handler: async (req) => {
    const from = req.query.from ? Number(req.query.from) : undefined;
    const until = req.query.until ? Number(req.query.until) : undefined;

    try {
      return {
        data: await findNonWorkingDates({ from, until }),
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
