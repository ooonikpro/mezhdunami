import { server } from '@/server/instance';
import { findPatients } from '@/server/db/collections';
import { ADMIN_API_URL, BASE_ADMIN_API_URL } from '@/constants/adminUrls';
import { getRouteOptions } from '@/utils/getRouteOptions';

server.route({
  method: 'GET',
  path: BASE_ADMIN_API_URL(ADMIN_API_URL.PATIENTS),
  handler: async (req) => {
    const { query } = req.query;

    try {
      return {
        data: await findPatients(query),
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
