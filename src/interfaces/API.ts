import { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

export interface APIRequest extends AxiosRequestConfig {
  query: { key: string; value: string };
  payload: any;
}

export interface APIResponse extends AxiosResponse {}

