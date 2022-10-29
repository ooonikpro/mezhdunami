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

const createDate = (date: Date | Tech.DateNumber, hour: number, minutes: number = 0): Date => {
    const newDate = new Date(date);

    newDate.setHours(hour);
    newDate.setMinutes(minutes);
    newDate.setSeconds(0);
    newDate.setMilliseconds(0);

    return newDate;
}

const getLocalizedWeekday = (date: Date | Tech.DateNumber): string => {
    return getUppercase(
        new Date(date).toLocaleString("ru", {
            weekday: "long",
        })
    );
}

const getLocalizedDate = (date: Date | Tech.DateNumber): string => {
    return new Date(date).toLocaleString('ru', { month: 'long', day: '2-digit' });
}

const getLocalizedFullDate = (date: Date | Tech.DateNumber) => {
    return getUppercase(new Date(date).toLocaleString('ru', { month: 'long', day: '2-digit', hour: '2-digit', minute: '2-digit', weekday: 'long' }));
};

const getTomorrow = (): Tech.DateNumber => {
    return createDate(new Date(year, month, day + 1), 0).getTime();
}

const getScheduleForMonth = ({ excludedDates }: Tech.ScheduleFilters): Tech.Schedule => {
    const isExcluded = (date: Tech.DateNumber) => excludedDates.includes(date);

    const dates = [];

    let futureDays = getDaysInMonth() - day;

    if (futureDays <= 7) {
        futureDays += getDaysInMonth(month + 1);
    }

    for (let i = 0; i < futureDays; i++) {
        const date = new Date(year, month, day + i + 1).getTime();

        if (!isExcluded(date)) {
            let dateIsFree = false;

            const slots = timeSlots.map((slot) => {
                const slotTime = createDate(date, slot).getTime();
                const isFree = !isExcluded(slotTime)

                dateIsFree = dateIsFree || isFree;

                return {
                    date: slotTime,
                    time: `${slot}:00`,
                    isFree
                }
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
}

export const useCalendar = () => {
    return {
        getScheduleForMonth,
        getLocalizedWeekday,
        getLocalizedDate,
        getLocalizedFullDate,
        getTomorrow,
        createDate,
    }
}
