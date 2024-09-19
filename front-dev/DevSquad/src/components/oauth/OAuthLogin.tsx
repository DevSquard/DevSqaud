import { useParams } from "react-router-dom";
import { setCookie } from "../utils/cookieUtils";
import { apiAxios } from "../../apis/apiAxios";
import { useEffect } from "react";

interface OAuthAPI {
  [key: string]: string;
}

const OAuthLogin = () => {
  const { provider } = useParams<{ provider: string }>();
  const code = new URLSearchParams(window.location.search).get("code");
  console.log(code);

  const oAuthAPI : OAuthAPI = {
    kakao : "/oauth/kakao",
    google : "/oauth/google"
  }

  const login = async () => {
    try {
      const res = await apiAxios.get(oAuthAPI[provider], {
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
      <>
      <h1>로그인중 ... </h1>
      </>
    );
};

export default OAuthLogin;