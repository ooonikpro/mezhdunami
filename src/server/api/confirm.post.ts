import { server } from '@/server/instance';
import { PhoneNumber } from '@/types';

const hash = new Map();

const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

const generatePassword = (size = 4): string => {
  let code = '';

  for (let i = 0; i < size; i++) {
    code += digits[Math.floor(Math.random() * digits.length - 1)];
  }

  return code;
};

server.route({
  method: 'POST',
  path: '/api/confirm',
  handler: async (req: Record<string, any>) => {
    try {
      const form = JSON.parse(req.payload) as { phone: PhoneNumber, code?: string };

      if (form.code) {
        if (hash.get(form.phone) === form.code) {
          hash.delete(form.phone);
        } else {
          throw new Error('Неверный код');
        }
      } else {
        const code = generatePassword();

        hash.set(form.phone, code);

        console.log(code);

        // send sms
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
