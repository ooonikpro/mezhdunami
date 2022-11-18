import { updateOneSchedule } from '@/server/db/collections/schedule';
import { server } from '@/server/instance';
import { PatientFormData } from '@/types';

server.route({
  method: 'PUT',
  path: '/api/admin/schedules/{_id}',
  handler: async (req) => {
    const { _id } = req.params;
    const formData = req.payload as PatientFormData;

    try {
      return {
        data: await updateOneSchedule(_id, formData),
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
});
