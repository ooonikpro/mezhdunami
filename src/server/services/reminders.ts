import { ADMIN_CHAT_ID } from '@/constants/tgChats';
import { ObjectId } from 'mongodb';
import cron from 'node-cron';
import { ReminderPayload, PatientFormData, NotificationType } from '@/types';
import {
  deleteOldReminders, deleteOneReminder, findNearestReminders, insertOneReminder,
} from '@/server/db/collections';
import { notify } from '@/server/services/notifications';
import { patientReminderMsg } from '@/templates/messages';
import { createDate } from '@/utils';

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

export const createReminder = (scheduleId: ObjectId, patient: PatientFormData) => insertOneReminder({
  scheduleId,
  deliveryDate: createDate(patient.date - 864e5, 11).getTime(),
  notificationPayload: {
    to: patient.phone,
    method: patient.notificationType,
    message: patientReminderMsg(patient),
  },
});

const sendReminders = async () => {
  const reminders = await findNearestReminders();

  reminders.forEach(addToQueue);

  notify({
    method: NotificationType.Telegram,
    to: ADMIN_CHAT_ID,
    message: `[Reminders] It's time to reminders... ${reminders.map((item) => item.notificationPayload.to).join('')}`,
  });
};

export const createCronJob = () => {
  deleteOldReminders();
  sendReminders();

  cron.schedule('0 12 1-31 * *', sendReminders, {
    scheduled: true,
    timezone: 'Europe/Kaliningrad',
  });
};
