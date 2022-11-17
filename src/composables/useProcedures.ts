import { computed } from 'vue';
import {
  getNames,
  getDuration,
  getTotalDuration,
  getTotalDurationInHours,
  getTotalDurationLocalized,
  getReservedTimeSlots,
} from '@/utils/procedures';
import { PROCEDURES } from '@/constants';

export const useProcedures = () => {
  const procedures = computed(() => PROCEDURES);

  return {
    procedures,
    getNames,
    getDuration,
    getTotalDuration,
    getTotalDurationInHours,
    getTotalDurationLocalized,
    getReservedTimeSlots,
  };
};
