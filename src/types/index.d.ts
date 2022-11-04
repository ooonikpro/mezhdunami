import { NOTIFICATION_TYPE } from '@/constants';
export { };

declare global {
    interface HTMLDateInputElement extends HTMLInputElement {
        showPicker: () => void
    }

    type DateNumber = number;

        enum TypeOfNotify {
            SMS = 1,
            MESSENGER = 2
        }

        interface LabelValue<T> {
            label: string
            value: T
        }

        interface ScheduleTimeSlot {
            date: DateNumber,
            time: string,
            isFree: false
        }

        interface ScheduleDate {
            date: DateNumber,
            slots: Array<ScheduleTimeSlot>,
        }

        interface PatientFormData {
            date: DateNumber;
            procedures: Array<Procedure>
            name: string;
            phone: string;
            notify: boolean
            typeOfNotify: NOTIFICATION_TYPE
        }

        interface ResponseAPI<T> {
            data: T;
            success: boolean;
            message?: string;
        }

        type CollectionLikeMap<T> = Record<DateNumber, T>
        type NotWorkingDates = Array<DateNumber>
        type BookedDates = Array<DateNumber>
        type Schedule = Array<ScheduleDate>

        interface ScheduleFilters {
            excludedDates: NotWorkingDates & BookedDates
        }

    enum Procedure {
            Peeling = 1,
            Cleaning = 2,
            Bio = 3,
            Mezo = 4,
            LipPlastic = 5,
            FacePlastic = 6
        }
}
