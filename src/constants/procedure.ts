// eslint-disable-next-line
export const enum Procedure {
  Peeling = 1,
  Cleaning = 2,
  Bio = 3,
  Mezo = 4,
  LipPlastic = 5,
  FacePlastic = 6,
  Botulinum = 7,
  RemoveLip = 8,
  MezoFractional = 9,
  Consultation = 10,
}

export const PROCEDURE_DURATION: { [key in Procedure]: number } = {
  [Procedure.Peeling]: 36e5, // 1 hours
  [Procedure.Cleaning]: 72e5, // 2 hours
  [Procedure.Bio]: 36e5,
  [Procedure.Mezo]: 36e5,
  [Procedure.LipPlastic]: 36e5,
  [Procedure.FacePlastic]: 36e5,
  [Procedure.Botulinum]: 36e5,
  [Procedure.RemoveLip]: 36e5,
  [Procedure.MezoFractional]: 36e5,
  [Procedure.Consultation]: 36e5,
};

export const PROCEDURES = [
  {
    id: Procedure.Cleaning,
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
    id: Procedure.Peeling,
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
            price: '1 700',
          },
          {
            label: 'Jess Peel',
            footnotes: 'Пилинг Джесснера',
            price: '2 500',
          },
          {
            label: 'RetiSet Duo',
            footnotes: 'Желтый пилинг',
            price: '3 000',
          },
        ],
      },
    ],
    price: 1700,
  },
  {
    id: Procedure.Botulinum,
    name: 'Ботулинотерапия',
    duration: 'до 30 мин',
    data: [
      {
        data: [
          {
            label: 'Релатокс 1 Ед',
            price: '250',
          },
        ],
      },
    ],
    price: 8000,
  },
  {
    id: Procedure.LipPlastic,
    name: 'Контурная пластика губ',
    duration: '~ 45 минут',
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
    id: Procedure.RemoveLip,
    name: 'Удаление филлера',
    duration: '~ 30 минут',
    data: [{
      data: [
        {
          label: 'Лонгидаза',
          price: '4 000',
        },
      ],
    }],
    price: 4000,
  },
  {
    id: Procedure.Bio,
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
    id: Procedure.Mezo,
    name: 'Мезотерапия',
    duration: '~ 1 час',
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
    id: Procedure.MezoFractional,
    name: 'Фракционная мезотерапия',
    duration: '~ 1 час',
    footnotes: '',
    data: [
      {
        data: [
          {
            label: 'Микронидлинг',
            price: '4 000',
          },
        ],
      },
    ],
    price: 4000,
  },
  {
    id: Procedure.FacePlastic,
    name: 'Контурная пластика лица',
    footnotes: '',
    duration: '~ 45 минут',
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
  {
    id: Procedure.Consultation,
    name: 'Консультация',
    footnotes: 'Определение типа и состояния кожи, разбор домашнего ухода, план процедур',
    duration: '~ 30 минут',
    data: [
      {
        data: [
          {
            label: 'Консультация',
            price: '500',
          },
        ],
      },
    ],
    price: 500,
  },
];
