import { server } from '@/server/instance';
import { createCronJob } from '@/server/services/reminders';

import '@/server/endpoints';

createCronJob();

server.start();

console.log(`Listening on ${server.settings.host}:${server.settings.port}`);

process.on('unhandledRejection', (err) => {
  console.error(err);
});
