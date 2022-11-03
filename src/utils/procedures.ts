import { PROCEDURE, PROCEDURES, PROCEDURE_DURATION, PROCEDURE_PRICE } from "@/constants";

const ONE_HOURS_MS = 3600000;

export const getNames = (ids: Array<PROCEDURE | Cosmo.Procedure>) => {
    return PROCEDURES.reduce((names, p) => {
        if (ids.includes(p.id)) {
            names.push(p.name);
        }

        return names;
    }, [] as string[]).join(',');
};

export const getDuration = (procedure: Cosmo.Procedure) => PROCEDURE_DURATION[procedure];

export const getTotalDuration = (ids: Array<Cosmo.Procedure>) => {
    return ids.reduce(
        (sum: number, id: Cosmo.Procedure) => sum + getDuration(id),
        0
    );
};

export const getTotalDurationInHours = (ids: Array<Cosmo.Procedure>) => Math.ceil(getTotalDuration(ids) / ONE_HOURS_MS);

export const getTotalDurationLocalized = (ids: Array<Cosmo.Procedure>) => {
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

export const getTotalPrice = (ids: Array<Cosmo.Procedure>) => {
    return ids.reduce((sum, id) => sum + PROCEDURE_PRICE[id], 0);
}

export const getReservedTimeSlots = (dateStart: Tech.DateNumber, procedures: Cosmo.Procedure[]) => {
    const reserved = [dateStart];

    const totalHours = getTotalDurationInHours(procedures);

    if (totalHours > 1) {
        for (let i = 1; i < totalHours; i++) {
            reserved.push(dateStart + i * ONE_HOURS_MS);
        }
    }

    return reserved;
}
