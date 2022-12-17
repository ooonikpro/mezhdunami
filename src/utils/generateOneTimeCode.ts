import { ONE_TIME_CODE_LENGTH } from '@/constants';

export const generateOneTimeCode = (size = ONE_TIME_CODE_LENGTH): string => {
  let code = '';

  for (let i = 0; i < size; i++) {
    code += Math.floor(Math.random() * 10);
  }

  return code;
};
