import * as sms from '@/server/services/smsAero';
import * as tg from '@/server/services/telegramBot';
import {
  NotificationType, NotificationPayload, PhoneNumber, TelegramChatId,
} from '@/types';

type NotificationMethod<T extends PhoneNumber | TelegramChatId> = (to: T, message: string) => Promise<boolean>;

const notificationMethod: Record<NotificationType, NotificationMethod<PhoneNumber | TelegramChatId>> = {
  [NotificationType.SMS]: sms.sendSMSMessage,
  [NotificationType.Viber]: sms.sendViberMessage,
  [NotificationType.WhatsApp]: sms.sendWhatsAppMessage,
  [NotificationType.Telegram]: tg.sendMessage,
};

const queue = new Map();

export const notify = ({
  method, to, date, message,
}: NotificationPayload) => {
  const sendMessage = notificationMethod[method];

  sendMessage(to, message);
};
