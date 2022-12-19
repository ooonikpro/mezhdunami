import {
  Procedure, PROCEDURES, PROCEDURE_DURATION,
} from '@/constants';
import type { DateNumber } from '@/types';

const ONE_HOURS_MS = 3600000;

export const getNames = (ids: Array<Procedure>) => PROCEDURES.reduce((names, p) => {
  if (ids.includes(p.id)) {
    names.push(p.name);
  }

  return names;
}, [] as string[]).join(', ');

export const getDuration = (procedure: Procedure) => PROCEDURE_DURATION[procedure];

export const getTotalDuration = (ids: Array<Procedure>) => ids.reduce(
  (sum: number, id: Procedure) => {
    if (ids.length > 1 && id === Procedure.Consultation) {
      return sum;
    }

    return sum + getDuration(id);
  },
  0,
);

export const getTotalDurationInHours = (ids: Array<Procedure>) => Math.ceil(getTotalDuration(ids) / ONE_HOURS_MS);

export const getTotalDurationLocalized = (ids: Array<Procedure>) => {
  let label = 'час';
  const hours = getTotalDurationInHours(ids);

  if (hours > 1 && hours < 5) {
    label += 'а';
  }

  if (hours >= 5) {
    label += 'ов';
  }

  return `${hours} ${label}`;
};

export const getReservedTimeSlots = (dateStart: DateNumber, procedures: Procedure[]) => {
  const reserved = [dateStart];

  const totalHours = getTotalDurationInHours(procedures);

  if (totalHours > 1) {
    for (let i = 1; i < totalHours; i++) {
      reserved.push(dateStart + i * ONE_HOURS_MS);
    }
  }

  return reserved;
};
