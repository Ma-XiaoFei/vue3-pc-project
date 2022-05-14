import axios from 'axios';

const service = axios.create({
  baseURL: 'http://101.43.231.26:2205',
  timeout: 15000,
});

service.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => Promise.reject(error)
);

service.interceptors.response.use(
  (config) => {
    const { data } = config;
    return data;
  },
  (error) => Promise.reject(error)
);

export default service;
