import type {
  DateNumber, Schedule, ScheduleFilters, ScheduleTimeSlot,
} from '@/types';

export const today = new Date();
export const year = today.getFullYear();
export const month = today.getMonth();
export const day = today.getDate();
export const timeSlots = [10, 11, 12, 13, 14, 15, 16, 17, 18];

export const getUppercase = (str: string) => str[0].toUpperCase() + str.slice(1);

export const getDaysInMonth = (mm: number = month) => new Date(year, mm, 0, 0, 0, 0, 0).getDate();

export const createDate = (date: Date | DateNumber, hour = 0, minutes = 0): Date => {
  const newDate = new Date(date);

  newDate.setHours(hour);
  newDate.setMinutes(minutes);
  newDate.setSeconds(0);
  newDate.setMilliseconds(0);

  return newDate;
};

export const getLocalizedWeekday = (date: Date | DateNumber): string => getUppercase(
  new Date(date).toLocaleString('ru', {
    weekday: 'long',
  }),
);

export const getLocalizedDate = (date: Date | DateNumber): string => new Date(date).toLocaleString('ru', { month: 'long', day: '2-digit' });

export const getLocalizedFullDate = (date: Date | DateNumber) => getUppercase(new Date(date).toLocaleString('ru', {
  month: 'long', day: '2-digit', hour: '2-digit', minute: '2-digit', weekday: 'long',
}));

export const getLocalizedShortDate = (date: Date | DateNumber) => getUppercase(new Date(date).toLocaleString('ru', {
  month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit', weekday: 'short',
}));

export const getLocaleDate = (date: Date | DateNumber) => getUppercase(new Date(date).toLocaleString('ru', {
  month: '2-digit', day: '2-digit', year: 'numeric',
}));

export const getTomorrow = (): DateNumber => createDate(new Date(year, month, day + 1)).getTime();
export const getAfterTomorrow = (): DateNumber => createDate(new Date(year, month, day + 2)).getTime();
export const getNextMonth = (date: Date = today): Date => {
  const newDate = new Date(date);
  newDate.setMonth(newDate.getMonth() + 1);

  return createDate(newDate);
};

export const getScheduleForMonth = ({ excludedDates = [] }: ScheduleFilters): Schedule => {
  const isExcluded = (date: DateNumber) => excludedDates.includes(date);

  const dates = [] as Schedule;

  let futureDays = getDaysInMonth() - day;

  if (futureDays <= 7) {
    futureDays += getDaysInMonth(month + 1);
  }

  for (let i = 0; i < futureDays; i++) {
    const date = createDate(new Date(year, month, day + i + 1)).getTime();

    if (!isExcluded(date)) {
      let dateIsFree = false;

      const slots = timeSlots.map((slot) => {
        const slotTime = createDate(date, slot).getTime();
        const isFree = !isExcluded(slotTime);

        dateIsFree = dateIsFree || isFree;

        return {
          date: slotTime,
          time: `${slot}:00`,
          isFree,
        };
      }) as ScheduleTimeSlot[];

      if (dateIsFree) {
        dates.push({
          date,
          slots,
        });
      }
    }
  }

  return dates;
};

export const getCalendarDates = (from: Date, until: Date): Date[] => {
  const dates = [];

  const totalDays = (until.getTime() - from.getTime()) / 1000 / 3600 / 24;
  const fromYear = from.getFullYear();
  const fromMonth = from.getMonth();
  const fromDate = from.getDate();

  for (let i = 0; i <= totalDays + 1; i++) {
    dates.push(createDate(new Date(fromYear, fromMonth, fromDate + i)));
  }

  return dates;
};

export const zipNonWorkingDates = (allDates: DateNumber[]): DateNumber[] => {
  const uniqDates = Array.from(new Set(allDates)).sort();

  const hashMap: Record<DateNumber, DateNumber[]> = {};

  for (let i = 0; i < uniqDates.length; i++) {
    const date = createDate(uniqDates[i]).getTime();

    if (date in hashMap) {
      hashMap[date].push(uniqDates[i]);
    } else {
      hashMap[date] = [uniqDates[i]];
    }
  }

  const excludedDates = Object.keys(hashMap).reduce((arr, date: string) => {
    const time = Number(date);
    const timesSlots = hashMap[time];

    if (timesSlots.length === 9) {
      arr.push(time);
    } else {
      timesSlots.forEach((item: DateNumber) => {
        arr.push(item);
      });
    }

    return arr;
  }, [] as DateNumber[]);

  return excludedDates;
};
