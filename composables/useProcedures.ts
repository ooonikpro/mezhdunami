import { PROCEDURE_PRICE } from './../constants/index';
import { PROCEDURE, PROCEDURE_DURATION } from '@/constants';

export const useProcedures = () => {
    const procedures = computed<Cosmo.ProcedureEl[]>(() => [
        {
            id: PROCEDURE.Peeling,
            name: 'Пиллинг',
            footnote: 'GIGI или Renew System',
            duration: '~ 1 час',
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
            duration: '~ 2 часа',
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
            price: '3 000'
        },
        {
            id: PROCEDURE.Bio,
            name: 'Биоревитализация',
            footnote: '',
            duration: '~ 1 час',
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
            duration: '~ 1 час',
            description: [
                'Индивидуальный состав',
                'Анестезия и поспроцедурный уход включен в стоимость',
            ],
            price: '2 500'
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

    const getNames = (ids: Array<Cosmo.Procedure>) => {
        return procedures.value
            .filter((item) => ids.includes(item.id))
            .map((item) => item.name)
            .join(", ")
    };

    const getTotalDuration = (ids: Array<Cosmo.Procedure>) => {
        return ids.reduce(
            (sum: number, id: Cosmo.Procedure) => sum + PROCEDURE_DURATION[id],
            0
        );
    };

    const getTotalDurationLocalized = (ids: Array<Cosmo.Procedure>) => {
        let label = 'час';
        const hours = Math.ceil(getTotalDuration(ids) / 3600000);

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

    return {
        procedures,
        getNames,
        getTotalDuration,
        getTotalDurationLocalized,
        getTotalPrice
    }
}
