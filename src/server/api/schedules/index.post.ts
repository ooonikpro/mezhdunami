// import { addToSchedule } from '@/server/db/collections/schedule';
// import { notifyAboutNew } from '@/server/services';

// export const postSchedules = async (event) => {
//   try {
//     const patient = await readBody<PatientFormData>(event);
//     const success = await addToSchedule(patient);

//     if (success) {
//       notifyAboutNew(patient);
//     }

//     return {
//       data: true,
//       success,
//       message: null,
//     };
//   } catch (e) {
//     console.error(e);

//     return {
//       data: null,
//       success: false,
//       message: e,
//     };
//   }
// };
