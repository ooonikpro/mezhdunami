import { PatientFormData } from '@/types';
import { getNames, getLocalizedShortDate, getLocalizedFullDate } from '@/utils';

const signature = 'Между нами.';

export const newPatientMsg = (data: PatientFormData) => {
  const comment = data.comment ? `\nКомментарий: ${data.comment}` : '';
  // eslint-disable-next-line
  return `<b>${getLocalizedFullDate(data.date)}</b>\nИмя: <b>${data.name}</b>\nТелефон: ${data.phone}\nПроцедуры: <b>${getNames(data.procedures)}</b>${comment}`;
};

export const newRegMsg = (data: PatientFormData) => {
  const date = getLocalizedShortDate(data.date);
  const procedures = getNames(data.procedures);

  return `${signature} Вы записаны к косметологу, ${date}, ${procedures}`;
};

export const patientReminderMsg = (data: PatientFormData) => {
  const date = getLocalizedShortDate(data.date);
  const procedures = getNames(data.procedures);

  return `${signature} Напоминаем вы записаны к косметологу, ${date}, ${procedures}`;
};

export const patientScheduleUpdatedMsg = (data: PatientFormData) => {
  const date = getLocalizedShortDate(data.date);

  return `${signature} Ваша запись к косметологу перенесена на ${date}.`;
};

export const oneTimeCodeMsg = (code: string) => `Тсс... ${signature} Код подтверждения: ${code}`;

export const patientScheduleRemoveMsg = () => `${signature} Ваша запись к косметологу отменена.`;
