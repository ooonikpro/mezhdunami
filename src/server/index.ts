import { server } from '@/server/instance';

import '@/server/endpoints';
import '@/server/services/reminders';

server.start();

console.log(`Listening on ${server.settings.host}:${server.settings.port}`);

process.on('unhandledRejection', (err) => {
  console.error(err);
});
