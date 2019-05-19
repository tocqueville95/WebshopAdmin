/* eslint-disable no-param-reassign */
import axios from 'axios';
import https from 'https';
import store from '../store';

const $axios = axios.create({
  baseURL: 'https://localhost:44337/api/',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
  }),
});

$axios.interceptors.request.use(
  (config) => {
    config.headers.common.Authorization = `Bearer ${store.getters['user/token']}`;
    return config;
  }, error => Promise.reject(error),
);

export default $axios;
