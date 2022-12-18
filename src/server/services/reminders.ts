import { ADMIN_CHAT_ID } from '@/constants/tgChats';
import { ObjectId } from 'mongodb';
import cron from 'node-cron';
import { ReminderPayload, PatientFormData, NotificationType } from '@/types';
import { deleteOneReminder, findNearestReminders, insertOneReminder } from '@/server/db/collections';
import { notify } from '@/server/services/notifications';
import { patientReminderMsg } from '@/templates/messages';

const queue = new Map();

export const deleteReminder = (scheduleId: ReminderPayload['scheduleId']) => {
  const timer = queue.get(scheduleId);

  clearTimeout(timer);
  deleteOneReminder(String(scheduleId));
  queue.delete(scheduleId);
};

const addToQueue = (payload: ReminderPayload, timeoutInSec = 0) => {
  const timer = setTimeout(async () => {
    try {
      await notify(payload.notificationPayload);
    } catch (e) {
      console.error(e);
    } finally {
      deleteReminder(payload.scheduleId);
    }
  }, timeoutInSec * 1000);

  queue.set(payload.scheduleId, timer);
};

export const createReminder = (scheduleId: ObjectId, patient: PatientFormData) => {
  insertOneReminder({
    scheduleId,
    deliveryDate: patient.date - 24 * 36e5,
    notificationPayload: {
      to: patient.phone,
      method: patient.notificationType,
      message: patientReminderMsg(patient),
    },
  });
};

const sendReminders = async () => {
  const reminders = await findNearestReminders();

  reminders.forEach(addToQueue);

  notify({
    method: NotificationType.Telegram,
    to: ADMIN_CHAT_ID,
    message: `[Reminders] It's time to choose... ${reminders.map((item) => item.deliveryDate)}`,
  });
};

export const createCronJob = () => {
  sendReminders();

  cron.schedule('0 11 1-31 * *', sendReminders, {
    scheduled: true,
    timezone: 'Europe/Kaliningrad',
  });
};
