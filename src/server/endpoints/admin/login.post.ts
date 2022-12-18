import * as dotenv from 'dotenv';

import { server } from '@/server/instance';
import { ADMIN_API_URL, BASE_ADMIN_API_URL } from '@/constants/adminUrls';
import { getRouteOptions } from '@/utils/getRouteOptions';
import { encode } from '@/utils/encoder';

dotenv.config();

const tokens = ['b3ZlY2hraW4ubjpaZXlkZXIwNGI2NA==', 'b3ZlY2hraW5hLmU6RWxlbmEwNjEwMTk5NQ=='];

server.route({
  method: 'POST',
  path: BASE_ADMIN_API_URL(ADMIN_API_URL.LOGIN),
  handler: async (req, h) => {
    const { token } = req.payload as { token: string };

    try {
      const isValid = tokens?.includes(token);

      if (!isValid) {
        throw new Error('oooops');
      }

      req.auth.isAuthenticated = isValid;

      return {
        data: encode(token),
        success: isValid,
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
