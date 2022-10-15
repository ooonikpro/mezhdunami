const getUppercase = (str: string) => str[0].toUpperCase() + str.slice(1);

export const useCalendar = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate();

    const getDaysInMonth = (mm: number = month) => new Date(year, mm, 0, 0, 0, 0, 0).getDate();

    const getCalendarMonth = (): Array<Date> => {
        let futureDays = getDaysInMonth() - day;

        if (futureDays <= 7) {
            futureDays += getDaysInMonth(month + 1);
        }

        return new Array(futureDays)
            .fill(today)
            .map((date: Date, offset: number) => new Date(date.setDate(day + offset + 1)));
    };

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

    const createDate = (date: Date, hour: number, minutes: number = 0): Date => {
        const newDate = new Date(date);

        newDate.setHours(hour);
        newDate.setMinutes(minutes);
        newDate.setSeconds(0);
        newDate.setMilliseconds(0);

        return newDate;
    }


    return {
        getCalendarMonth,
        getLocalizedWeekday,
        getLocalizedDate,
        getLocalizedFullDate,
        createDate,
    }
}
