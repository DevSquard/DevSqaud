import { useParams } from "react-router-dom";
import { setCookie } from "../utils/cookieUtils";
import { apiAxios } from "../../apis/apiAxios";
import { useEffect } from "react";

interface OAuthAPI {
  [key: string]: string;
}

export default function OAuthLogin() {
  const { provider } = useParams<{ provider: string }>(); // useParams에서 provider를 string으로 추정
  const code: string | null = new URLSearchParams(window.location.search).get("code");
  console.log("Authorization Code:", code);

  const oAuthAPI: OAuthAPI = {
    kakao: "/oauth/kakao",
    google: "/oauth/google",
  };

  const login = async (): Promise<void> => {
    if (!code || !provider) {
      console.error("Missing authorization code or provider.");
      return;
    }

    const apiEndpoint = oAuthAPI[provider];

    if (!apiEndpoint) {
      console.error("Unsupported provider:", provider);
      return;
    }

    try {
      const res = await apiAxios.get<{ accessToken: string }>(apiEndpoint, {
        params: { code },
      });

      console.log("Response from OAuth:", res);

      if (res.status !== 200) {
        throw new Error("OAuth login failed");
      }

      setCookie("accessToken", res.data.accessToken, { path: "/" });
      window.location.href = "/";
    } catch (error: unknown) {
      // error가 Error 타입이면 message를 출력
      if (error instanceof Error) {
        console.error("Login error:", error.message);
      } else {
        console.error("Login error:", error);
      }
    }
  };

  useEffect(() => {
    if (code && provider) {
      login();
    }
  }, [code, provider]);

  return (
    <div>
      <p>Logging in...</p>
    </div>
  );
}
