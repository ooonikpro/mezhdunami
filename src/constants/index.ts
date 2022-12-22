export * from './procedure';

export const ANIMATION_DURATION = 300;

export const ONE_TIME_CODE_LENGTH = 4;

export const ADDRESS = {
  city: 'Калининград',
  street: 'Литовский вал 62',
  office: '(вход справа от фьюжн), 2 этаж, офис 22.',
};

export enum STORE_KEY {
  name = 'user.name',
  phone = 'user.phone',
  isConfirmed = 'user.isConfirmed'
}

export enum COOKIE_KEY {
  token = 'tkn'
}
