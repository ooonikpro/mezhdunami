import {
  getScheduleForMonth,
  getLocaleDate,
  getLocalizedWeekday,
  getLocalizedDate,
  getLocalizedFullDate,
  getLocalizedShortDate,
  getTomorrow,
  createDate,
} from '@/utils/calendar';

export const useCalendar = () => ({
  getScheduleForMonth,
  getLocaleDate,
  getLocalizedWeekday,
  getLocalizedDate,
  getLocalizedFullDate,
  getLocalizedShortDate,
  getTomorrow,
  createDate,
});
