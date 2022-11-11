import Hapi, { Server } from '@hapi/hapi';
import { getSchedules } from '@/server/api/schedules/index.get';
import { postSchedules } from '@/server/api/schedules/index.post';

const server: Server = Hapi.server({
    port: 3000,
    host: '0.0.0.0'
});

server.route({
  method: 'GET',
  path: '/api/schedules',
  handler: getSchedules
});

server.route({
  method: 'POST',
  path: '/api/schedules',
  handler: postSchedules
});

console.log(`Listening on ${server.settings.host}:${server.settings.port}`);
server.start();

process.on('unhandledRejection', (err) => {
    console.error("unhandledRejection");
    console.error(err);
    process.exit(1);
});
