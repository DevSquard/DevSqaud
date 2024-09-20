import axios from "axios";
import { getCookie } from "../components/utils/cookieUtils";

export const apiAxios = axios.create({
  // 기본 도메인 설정
  baseURL: `${import.meta.env.VITE_REST_SERVER}`,
  // HttpOnly 쿠키 속성으로 저장된 refresh 토큰 전송
  withCredentials: true
});
apiAxios.interceptors.request.use(
  (config) => {
    const token = getCookie("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      delete config.headers.Authorization;
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
  
);