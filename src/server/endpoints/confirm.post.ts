import { BASE_API_URL, API_URL } from '@/constants/urls';
import { server } from '@/server/instance';
import { PhoneNumber } from '@/types';
import { sendOneTimeCode } from '@/server/services';
import { debounce } from '@/utils';
import { IS_PROD } from '@/constants/env';

const oneTimeCodes = new Map();

const tryRemove = debounce((phone: PhoneNumber) => {
  const note = oneTimeCodes.get(phone);

  if (note && note.until <= Date.now()) {
    oneTimeCodes.delete(phone);
  }
}, 60000); // 1 мин

const generateOneTimeCode = (size = 4): string => {
  let code = '';

  for (let i = 0; i < size; i++) {
    code += Math.floor(Math.random() * 10);
  }

  return code;
};

server.route({
  method: 'POST',
  path: BASE_API_URL(API_URL.CONFIRM),
  handler: async (req: Record<string, any>) => {
    try {
      const form = req.payload as { phone: PhoneNumber, code?: string };

      if (form.code) {
        if (oneTimeCodes.get(form.phone)?.code === form.code) {
          oneTimeCodes.delete(form.phone);
        } else {
          throw new Error('Неверный код');
        }
      } else if (form.phone) {
        const code = generateOneTimeCode();

        oneTimeCodes.set(form.phone, {
          code,
          until: Date.now() + 60000,
        });

        tryRemove(form.phone);

        if (IS_PROD) {
          sendOneTimeCode(form.phone, code);
        } else {
          console.log(code);
        }
      }

      return {
        data: true,
        success: true,
        message: null,
      };
    } catch (e) {
      console.error(e);

      return {
        data: null,
        success: false,
        message: (e! as Error).message,
      };
    }
  },
});
