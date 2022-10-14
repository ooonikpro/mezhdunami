export const PROCEDURE: Record<keyof typeof Cosmo.Procedure, Cosmo.Procedure> = {
    Peeling: 1,
    Cleaning: 2,
    Bio: 3,
    Mezo: 4,
    LipPlastic: 5,
    FacePlastic: 6
}

export const useConst = () => {PROCEDURE};
