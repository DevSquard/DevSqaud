import axios from "axios";

const api = axios.create({
  // 기본 도메인 설정
  baseURL: `${process.env.REACT_APP_REST_SERVER}`,
  // HttpOnly 쿠키 속성으로 저장된 refresh 토큰 전송
  withCredentials: true
});

export default api;