import { getLocalizedShortDate, getNames, getNames } from '@/utils';
import axios from 'axios';
import { ADMIN_EMAIL, SMS_API_KEY, IS_PROD } from '@/constants/env';
import type { ResponseAPI } from '@/types';
import { NotificationType, PatientFormData, PhoneNumber } from '@/types';

interface SMSAeroSended {
  id: number
  from: string
  text: string
  status: number
  extendStatus: 'delivery' | string
  channel: 'FREE SIGN' | 'PAY SIGN' | 'SERVICE'
  cost: number
  dateCreate: number
  dateAnswer: number
}

const httpClient = axios.create({
  baseURL: 'https://gate.smsaero.ru/v2/',
  auth: {
    username: ADMIN_EMAIL,
    password: SMS_API_KEY,
  },
});

const methods = {
  [NotificationType.SMS]: 'sms',
  [NotificationType.Viber]: 'vider',
  [NotificationType.WhatsApp]: 'whatsapp',
};

export const sendMessage = async (to: string, message: string, method: NotificationType = NotificationType.SMS) => {
  try {
    const formData = {
      number: to,
      text: message,
      sign: 'SMSAero',
    };

    let url = `/${methods[method]}`;

    if (IS_PROD) {
      url += '/send';
    } else {
      url += '/testsend';
    }

    const response = await httpClient.post<ResponseAPI<SMSAeroSended>>(url, formData).then(({ data }) => data);

    if (!response.success) {
      throw new Error(response.message);
    }

    return response;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export const notifyPatientAboutNewReg = (data: PatientFormData) => {
  const date = getLocalizedShortDate(data.date);
  const procedures = getNames(data.procedures);

  const message = `Между Нами. Вы записаны к косметологу, ${date}, ${procedures}`;

  return sendMessage(data.phone, message, data.notificationType);
};

export const notifyPatientAboutUpdate = (data: PatientFormData) => {
  const date = getLocalizedShortDate(data.date);

  const message = `Между Нами. Ваша запись к косметологу, перенесена на ${date}.`;

  return sendMessage(data.phone, message, data.notificationType);
};

export const sendOneTimeCode = (phone: PhoneNumber, code: string) => {
  const message = `Код подтверждения: ${code}`;

  return sendMessage(phone, message);
};
