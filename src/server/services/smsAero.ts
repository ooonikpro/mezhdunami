import axios from 'axios';
import { ADMIN_EMAIL, SMS_API_KEY, IS_PROD } from '@/constants/env';
import type { ResponseAPI } from '@/types';

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

export const sendMessage = async (to: string, message: string) => {
  try {
    const formData = {
      number: to,
      text: message,
      sign: 'SMSAero',
    };

    let url = '/sms/testsend';

    if (IS_PROD) {
      url = '/sms/send';
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
