export { };

declare global {
    namespace Tech {
        interface LabelValue<T extends any> {
            label: string
            value: T
        }
    }

    namespace Cosmo {
        enum Procedure {
            Peeling = 1,
            Cleaning = 2,
            Bio = 3,
            Mezo = 4,
            LipPlastic = 5,
            FacePlastic = 6
        }

        interface ProcedureEl {
            id?: Procedure
            name: string
            footnote: string
            price: string
            description: string[]
            duration: string
        }
    }
}
