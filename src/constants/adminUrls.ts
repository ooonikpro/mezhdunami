import { BASE_API_URL } from '@/constants/urls';

export const BASE_ADMIN_API_URL = <T extends string>(url = '' as T) => BASE_API_URL('/admin') + url;

export const ADMIN_API_URL = {
  SCHEDULE: '/schedule',
  NON_WORKING_DATES: '/non-working-dates',
  PATIENT: '/patient',
};
