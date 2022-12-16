import cron from 'node-cron';
import { ReminderPayload } from '@/types';
import { deleteOneReminder, findNearestReminders } from '@/server/db/collections';
import { notify } from '@/server/services/notifications';

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

const sendReminders = async () => {
  const reminders = await findNearestReminders();

  reminders.forEach(addToQueue);

  console.log(new Date(), '[Reminders] It\'s time to choose...', reminders.map((item) => item.deliveryDate));
};

export const createCronJob = () => {
  cron.schedule('0 11 1-31 * *', sendReminders);
};
