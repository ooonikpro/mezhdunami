import { server } from '@/server/instance';
import { DateNumber } from '@/types';
import { updateNonWorkingDates } from '@/server/db/collections/notWorkingDays';

server.route({
  method: 'POST',
  path: '/api/admin/non-working-dates',
  handler: async (req) => {
    const { dates } = req.payload as { dates: DateNumber[] };

    try {
      return {
        data: await updateNonWorkingDates(dates),
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
