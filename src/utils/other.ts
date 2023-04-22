import { API_URL } from '@/constants';
import { AxiosResponse } from 'axios';
import moment from 'moment';
import { compile } from 'path-to-regexp';
import { objectToQueryString } from './queryString';
import { REQUEST_ROUTES } from '@/routes';

export type Nullable<T> = T | null;
export type ValueOf<T> = T[keyof T];
export const loadCallback = <T extends (...P: any[]) => any>(
  cb?: T,
  ...data: Parameters<T>
): ReturnType<T> => {
  return cb && cb(...data);
};

export const currencyFormatEnde = (number: number): string => {
  // output: 5,0000,000.0
  return new Intl.NumberFormat('en-IN').format(number);
};

export const preventCharacter = (e: any) => {
  const { ctrlKey, key } = e;
  if (/[0-9]|Arrow|Backspace|Delete|Tab|\./.test(key) || (ctrlKey && /^a|c|v|x$/.test(key))) {
    return true;
  }
  e.preventDefault();
  return true;
};

export const preventNumber = (e: any) => {
  const { key } = e;
  if (/^[0-9]|Arrow|Backspace|Delete|Tab$/.test(key)) {
    return true;
  }
  e.preventDefault();
  return true;
};

function stringToColor(string: string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

export function stringAvatar(name: string, xs = {}) {
  const arr = name.split(' ');
  return {
    sx: {
      bgcolor: stringToColor(name),
      ...xs,
    },
    children: `${arr[0][0]}${arr.length > 1 ? arr[1][0] : ''}`.toUpperCase(),
  };
}

export const parseResponseData = (response: AxiosResponse) => {
  return response.data;
};

export const FullDateFormat = (date: string, format = 'HH:mm - DD/MM/YYYY') => {
  try {
    return moment(date).format(format);
  } catch (err) {
    return 'n/a';
  }
};

// "thisistext" =>"thisIsText"
export const camalize = (str: string) => {
  return str.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase());
};

// "abc" => "Abc"

export const capitalize = (str: string) => {
  return str
    .toLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

export const dateFormat = (date?: any, hasTime?: boolean) => {
  if (!date) return moment(new Date()).format('DD/MM/YYYY');
  if (hasTime) return moment(new Date()).format('DD/MM/YYYY, HH:mm');
  return moment(date).format('DD/MM/YYYY');
};

export const removeAccents = (string: string) => {
  // remove accent
  let str = string.normalize('NFD').replace(/\p{Diacritic}/gu, '');
  // remove space
  str = str.replace(/\s/g, '');
  // to lowercase for search
  return str.toLowerCase();
};

//Axios route to
export const routeTo = (name: string, params = {}, url_params?: string) =>
  API_URL + compile(REQUEST_ROUTES[name])(url_params as any) + objectToQueryString(params);

export const routeToEndpoint = (endpoint: string, params = {}) =>
  endpoint + objectToQueryString(params);
