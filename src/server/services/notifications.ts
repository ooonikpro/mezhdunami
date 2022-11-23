import * as sms from '@/server/services/smsAero';
import * as tg from '@/server/services/telegramBot';
import {
  NotificationType, NotificationPayload, PhoneNumber, TelegramChatId,
} from '@/types';

type NotificationMethod<T extends PhoneNumber | TelegramChatId> = (to: T, message: string) => boolean;

const notificationMethod: Record<NotificationType, NotificationMethod<PhoneNumber | TelegramChatId>> = {
  [NotificationType.SMS]: sms.sendMessage,
  [NotificationType.Viber]: sms.sendMessage,
  [NotificationType.WhatsApp]: sms.sendMessage,
  [NotificationType.Telegram]: tg.sendMessage,
};

export const notify = ({
  method, to, date, message,
}: NotificationPayload) => {
  const sendMessage = notificationMethod[method];
};
