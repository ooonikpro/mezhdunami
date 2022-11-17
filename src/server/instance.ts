import Hapi, { Server } from '@hapi/hapi';

export const server: Server = Hapi.server({
  port: 3000,
  host: '0.0.0.0',
});
