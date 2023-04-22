import { useLocation } from 'react-router-dom';
import URLSearchParams from 'url-search-params';
import qs from 'qs';

const removeQuestionMark = (str: string) => {
  while (true) {
    if (str.charAt(0) !== '?') {
      break;
    }
    str = str.slice(1);
  }
  return str;
};

export const objectToQueryString = (parameter: any) => {
  const str = [];
  for (const p in parameter) {
    if (parameter.hasOwnProperty(p)) {
      const value = parameter[p];
      const encodedKey = encodeURIComponent(p);
      const encodedValue = encodeURIComponent(value);
      const queryString = Array.isArray(value)
        ? value.map((item) => `${encodedKey}=${encodeURIComponent(item)}`).join('&')
        : `${encodedKey}=${encodedValue}`;
      if (value !== null && value !== undefined) {
        str.push(queryString);
      }
    }
  }
  return '?' + str.join('&');
};

export const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

export const cleanObject = (obj: any) => {
  for (const key in obj) {
    if (obj[key] === null || obj[key] === undefined || obj[key] === '') {
      delete obj[key];
    }
  }
};

const setQueryStringWithoutPageReload = (qsValue: string) => {
  const newurl =
    window.location.protocol + '//' + window.location.host + window.location.pathname + qsValue;

  window.history.pushState({ path: newurl }, '', newurl);
};

export const setQueryStringValue = (
  key: string,
  value: string,
  queryString = removeQuestionMark(window.location.search),
) => {
  const values = qs.parse(queryString);
  const newQsValue = qs.stringify({ ...values, [key]: value });
  setQueryStringWithoutPageReload(`?${newQsValue}`);
};

export const getQueryStringValue = (
  key: string,
  queryString = removeQuestionMark(window.location.search),
) => {
  const values = qs.parse(queryString);
  return values[key];
};
