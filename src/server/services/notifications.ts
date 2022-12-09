import * as sms from '@/server/services/smsAero';
import * as tg from '@/server/services/telegramBot';
import {
  newPatientMsg, newRegMsg, oneTimeCodeMsg, patientScheduleUpdatedMsg,
  patientScheduleRemoveMsg,
} from '@/templates/messages';
import {
  NotificationType, NotificationPayload, PhoneNumber, TelegramChatId,
  PatientFormData,
} from '@/types';
import { ADMIN_CHAT_ID, DOCTOR_CHAT_ID } from '@/constants/tgChats';
import { IS_PROD } from '@/constants/env';

type NotificationMethod<T extends PhoneNumber | TelegramChatId> = (to: T, message: string) => Promise<boolean>;

const notificationMethod: Record<NotificationType, NotificationMethod<PhoneNumber | TelegramChatId>> = {
  [NotificationType.SMS]: sms.sendSMSMessage,
  [NotificationType.Viber]: sms.sendViberMessage,
  [NotificationType.WhatsApp]: sms.sendWhatsAppMessage,
  [NotificationType.Telegram]: tg.sendMessage,
};

export const notify = ({ method, to, message }: NotificationPayload) => {
  const sendMessage = notificationMethod[method];

  if (sendMessage) {
    return sendMessage(to, message);
  }

  throw new TypeError(`Неверный способ доставки! "${method}" не найден`);
};

export const notifyAboutNew = (patient: PatientFormData) => {
  const method = NotificationType.Telegram;
  const message = newPatientMsg(patient);

  notify({
    to: ADMIN_CHAT_ID,
    method,
    message,
  });

  if (IS_PROD) {
    notify({
      to: DOCTOR_CHAT_ID,
      method,
      message,
    });
  }
};

export const notifyPatientAboutNewReg = (patient: PatientFormData) => {
  notify({
    to: patient.phone,
    method: patient.notificationType,
    message: newRegMsg(patient),
  });
};

export const notifyPatientOneTimeCode = (to: PhoneNumber, code: string) => {
  notify({
    to,
    method: NotificationType.SMS,
    message: oneTimeCodeMsg(code),
  });
};

export const notifyPatientAboutUpdate = (patient: PatientFormData) => {
  notify({
    to: patient.phone,
    method: patient.notificationType,
    message: patientScheduleUpdatedMsg(patient),
  });
};

export const notifyPatientAboutCancel = (patient: PatientFormData) => {
  notify({
    to: patient.phone,
    method: patient.notificationType,
    message: patientScheduleRemoveMsg(),
  });
};
