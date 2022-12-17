import axios from 'axios';
import { TELEGRAM_BOT_KEY } from '@/constants/env';

const httpClient = axios.create({
  baseURL: `https://api.telegram.org/bot${TELEGRAM_BOT_KEY}`,
});

export const sendMessage = async (to: string, message: string) => {
  try {
    const params = new URLSearchParams();

    Object.entries({
      chat_id: to,
      text: message,
      parse_mode: 'HTML',
      disable_notification: false,
    }).forEach(([key, value]) => params.set(key, String(value)));

    await httpClient.get(`/sendMessage?${params}`);

    return true;
  } catch (e) {
    console.error(e);
  }

  return false;
};
