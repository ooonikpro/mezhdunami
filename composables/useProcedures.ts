import { PROCEDURE_PRICE, PROCEDURE, PROCEDURE_DURATION } from '@/constants';
import { computed } from 'vue';

export const useProcedures = () => {
    const { data, pending } = useFetch('/api/procedures');

    const procedures = computed(() => data.value?.data || []);

    const getNames = (ids: Array<Cosmo.Procedure>) => {
        return procedures.value
            .filter((item) => ids.includes(item.id))
            .map((item) => item.name)
            .join(", ")
    };

    const getDuration = (procedure: Cosmo.Procedure) => PROCEDURE_DURATION[procedure];

    const getTotalDuration = (ids: Array<Cosmo.Procedure>) => {
        return ids.reduce(
            (sum: number, id: Cosmo.Procedure) => sum + getDuration(id),
            0
        );
    };

    const getTotalDurationInHours = (ids: Array<Cosmo.Procedure>) => Math.ceil(getTotalDuration(ids) / 3600000);

    const getTotalDurationLocalized = (ids: Array<Cosmo.Procedure>) => {
        let label = 'час';
        const hours = getTotalDurationInHours(ids);

        if (hours > 1 && hours < 5) {
            label += 'а';
        }

        if (hours >= 5) {
            label += 'ов'
        }

        return `${hours} ${label}`;
    }

    const getTotalPrice = (ids: Array<Cosmo.Procedure>) => {
        return ids.reduce((sum, id) => sum + PROCEDURE_PRICE[id], 0);
    }

    const getReservedTimeSlots = (dateStart: Tech.DateNumber, procedures: Cosmo.Procedure[]) => {
        const reserved = [dateStart];

        const totalHours = getTotalDurationInHours(procedures);

        if (totalHours > 1) {
            for (let i = 1; i < totalHours; i++) {
                reserved.push(dateStart + i * 3600000);
            }
        }

        return reserved;
    }


    return {
        procedures,
        getNames,
        getDuration,
        getTotalDuration,
        getTotalDurationInHours,
        getTotalDurationLocalized,
        getTotalPrice,
        getReservedTimeSlots
    }
}
