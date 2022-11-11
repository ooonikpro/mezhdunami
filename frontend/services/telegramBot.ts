import axios from 'axios';
import { getLocalizedFullDate, getNames } from '@/utils';

const client = axios.create({
  baseURL: `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_KEY || ''}`
});

const subscribers = ['209442952'];

if (process.env.NODE_ENV === 'production') {
  subscribers.push('460173300');
}

const sendMessage = (to: string, message: string) => client.get('/sendMessage', {
  params: {
    chat_id: to,
    text: message,
    parse_mode: 'HTML',
    disable_notification: false
  }
}).then(({ data }) => data);

export const notifySubscribers = (message: string) => subscribers.map(to => sendMessage(to, message));

export const notifyAboutNew = (patient: PatientFormData) => {
  const text = `<b>${getLocalizedFullDate(patient.date)}</b>\nИмя: <b>${patient.name}</b>\nТелефон: ${patient.phone}\nПроцедуры: <b>${getNames(patient.procedures)}</b>`;

  return notifySubscribers(text);
};
