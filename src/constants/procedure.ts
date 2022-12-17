// eslint-disable-next-line
export const enum PROCEDURE {
  Peeling = 1,
  Cleaning = 2,
  Bio = 3,
  Mezo = 4,
  LipPlastic = 5,
  FacePlastic = 6,
  Botulinum = 7,
  RemoveLip = 8,
  MezoFractional = 9,
}

export const PROCEDURE_DURATION: { [key in PROCEDURE]: number } = {
  [PROCEDURE.Peeling]: 36e5, // 1 hours
  [PROCEDURE.Cleaning]: 72e5, // 2 hours
  [PROCEDURE.Bio]: 36e5,
  [PROCEDURE.Mezo]: 36e5,
  [PROCEDURE.LipPlastic]: 36e5,
  [PROCEDURE.FacePlastic]: 36e5,
  [PROCEDURE.Botulinum]: 36e5,
  [PROCEDURE.RemoveLip]: 36e5,
  [PROCEDURE.MezoFractional]: 36e5,
};

export const PROCEDURES = [
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
    id: PROCEDURE.Botulinum,
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
    id: PROCEDURE.LipPlastic,
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
    id: PROCEDURE.RemoveLip,
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
    id: PROCEDURE.MezoFractional,
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
    id: PROCEDURE.FacePlastic,
    name: 'Контурная пластика лица',
    footnote: '',
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
];
