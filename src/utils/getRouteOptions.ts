import { RouteOptions } from '@hapi/hapi';
import { SITE_ORIGIN, IS_PROD } from '@/constants/env';

export const getRouteOptions = (): RouteOptions => ({
  security: {
    referrer: 'same-origin',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    xss: 'enabled',
  },
  validate: {
    headers: async (value) => {
      const {
        referer,
        'x-nginx-from': isNginxFrom,
        'postman-token': postmanToken,
        'user-agent': userAgent,
      } = value as Record<string, string>;

      if (IS_PROD && (
        !isNginxFrom
        || !referer.includes(SITE_ORIGIN)
        || /(postman|curl)/gi.test(userAgent)
        || postmanToken)
      ) {
        throw new Error('oops');
      }
    },

    failAction: () => {
      throw new Error();
    },
  },
});
