export { };

declare global {
    namespace Tech {
        enum TypeOfNotify {
            SMS = 1,
            MESSENGER = 2
        }

        interface LabelValue<T extends any> {
            label: string
            value: T
        }

        interface PatientFormData {
            name: string;
            phone: string;
            date: number;
            procedures: Array<Cosmo.Procedure>
            notify: boolean
            typeOfNotify: TypeOfNotify
        }

        interface ResponseAPI<T> {
            data: T;
            success: boolean;
            message?: string;
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
    }
}
