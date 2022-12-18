import axios from 'axios';
import { ADMIN_API_URL, BASE_ADMIN_API_URL } from '@/constants/adminUrls';
import { ResponseAPI } from '@/types';
import { setCookie } from '@/utils/cookies';
import { COOKIE_KEY } from '@/constants';

const httpClient = axios.create({
  baseURL: BASE_ADMIN_API_URL(),
  validateStatus: (status) => status === 200,
});

export const login = async (form: { login: string; password: string }) => {
  try {
    const token = btoa(`${form.login}:${form.password}`);
    const response = await httpClient.post<ResponseAPI<string>>(ADMIN_API_URL.LOGIN, { token }).then(({ data }) => data);

    setCookie(COOKIE_KEY.token, response.data);

    return response.success;
  } catch (e) {
    return false;
  }
};
