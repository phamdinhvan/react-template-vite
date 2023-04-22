export const ROUTE_NAME = {
  //example
  AUTH: {
    REFRESH_TOKEN: 'auth.refresh.token',
    AUTH_TOKEN: 'auth.login.token',
  },
};

export const REQUEST_ROUTES = {
  //example
  [ROUTE_NAME.AUTH.AUTH_TOKEN]: '/oauth/token',
  [ROUTE_NAME.AUTH.REFRESH_TOKEN]: '/oauth/refresh',
};
