export const setCookie = (key: string, value: string) => {
  document.cookie = `${key}=${value}; expires=${new Date(Date.now() + 6048e5)};`;
};

export const getCookie = (key: string) => {
  const entries = document.cookie.split('; ');

  for (let i = 0; i < entries.length; i++) {
    const [_key, value] = entries[i].split('=');

    if (_key === key) {
      return value;
    }
  }

  return null;
};
