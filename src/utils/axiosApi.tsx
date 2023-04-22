import axios from 'axios';
import { getToken, removeToken, routeTo, setToken } from '@/utils';
import { ROUTE_NAME } from '@/routes';

const axiosInstance = axios.create({
  baseURL: '',
  timeout: 30000,
  headers: {
    Authorization: 'Bearer ' + getToken()?.access_token,
    'Content-Type': 'application/json',
    accept: 'application/json',
  },
});

let isRefreshing = false;
let failedQueue: any = [];

const processQueue = (error: any, token = null) => {
  failedQueue.forEach((prom: any) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

axiosInstance.interceptors.request.use(
  function (config) {
    const access = getToken()?.access_token;
    if (!access) {
      //store.dispatch(userSignOut())
    }

    config.headers['Authorization'] = 'Bearer ' + access;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    const originalRequest = error.config;
    const refreshToken = getToken()?.refresh_token;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      refreshToken &&
      !error.config.url.includes(routeTo(ROUTE_NAME.AUTH.REFRESH_TOKEN))
    ) {
      if (isRefreshing) {
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            console.log(token);
            originalRequest.headers['Authorization'] = 'Bearer ' + token;
            return axiosInstance(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      return new Promise(function (resolve, reject) {
        axios
          .post(routeTo(ROUTE_NAME.AUTH.REFRESH_TOKEN), {
            refresh_token: refreshToken,
          })
          .then(({ data }) => {
            setToken(data.data);
            axiosInstance.defaults.headers.common['Authorization'] = 'Bearer ' + data.token;
            originalRequest.headers['Authorization'] = 'Bearer ' + data.token;
            processQueue(null, data.token);
            resolve(axiosInstance(originalRequest));
          })
          .catch((err) => {
            processQueue(err, null);
            if (err.response?.status >= 400) {
              removeToken();
            }
            reject(err);
          })
          .finally(() => {
            isRefreshing = false;
          });
      });
    } else if (error.response?.status === 403) {
      //history.push('/page/error-403')
    }

    return Promise.reject(error);
  },
);
export default axiosInstance;
