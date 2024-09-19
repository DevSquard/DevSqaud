import { Cookies } from "react-cookie";

const cookies = new Cookies();

// 쿠키 설정 함수
export const setCookie = (name: string, value: string, options: { path?: string; expires?: Date; maxAge?: number; secure?: boolean; httpOnly?: boolean }) => {
  return cookies.set(name, value, { ...options });
};

// 쿠키 가져오기 함수
export const getCookie = (name: string): string | undefined => {
  return cookies.get(name);
};

// 쿠키 삭제 함수
export const removeCookie = (name: string, options?: { path?: string }) => {
  return cookies.remove(name, { ...options });
};
