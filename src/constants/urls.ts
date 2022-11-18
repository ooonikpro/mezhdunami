export const BASE_API_URL = <T extends string>(url = '' as T): `/api${T}` => `/api${url}`;

export const API_URL = {
  CONFIRM: '/confirm',
  SCHEDULE: '/schedule',
};
