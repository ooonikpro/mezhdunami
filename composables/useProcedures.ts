import { PROCEDURE } from '@/constants';

export const useProcedures = () => {
    const procedures = computed<Cosmo.ProcedureEl[]>(() => [
        {
            id: PROCEDURE.Peeling,
            name: 'Пиллинг',
            footnote: 'GIGI или Renew System',
            duration: 'от 1 часа',
            description: [
                'Мультипиллинг Acnon',
                'Молочный Nutri-Peptide',
                'Миндальный Ester C',
                'Срединный отбеливающий',
                'Срединный Акнепил',
                'Срединный Дермапил',
                'и другие…'
            ],
            price: '1 500 — 3 000'
        },
        {
            id: PROCEDURE.Cleaning,
            name: 'Чистка',
            footnote: 'Лицо, спина',
            duration: 'от 2 часов',
            description: [
                'Демакияж',
                'Глубокое очищение',
                'Мультипиллинг',
                'Холодной гидрирование',
                'Ультразвуковая чистка',
                'Механическая чистка',
                'Стягивающая маска',
                'Крем по типу кожи',
                'Крем с SPF защитой',
            ],
            price: '3 000 — 3 500'
        },
        {
            id: PROCEDURE.Bio,
            name: 'Биоревитализация',
            footnote: '',
            duration: 'от 2 часов',
            description: [
                'Revi Style , Strong, Silk, Eye',
                'Hyalual',
                'Belotero Hydro',
                'Amalain',
                'Meso-Xanthin',
                'Novacutan S-Bio, Y-Bio',
            ],
            price: '3 500 — 14 000'
        },
        {
            id: PROCEDURE.Mezo,
            name: 'Мезотерапия',
            footnote: 'Лицо, голова, липолитики',
            duration: 'от 2 часов',
            description: [
                'Индивидуальный состав',
                'Анестезия и поспроцедурный уход включен в стоимость',
            ],
            price: '2 000 — 2 500'
        },
        {
            id: PROCEDURE.LipPlastic,
            name: 'Контурная пластика губ',
            footnote: '',
            duration: 'от 15 минут',
            description: [
                'Neuramis Deep',
                'Stylage M',
                'Amalain',
                'Esteline',
                'Анестезия включена в стоимость',
            ],
            price: '7 000 — 10 000'
        },
        {
            id: PROCEDURE.FacePlastic,
            name: 'Контурная пластика лица',
            footnote: 'Скулы, углы нижнейчелюсти, подбородок',
            duration: 'от 15 минут',
            description: [],
            price: 'от 10 000'
        },
    ]);


    return {
        procedures
    }
}
