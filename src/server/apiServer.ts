import Fastify, { FastifyInstance } from 'fastify'
import { getSchedules } from '@/server/api/schedules/index.get';
import { postSchedules } from '@/server/api/schedules/index.post';

const app: FastifyInstance = Fastify({logger: true});

app.get('/api/schedules', getSchedules);
app.post('/api/schedules', postSchedules);

app.listen({
  host: 'localhost',
  port: 3000
});
