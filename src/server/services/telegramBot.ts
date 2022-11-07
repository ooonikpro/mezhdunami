import { fetch } from '@/server/httpClient';
import { getLocalizedFullDate, getNames } from '@/utils';

const BASE_URL = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT || ''}`;

const subscribers = ['209442952'];

if (process.env.NODE_ENV === 'production') {
  subscribers.push('460173300');
}

const sendMessage = (to: string, message: string) => {
  const params = new URLSearchParams();

  Object.entries({
    chat_id: to,
    text: message,
    parse_mode: 'HTML',
    disable_notification: false,
  }).forEach(([key, value]) => params.set(key, String(value)));

  return fetch(`${BASE_URL}/sendMessage?${params}`).then((response) => response.json());
}

export const notifySubscribers = (message: string) => subscribers.map((to) => sendMessage(to, message));

export const notifyAboutNew = (patient: PatientFormData) => {
  // eslint-disable-next-line
  const text = `<b>${getLocalizedFullDate(patient.date)}</b>\nИмя: <b>${patient.name}</b>\nТелефон: ${patient.phone}\nПроцедуры: <b>${getNames(patient.procedures)}</b>`;

  return notifySubscribers(text);
};
