import { AxiosRequestConfig } from 'axios';

declare module 'axios' {
  // eslint-disable-next-line
  export interface AxiosRequestConfig {
    loading?: boolean;
  }
}
