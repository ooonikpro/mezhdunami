import { server } from '@/server/instance';
import { DateNumber } from '@/types';
import { updateNonWorkingDates } from '@/server/db/collections/notWorkingDays';
import { zipNonWorkingDates } from '@/utils';
import { ADMIN_API_URL, BASE_ADMIN_API_URL } from '@/constants/adminUrls';
import { getRouteOptions } from '@/utils/getRouteOptions';

server.route({
  method: 'POST',
  path: BASE_ADMIN_API_URL(ADMIN_API_URL.NON_WORKING_DATES),
  handler: async (req) => {
    const { dates } = req.payload as { dates: DateNumber[] };

    try {
      return {
        data: await updateNonWorkingDates(zipNonWorkingDates(dates)),
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
