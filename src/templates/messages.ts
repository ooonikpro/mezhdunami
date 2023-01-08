import { ADDRESS } from '@/constants';
import { DateNumber, PatientFormData } from '@/types';
import { getNames, getLocalizedShortDate, getLocalizedFullDate } from '@/utils';

const signature = 'Косметология для своих';

export const newPatientMsg = (data: PatientFormData) => {
  const comment = data.comment ? `\nКомментарий: ${data.comment}` : '';
  // eslint-disable-next-line
  return `<b>${getLocalizedFullDate(data.date)}</b>\nИмя: <b>${data.name}</b>\nТелефон: ${data.phone}\nПроцедуры: <b>${getNames(data.procedures)}</b>${comment}`;
};

export const newRegMsg = (data: PatientFormData) => {
  const date = getLocalizedShortDate(data.date);
  const procedures = getNames(data.procedures);

  return `"${signature}". Вы записаны к косметологу, ${date}, ${procedures}. ${ADDRESS.street}, ${ADDRESS.office}`;
};

export const patientReminderMsg = (data: PatientFormData) => {
  const date = getLocalizedShortDate(data.date);
  const procedures = getNames(data.procedures);

  return `Напоминаем, что Вы записаны к косметологу, ${date}, ${procedures}`;
};

export const patientScheduleUpdatedMsg = (oldDate: DateNumber, newDate: DateNumber) => {
  const oldLocalizedDate = getLocalizedShortDate(oldDate);
  const newLocalizedDate = getLocalizedShortDate(newDate);

  return `Ваша запись к косметологу перенесена с ${oldLocalizedDate} на ${newLocalizedDate}.`;
};

export const oneTimeCodeMsg = (code: string) => `Тcс... "Между Нами". Код подтверждения: ${code}`;

export const patientScheduleRemoveMsg = (data: PatientFormData) => {
  const date = getLocalizedShortDate(data.date);
  const procedures = getNames(data.procedures);

  return `Ваша запись к косметологу (${date}, ${procedures}) отменена.`;
};
