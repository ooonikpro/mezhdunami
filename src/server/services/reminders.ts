import { ReminderPayload } from '@/types';
import { deleteOneReminder, findAllReminders, insertOneReminder } from '@/server/db/collections';
import { notify } from '@/server/services/notifications';

const queue = new Map();

export const deleteReminder = (scheduleId: ReminderPayload['scheduleId']) => {
  const timer = queue.get(scheduleId);

  clearTimeout(timer);
  deleteOneReminder(String(scheduleId));
  queue.delete(scheduleId);
};

const addToQueue = (payload: ReminderPayload) => {
  const timer = setTimeout(async () => {
    try {
      await notify(payload.notificationPayload);
    } catch (e) {
      console.error(e);
    } finally {
      deleteReminder(payload.scheduleId);
    }
  }, payload.deliveryDate - Date.now());

  queue.set(payload.scheduleId, timer);
};

export const createReminder = (payload: ReminderPayload) => {
  insertOneReminder(payload);
  addToQueue(payload);
};

(async function restore() {
  const reminders = await findAllReminders();

  await reminders.forEach(addToQueue);
}());
