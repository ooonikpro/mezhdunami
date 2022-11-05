import { NOTIFICATION_TYPE } from '@/constants';
export { };

declare global {
    export interface HTMLDateInputElement extends HTMLInputElement {
        showPicker: () => void
    }

    export type DateNumber = number;

    export enum TypeOfNotify {
        SMS = 1,
        MESSENGER = 2
    }

    export interface LabelValue<T> {
        label: string
        value: T
    }

    export interface ScheduleTimeSlot {
        date: DateNumber,
        time: string,
        isFree: false
    }

    export interface ScheduleDate {
        date: DateNumber,
        slots: Array<ScheduleTimeSlot>,
    }

    export interface PatientFormData {
        date: DateNumber;
        procedures: Array<Procedure>
        name: string;
        phone: string;
        notify: boolean
        typeOfNotify: NOTIFICATION_TYPE
    }

    export interface ResponseAPI<T> {
        data: T;
        success: boolean;
        message?: string;
    }

    export type CollectionLikeMap<T> = Record<DateNumber, T>
    export type NotWorkingDates = Array<DateNumber>
    export type BookedDates = Array<DateNumber>
    export type Schedule = Array<ScheduleDate>

    export interface ScheduleFilters {
        excludedDates: NotWorkingDates & BookedDates
    }

    export enum Procedure {
        Peeling = 1,
        Cleaning = 2,
        Bio = 3,
        Mezo = 4,
        LipPlastic = 5,
        FacePlastic = 6
    }
}
