export const ANIMATION_DURATION = 300;

// eslint-disable-next-line
export enum PROCEDURE {
  Peeling = 1,
  Cleaning = 2,
  Bio = 3,
  Mezo = 4,
  LipPlastic = 5,
  FacePlastic = 6
}

export const PROCEDURE_DURATION: Record<Procedure, number> = {
  [PROCEDURE.Peeling]: 3600000, // 1 hours
  [PROCEDURE.Cleaning]: 7200000, // 2 hours
  [PROCEDURE.Bio]: 3600000,
  [PROCEDURE.Mezo]: 3600000,
  [PROCEDURE.LipPlastic]: 3600000,
  [PROCEDURE.FacePlastic]: 3600000,
};

export const PROCEDURE_PRICE: Record<Procedure, number> = {
  [PROCEDURE.Peeling]: 1500,
  [PROCEDURE.Cleaning]: 3000,
  [PROCEDURE.Bio]: 3500,
  [PROCEDURE.Mezo]: 2500,
  [PROCEDURE.LipPlastic]: 7000,
  [PROCEDURE.FacePlastic]: 10000,
};

export const PROCEDURES = [
  {
    id: PROCEDURE.Peeling,
    name: 'Пиллинг',
    duration: '~ 1 час',
    data: [
      {
        name: 'GIGI',
        data: [
          {
            label: 'Мультипилинг Acnon',
            price: '1 700',
          },
          {
            label: 'Молочный Nutri-Peptide',
            price: '2 000',
          },
          {
            label: 'Миндальный Ester C',
            price: '2 500',
          },
          {
            label: 'Мультикислотный Retin A A.L.U.S Peeling',
            price: '2 500',
          },
          {
            label: 'Срединный отбеливающий',
            price: '3 000',
          },
          {
            label: 'Срединный Акнепил',
            price: '3 000',
          },
          {
            label: 'Срединный Дермапил',
            price: '3 000',
          },
        ],
      },
      {
        name: 'Renew System',
        data: [
          {
            label: 'Salicylic Peel',
            footnotes: 'Салициловый, анти-акне',
            price: '1 500',
          },
          {
            label: 'M-Peel',
            footnotes: 'Миндальный, для жирной кожи',
            price: '1 500',
          },
          {
            label: 'L-Peel',
            footnotes: 'Молочная кислота, увлажнение',
            price: '1 600',
          },
          {
            label: 'Pyruvic Peel',
            footnotes: 'Пировиноградный, увлажнение и обновление',
            price: '1 600',
          },
          {
            label: 'Age-stop Peel',
            footnotes: 'Антивозрастной',
            price: '1 600',
          },
          {
            label: 'Jess Peel',
            footnotes: 'Пилинг Джесснера',
            price: '1 700',
          },
        ],
      },
    ],
    price: 1500,
  },
  {
    id: PROCEDURE.Cleaning,
    name: 'Чистка комбинированная',
    duration: '~ 2 часа',
    data: [
      {
        data: [
          {
            label: 'Лицо',
            price: '3 000',
          },
          {
            label: 'Спина',
            price: '4 000',
          },
        ],
      },
    ],
    price: 3000,
  },
  {
    id: PROCEDURE.Bio,
    name: 'Биоревитализация',
    duration: '~ 1 час',
    data: [
      {
        name: 'REVI',
        data: [
          {
            label: 'Silk 1мл / 2мл',
            price: '9 000 / 11 000',
          },
          {
            label: 'Strong 1мл / 2мл',
            price: '10 500 / 12 000',
          },
          {
            label: 'Eye 1мл',
            price: '8 000',
          },
        ],
      },
      {
        name: 'HYALUAL',
        data: [
          {
            label: '1мл / 2мл',
            price: '10 000 / 12 000',
          },
        ],
      },
      {
        name: 'Bellarti',
        data: [
          {
            label: 'Hydrate 1мл / 2мл',
            price: '8 000 / 10 000',
          },
          {
            label: 'Lift 1мл / 2мл',
            price: '8 000 / 10 000',
          },
        ],
      },
      {
        name: 'Belotero',
        data: [
          {
            label: 'Hydro 1мл',
            price: '8 000',
          },
        ],
      },
    ],
    price: 8000,
  },
  {
    id: PROCEDURE.Mezo,
    name: 'Мезотерапия',
    duration: 'от 15 минут',
    footnotes:
      'Индивидуальный коктейль, анестезия и постпроцедурный уход включены в стоимость.',
    data: [
      {
        data: [
          {
            label: 'Лицо',
            price: '2 000',
          },
          {
            label: 'Голова',
            footnotes: 'Волосистая часть головы',
            price: '2 000 / 2 500',
          },
          {
            label: 'Липолитики',
            price: 'от 1 500',
          },
        ],
      },
    ],
    price: 1500,
  },
  {
    id: PROCEDURE.LipPlastic,
    name: 'Контурная пластика губ',
    duration: 'от 15 минут',
    footnotes: 'Анестезия включена в стоимость.',
    data: [
      {
        data: [
          {
            label: 'Belotero Lips 0.6мл',
            footnotes: 'Германия',
            price: '9 000',
          },
          {
            label: 'Neuramis Deep 1мл',
            footnotes: 'Южная Корея',
            price: '10 000',
          },
          {
            label: 'Stylage M 1мл',
            footnotes: 'Франция',
            price: '13 000',
          },

          {
            label: 'Juvederm Ultra 3 1мл',
            footnotes: 'США',
            price: '13 000',
          },
          {
            label: 'Juvederm Volift 1мл',
            footnotes: 'США',
            price: '14 000',
          },
        ],
      },
    ],
    price: 9000,
  },
  {
    id: PROCEDURE.FacePlastic,
    name: 'Контурная пластика лица',
    footnote: '',
    duration: 'от 15 минут',
    data: [
      {
        data: [
          {
            label: 'Скулы, углы нижней челюсти, подбородок',
            price: 'от 10 000',
          },
        ],
      },
    ],
    price: 10000,
  },
];

// eslint-disable-next-line
export enum NOTIFICATION_TYPE {
  SMS = 1,
  WhatsApp = 2,
  Viber = 3,
}
