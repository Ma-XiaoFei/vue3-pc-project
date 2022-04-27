import axios from 'axios';

const service = axios.create({
  baseURL: 'http://mock.xiaofei.fun/mock/62690051a1af0a00ad55c09c',
  timeout: 15000,
});

service.interceptors.request.use(
  (config) => {
    if (config.loading) {
      alert('s');
    }
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
