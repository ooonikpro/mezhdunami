import type { ObjectId } from 'mongodb';

export interface HTMLDateInputElement extends HTMLInputElement {
    showPicker: () => void
}

export type PhoneNumber = string;
export type TelegramChatId = string;

export enum Procedure {
    Peeling = 1,
    Cleaning = 2,
    Bio = 3,
    Mezo = 4,
    LipPlastic = 5,
    FacePlastic = 6,
    Botulinum = 7,
}

export type DateNumber = number;

export interface TimePeriod {
    from?: DateNumber
    until?: DateNumber
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

// eslint-disable-next-line
export enum NotificationType {
    SMS = 1,
    WhatsApp = 2,
    Viber = 3,
    Telegram = 4,
}

export interface NotificationPayload {
    to: PhoneNumber | TelegramChatId,
    method: NotificationType
    message: string
}

export interface Patient {
    _id: string;
    name: string;
    phone: PhoneNumber;
}

export interface PatientFormData extends Pick<Patient, 'name' | 'phone'> {
    _id?: string;
    date: DateNumber;
    procedures: Array<Procedure>
    notify: boolean
    notificationType: NotificationType
    comment?: string
}

export interface ReminderPayload {
    scheduleId: ObjectId
    deliveryDate: DateNumber
    notificationPayload: NotificationPayload
}

export interface Reminder extends ReminderPayload {
    _id: string
}

export type ScheduleItem = Pick<PatientFormData, 'date' | 'procedures'>;

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

export interface Period {
    from?: DateNumber
    until?: DateNumber
}
