export { };

declare global {
    namespace Tech {
        type DateNumber = number;
        type Schedule = Array<ScheduleDate>;

        enum TypeOfNotify {
            SMS = 1,
            MESSENGER = 2
        }

        interface LabelValue<T extends any> {
            label: string
            value: T
        }

        interface ScheduleSlot {
            date: DateNumber,
            time: string,
            isFree: false
        }

        interface ScheduleDate {
            date: DateNumber,
            slots: Array<ScheduleSlot>,
        }

        interface PatientFormData {
            date: DateNumber;
            procedures: Array<Cosmo.Procedure>
            name: string;
            phone: string;
            notify: boolean
            typeOfNotify: TypeOfNotify
        }

        interface ResponseAPI<T> {
            data: T;
            success: boolean;
            message?: string;
        }

        type CollectionWithMap<T, R> = Promise<{
            data: Array<T>;
            map: Record<DateNumber, R>
        }>

        interface CalendarMonthPayload {
            notWorkingDates: Record<DateNumber, DateNumber>;
            bookedDates: Record<DateNumber, PatientFormData['procedures']>;
        }
    }

    namespace Cosmo {
        enum Procedure {
            Peeling = 1,
            Cleaning = 2,
            Bio = 3,
            Mezo = 4,
            LipPlastic = 5,
            FacePlastic = 6
        }
    }
}
