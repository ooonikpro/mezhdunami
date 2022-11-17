import { server } from '@/server/instance';

import '@/server/api/schedules';
import '@/server/api/admin';

server.start();

console.log(`Listening on ${server.settings.host}:${server.settings.port}`);

process.on('unhandledRejection', (err) => {
  console.error(err);
});
