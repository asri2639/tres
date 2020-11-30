import { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

export interface APIRequest extends AxiosRequestConfig {
  query: { key: string; value: string };
  payload: any;
  config: any;
}

export interface APIResponse extends AxiosResponse {}

