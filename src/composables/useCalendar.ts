import {
  getScheduleForMonth,
  getLocalizedWeekday,
  getLocalizedDate,
  getLocalizedFullDate,
  getTomorrow,
  createDate,
} from '@/utils/calendar';

export const useCalendar = () => ({
  getScheduleForMonth,
  getLocalizedWeekday,
  getLocalizedDate,
  getLocalizedFullDate,
  getTomorrow,
  createDate,
});
