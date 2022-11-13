export const useValidation = () => {
  const isValidName = (name: string) => name.length >= 2;
  const isValidPhone = (phone: string) => /^\+7\d{10}/.test(phone.replace(/\s/g, ''));
  const toPhoneNumber = (str: string) => {
    const numbers = str.replace(/\D/g, '').split('');

    if (numbers.length > 0) {
      return numbers
        .reduce((p, n, i, arr) => {
          let res = p.replace('x', n);

          if (i === arr.length - 1) {
            res = res.replaceAll('x', '');
          }

          return res;
        }, '+xxxxxxxxxxx')
        .trim();
    }

    return numbers.join('').trim();
  };

  return {
    isValidName,
    isValidPhone,

    toPhoneNumber,
  };
};
