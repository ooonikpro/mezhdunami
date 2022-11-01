import {
    getScheduleForMonth,
    getLocalizedWeekday,
    getLocalizedDate,
    getLocalizedFullDate,
    getTomorrow,
    createDate
} from '@/utils/calendar';

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
