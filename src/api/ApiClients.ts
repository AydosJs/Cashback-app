import { httpAxios } from "./authApi";

export function get<T>(url: string, params?: unknown): Promise<any> {
  return httpAxios.get(url, { params });
}

export function post<T>(url: string, data?: unknown): Promise<any> {
  return httpAxios.post(url, data);
}
