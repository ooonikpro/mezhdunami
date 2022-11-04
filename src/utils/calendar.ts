const today = new Date();
const year = today.getFullYear();
const month = today.getMonth();
const day = today.getDate();
const timeSlots = [10, 11, 12, 13, 14, 15, 16, 17, 18];

export const getUppercase = (str: string) => str[0].toUpperCase() + str.slice(1);

export const getDaysInMonth = (mm: number = month) => new Date(year, mm, 0, 0, 0, 0, 0).getDate();

export const createDate = (date: Date | Tech.DateNumber, hour = 0, minutes = 0): Date => {
  const newDate = new Date(date);

  newDate.setHours(hour);
  newDate.setMinutes(minutes);
  newDate.setSeconds(0);
  newDate.setMilliseconds(0);

  return newDate;
};

export const getLocalizedWeekday = (date: Date | Tech.DateNumber): string => getUppercase(
  new Date(date).toLocaleString('ru', {
    weekday: 'long',
  }),
);

export const getLocalizedDate = (date: Date | Tech.DateNumber): string => new Date(date).toLocaleString('ru', { month: 'long', day: '2-digit' });

export const getLocalizedFullDate = (date: Date | Tech.DateNumber) => getUppercase(new Date(date).toLocaleString('ru', {
  month: 'long', day: '2-digit', hour: '2-digit', minute: '2-digit', weekday: 'long',
}));

export const getTomorrow = (): Tech.DateNumber => createDate(new Date(year, month, day + 1)).getTime();

export const getScheduleForMonth = ({ excludedDates }: Tech.ScheduleFilters): Tech.Schedule => {
  const isExcluded = (date: Tech.DateNumber) => excludedDates.includes(date);

  const dates = [] as Tech.Schedule;

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
        } as Tech.ScheduleTimeSlot;
      });

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
