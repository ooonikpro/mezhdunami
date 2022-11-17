import { server } from '@/server/instance';
import { findBookedDates, findNonWorkingDates } from '@/server/db/collections';

server.route({
  method: 'GET',
  path: '/api/schedules',
  handler: async () => {
    try {
      const notWorkingDates = await findNonWorkingDates();
      const bookedDates = await findBookedDates();

      return {
        data: {
          excludedDates: [...notWorkingDates, ...bookedDates].sort(),
        },
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
