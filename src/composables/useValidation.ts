export const useValidation = () => {
  const isValidName = (name: string) => /^[а-яА-ЯёЁ-]{3,}/.test(name);
  const isValidPhone = (phone: string) => /^(\+?79\d{9}|\+7\s9\d{2}\s\d{3}\s\d{2}\s\d{2})/.test(phone);
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
        }, '+x xxx xxx xx xx')
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
