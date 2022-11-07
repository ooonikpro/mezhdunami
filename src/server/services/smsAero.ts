import { fetch } from '@/server/httpClient';

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

const BASE_URL = 'https://gate.smsaero.ru/v2/';
const username = process.env.EMAIL || '';
const password = process.env.SMS_API_KEY || '';

export const sendMessage = async (to: string, message: string) => {
  try {
    const formData = {
      number: to,
      text: message,
      sign: 'SMSAero',
    };

    let url = BASE_URL + '/sms/testsend';

    if (process.env.NODE_ENV === 'production') {
      url = BASE_URL + '/sms/send';
    }

    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Authorization': `Basic ${Buffer.from(username + ':' + password).toString('base64')}`
      }
    }).then(response => response.json()).then((data) => data as ResponseAPI<SMSAeroSended>);

    if (!response.success) {
      throw new Error(response.message);
    }

    return response;
  } catch (e) {
    console.error(e);
    throw e;
  }
};
