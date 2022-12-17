import { ResponseAPI } from '@/types';
import axios from 'axios';
import { API_URL, BASE_API_URL } from '@/constants/urls';

const httpClient = axios.create({
  baseURL: BASE_API_URL(),
  validateStatus: (status) => status === 200,
});

const request = async (phone: string, code?: string) => {
  const { success, data, message } = await httpClient.post<ResponseAPI<boolean>>(API_URL.CONFIRM, { phone, code }).then(({ data }) => data);

  if (success) {
    return data;
  }

  throw new Error(message);
};

export const confirmPhone = (phone: string, code: string) => request(phone, code);

export const sendOneTimeCodeFor = (phone: string) => request(phone);
