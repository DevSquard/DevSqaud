import { useEffect } from "react";
import { apiAxios } from "../../apis/apiAxios";
import { setCookie } from "../utils/cookieUtils";

const KakaoLogin = () => {
  const code = new URLSearchParams(window.location.search).get("code");
  console.log("URL Search Params:", window.location.search);
  console.log(code);
  const login = async () => {
    try {
      const res = await apiAxios.get("/oauth/kakao", {
        params: { code },
      });
      console.log(res);
      if (res.status !== 200){
        throw new Error("로그인 실패");
      } else {
        setCookie("accessToken", res.data.accessToken, { path: "/" });
        window.location.href="/";
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    login();
  }, [code]);

  return (
    <div>
      <h1>로그인 처리중</h1>
    </div>
  );
};

export default KakaoLogin;