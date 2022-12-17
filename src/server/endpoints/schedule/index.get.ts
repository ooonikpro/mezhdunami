import { server } from '@/server/instance';
import { findBookedDates, findNonWorkingDates } from '@/server/db/collections';
import { API_URL, BASE_API_URL } from '@/constants/urls';
import { zipNonWorkingDates } from '@/utils/calendar';
import { getRouteOptions } from '@/utils/getRouteOptions';

server.route({
  method: 'GET',
  path: BASE_API_URL(API_URL.SCHEDULE),
  handler: async () => {
    try {
      const notWorkingDates = await findNonWorkingDates();
      const bookedDates = await findBookedDates();

      return {
        data: {
          excludedDates: zipNonWorkingDates([...notWorkingDates, ...bookedDates]),
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
  options: getRouteOptions(),
});
