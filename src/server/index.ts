import { server } from '@/server/instance';

import '@/server/endpoints';

server.start();

console.log(`Listening on ${server.settings.host}:${server.settings.port}`);

process.on('unhandledRejection', (err) => {
  console.error(err);
});
