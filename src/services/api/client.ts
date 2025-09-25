/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

// API 기본 설정 (Next.js 프록시를 통해 CORS 문제 해결)
const BASE_URL = "/api";

// Axios 인스턴스 생성 (인터셉터 없음)
export const apiClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// API 호출 헬퍼 함수들
export const apiUtils = {
  // GET 요청
  get: async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    const response = await apiClient.get<T>(url, config);
    return response.data;
  },

  // POST 요청
  post: async <T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> => {
    try {
      console.log(`🚀 POST ${url}`, { data, config });
      const response = await apiClient.post<T>(url, data, config);
      console.log(`✅ POST ${url} Success:`, response.data);
      return response.data;
    } catch (error: any) {
      console.error(`❌ POST ${url} Error:`, {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        requestData: data,
        error: error.message,
      });
      throw error;
    }
  },

  // PUT 요청
  put: async <T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> => {
    const response = await apiClient.put<T>(url, data, config);
    return response.data;
  },

  // DELETE 요청
  delete: async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    const response = await apiClient.delete<T>(url, config);
    return response.data;
  },

  // PATCH 요청
  patch: async <T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> => {
    const response = await apiClient.patch<T>(url, data, config);
    return response.data;
  },
};

export default apiClient;
