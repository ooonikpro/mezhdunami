import { server } from '@/server/instance';
import { findBookedDates, findNonWorkingDates } from '@/server/db/collections';
import { API_URL } from '../../../constants/clientUrls';
import { BASE_API_URL } from '../../../constants/baseAPIUrl';

server.route({
  method: 'POST',
  path: BASE_API_URL(API_URL.SCHEDULE),
  handler: async (req) => {
    console.log(req.headers);

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
