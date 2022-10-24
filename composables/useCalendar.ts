import { reactive } from 'vue';

const calendar = reactive([]);

const today = new Date();
const year = today.getFullYear();
const month = today.getMonth();
const day = today.getDate();
const timeSlots = [10, 11, 12, 13, 14, 15, 16, 17, 18];

const getUppercase = (str: string) => {
    return str[0].toUpperCase() + str.slice(1);
}

const getDaysInMonth = (mm: number = month) => {
    return new Date(year, mm, 0, 0, 0, 0, 0).getDate();
}

const createDate = (date: Date, hour: number, minutes: number = 0): Date => {
    const newDate = new Date(date);

    newDate.setHours(hour);
    newDate.setMinutes(minutes);
    newDate.setSeconds(0);
    newDate.setMilliseconds(0);

    return newDate;
}

const getCalendarMonth = (): Array<Date> => calendar;

const getLocalizedWeekday = (date: Date): string => {
    return getUppercase(
        date.toLocaleString("ru", {
            weekday: "long",
        })
    );
}

const getLocalizedDate = (date: Date): string => {
    return date.toLocaleString('ru', { month: 'long', day: '2-digit' });
}

const getLocalizedFullDate = (date: Date) => {
    return getUppercase(date.toLocaleString('ru', { month: 'long', day: '2-digit', hour: '2-digit', minute: '2-digit', weekday: 'long' }));
};

const getTomorrow = () => {
    return createDate(new Date(year, month, day + 1), 0);
}

const init = async () => {
    let futureDays = getDaysInMonth() - day;

    if (futureDays <= 7) {
        futureDays += getDaysInMonth(month + 1);
    }

    for (let i = 0; i < futureDays; i++) {
        const localDate = new Date(year, month, day + i + 1);

        calendar.push({
            date: localDate,
            slots: timeSlots.map((slot) => ({
                date: createDate(localDate, slot),
                time: `${slot}:00`,
                isFree: false
            })),
        });
    }
}

export const useCalendar = () => {
    return {
        init,
        getCalendarMonth,
        getLocalizedWeekday,
        getLocalizedDate,
        getLocalizedFullDate,
        getTomorrow,
        createDate,
    }
}
