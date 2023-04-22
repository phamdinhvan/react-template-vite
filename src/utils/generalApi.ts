import { objectToFormData, objectToJsonData, parseResponseData, routeTo } from '@/utils';
import axiosInstance from './axiosApi';

interface generalParams {
  routeName: string;
  filters?: any;
  url_params?: any;
  data?: any;
  signal?: AbortSignal;
}

export default {
  // called when the user attempts to log in
  getList: async ({ filters, routeName, url_params = {}, signal }: generalParams) => {
    return await axiosInstance
      .get(routeTo(routeName, filters, url_params), { signal: signal })
      .then((response) => {
        return parseResponseData(response.data);
      })
      .catch((error) => error);
  },
  //API chi tiết
  getOne: async ({ url_params, routeName }: generalParams) => {
    return await axiosInstance
      .get(routeTo(routeName, {}, url_params))
      .then((response) => {
        return parseResponseData(response.data);
      })
      .catch((error) => error);
  },
  update: async ({ data, url_params = {}, routeName }: generalParams) => {
    return await axiosInstance
      .patch(routeTo(routeName, {}, url_params), objectToFormData(data), {
        headers: { 'content-type': 'multipart/form-data' },
      })
      .then((response) => {
        return response;
      })
      .catch((error) => error);
  },
  update_full: async ({ data, url_params = {}, routeName }: generalParams) => {
    return await axiosInstance
      .put(routeTo(routeName, {}, url_params), objectToFormData(data), {
        headers: { 'content-type': 'multipart/form-data' },
      })
      .then((response) => {
        return response;
      })
      .catch((error) => error);
  },
  update_json: async ({ data, url_params = {}, routeName }: generalParams) => {
    return await axiosInstance
      .patch(routeTo(routeName, {}, url_params), data)
      .then((response) => {
        return response;
      })
      .catch((error) => error);
  },
  update_json_full: async ({ data, url_params = {}, routeName }: generalParams) => {
    return await axiosInstance
      .put(routeTo(routeName, {}, url_params), data)
      .then((response) => {
        return response;
      })
      .catch((error) => error);
  },
  delete: async ({ url_params, routeName }: generalParams) => {
    return await axiosInstance
      .delete(routeTo(routeName, {}, url_params))
      .then((response) => {
        return response;
      })
      .catch((error) => error);
  },
  create: async ({ data, url_params = {}, routeName }: generalParams) => {
    return await axiosInstance
      .post(routeTo(routeName, {}, url_params), objectToFormData(data), {
        headers: { 'content-type': 'multipart/form-data' },
      })
      .then((response) => {
        return response;
      })
      .catch((error) => error.response);
  },
  create_json: async ({ data, url_params = {}, routeName }: generalParams) => {
    return await axiosInstance
      .post(routeTo(routeName, {}, url_params), objectToJsonData(data))
      .then((response) => {
        return response;
      })
      .catch((error) => error.response);
  },
};
