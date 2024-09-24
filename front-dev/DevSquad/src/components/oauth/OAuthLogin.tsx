import { useParams } from "react-router-dom"; // URL 파라미터를 가져오기 위한 React Router Hook
import { setCookie } from "../utils/cookieUtils"; // 쿠키를 설정하기 위한 유틸리티 함수
import { apiAxios } from "../../apis/apiAxios"; // API 요청을 위한 Axios 인스턴스
import { useEffect } from "react"; // 사이드 이펙트를 처리하기 위한 React Hook

// OAuth API 경로를 나타내는 인터페이스
interface OAuthAPI {
  [key: string]: string; // key는 문자열이고, 값도 문자열인 객체
}

export default function OAuthLogin() {
  // URL 파라미터에서 OAuth provider 정보를 가져옴 (예: kakao, google)
  const { provider } = useParams<{ provider: string }>(); 

  // URL 쿼리 스트링에서 authorization code를 추출함
  const code: string | null = new URLSearchParams(window.location.search).get("code");
  console.log("Authorization Code:", code); // 확인용 콘솔 로그

  // OAuth 로그인에 사용할 API 엔드포인트 매핑
  const oAuthAPI: OAuthAPI = {
    kakao: "/oauth/kakao",
    google: "/oauth/google",
  };

  // OAuth 로그인 함수
  const login = async (): Promise<void> => {
    // authorization code나 provider 정보가 없을 때 에러 처리
    if (!code || !provider) {
      console.error("Missing authorization code or provider."); // 필요한 정보가 없으면 에러 로그 출력
      return;
    }

    // provider에 해당하는 API 엔드포인트 가져옴
    const apiEndpoint = oAuthAPI[provider];

    // 지원하지 않는 provider일 경우 에러 처리
    if (!apiEndpoint) {
      console.error("Unsupported provider:", provider); // provider가 정의되지 않으면 에러 로그 출력
      return;
    }

    try {
      // API 요청: OAuth provider에서 받은 authorization code를 백엔드로 전송하여 access token 요청
      const res = await apiAxios.get<{ accessToken: string }>(apiEndpoint, {
        params: { code }, // URL 파라미터로 authorization code 전달
      });

      console.log("Response from OAuth:", res); // API 응답 로그

      // 응답 상태 코드가 200이 아니면 에러 처리
      if (res.status !== 200) {
        throw new Error("OAuth login failed"); // 응답 실패 시 에러 발생
      }

      // accessToken을 쿠키에 저장
      setCookie("accessToken", res.data.accessToken, { path: "/" });

      // 로그인 성공 후 홈페이지로 리다이렉트
      window.location.href = "/";
    } catch (error: unknown) {
      // 에러가 Error 타입일 경우, 에러 메시지를 콘솔에 출력
      if (error instanceof Error) {
        console.error("Login error:", error.message);
      } else {
        // Error 타입이 아닐 경우 에러 자체를 출력
        console.error("Login error:", error);
      }
    }
  };

  // 컴포넌트가 렌더링될 때 login 함수를 호출 (code와 provider가 존재하는 경우에만)
  useEffect(() => {
    if (code && provider) {
      login(); // code와 provider가 유효하면 OAuth 로그인 함수 호출
    }
  }, [code, provider]); // code와 provider 값이 변경될 때마다 useEffect 실행

  // 로그인 진행 중 메시지 출력
  return (
    <div>
      <p>Logging in...</p>
    </div>
  );
}
