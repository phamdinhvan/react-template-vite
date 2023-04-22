const TOKEN_KEY = '';

export const setToken = (data: any) => {
  localStorage.setItem(TOKEN_KEY, JSON.stringify(data));
};
export const getToken = <T = any>() => {
  let token = localStorage.getItem(TOKEN_KEY);
  if (token) {
    token = JSON.parse(token);
  }

  return token as T | null;
};

export const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};
