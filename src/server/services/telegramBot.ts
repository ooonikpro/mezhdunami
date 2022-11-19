import axios from 'axios';
import type { PatientFormData } from '@/types';
import { TELEGRAM_BOT_KEY } from '@/constants/env';
import { newPatientMsg } from '@/templates/messages';

const httpClient = axios.create({
  baseURL: `https://api.telegram.org/bot${TELEGRAM_BOT_KEY}`,
});

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

  return httpClient.get(`/sendMessage?${params}`);
};

export const notifySubscribers = (message: string) => subscribers.map((to) => sendMessage(to, message));

export const notifyAboutNew = (patient: PatientFormData) => notifySubscribers(newPatientMsg(patient));
