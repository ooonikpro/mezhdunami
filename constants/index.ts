export enum PROCEDURE {
    Peeling = 1,
    Cleaning = 2,
    Bio = 3,
    Mezo = 4,
    LipPlastic = 5,
    FacePlastic = 6
}

export const PROCEDURE_DURATION: Record<Cosmo.Procedure, number> = {
    [PROCEDURE.Peeling]: 3600000,   // 1 hours
    [PROCEDURE.Cleaning]: 7200000, // 2 hours
    [PROCEDURE.Bio]: 3600000,
    [PROCEDURE.Mezo]: 3600000,
    [PROCEDURE.LipPlastic]: 3600000,
    [PROCEDURE.FacePlastic]: 3600000
}

export const PROCEDURE_PRICE: Record<Cosmo.Procedure, number> = {
    [PROCEDURE.Peeling]: 1500,
    [PROCEDURE.Cleaning]: 3000,
    [PROCEDURE.Bio]: 3500,
    [PROCEDURE.Mezo]: 2500,
    [PROCEDURE.LipPlastic]: 7000,
    [PROCEDURE.FacePlastic]: 10000
}
