import axios from 'axios';

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

const client = axios.create({
  baseURL: 'https://gate.smsaero.ru/v2/',
  auth: {
    username: process.env.EMAIL || '',
    password: process.env.SMS_API_KEY || '',
  },
});

export const sendMessage = async (to: string, message: string) => {
  try {
    let url = '/sms/testsend';

    if (process.env.NODE_ENV === 'production') {
      url = '/sms/send';
    }

    const response = await client.post<ResponseAPI<SMSAeroSended>>(url, {
      number: to,
      text: message,
      sign: 'SMSAero',
    }).then(({ data }) => data);

    if (!response.success) {
      throw new Error(response.message);
    }

    return response;
  } catch (e) {
    console.error(e);
    throw e;
  }
};
