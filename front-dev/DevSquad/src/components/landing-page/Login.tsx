import { useNavigate } from 'react-router-dom';
import style from './styles/MainBox.module.css';
import { ChangeEvent, useEffect, useState } from 'react';
import kakaoSymbol from '/assets/mainpage/kakaoSymbol.png';
import { apiAxios } from '../../apis/apiAxios';
import googleSymbol from '../../assets/google.png';
import { useCookies } from 'react-cookie';
import { useRecoilState } from 'recoil';
import { isLoggedInState } from '../../recoil/IsLoggedInState';


interface LoginForm {
  email: string,
  password: string
};

interface MyInfo {
  nickname: string,
  hotLevel: number,
  streakCount: number
};

export default function Login() {
  const [cookies] = useCookies(['accessToken']);
  const [myInfo, setMyInfo] = useState<MyInfo>({
    nickname: '',
    hotLevel: 0,
    streakCount: 0
  });
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInState);
  const [ loginForm, setLoginForm ] = useState<LoginForm>({ email: '', password: '' });
  const navigate = useNavigate();

  // 로그인 폼 제출 처리 함수
  const handleLogin = async (e) => {
    e.preventDefault();
    // try {
    //   // 로그인 API 호출
    //   const res = await apiAxios.post('/login', loginForm);
    //   setCookie('accessToken', res.data.accessToken, { path: '/' });
    //   setIsLoggedIn(true);
    // } catch (error) {
    //   console.log(error);
    // }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setLoginForm(pre => ({
      ...pre, [name] : value
    }));
  };

  const handleGoogleLogin = () => {
    // 구글 로그인 버튼 클릭 시 이동하는 경로 지정
    const params = new URLSearchParams({
      scope: "email profile",
      response_type: "code",
      redirect_uri: import.meta.env.VITE_APP_GOOGLE_REDIRECT_URI,
      client_id: import.meta.env.VITE_APP_GOOGLE_ID,
    });
    const GOOGLE_URL = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
  
    // 지정한 경로로 이동
    window.location.href = GOOGLE_URL;
    
  };

  const handleKakaoLogin = () => {
    // 구글 로그인 버튼 클릭 시 이동하는 경로 지정
    const params = new URLSearchParams({
      response_type: "code",
      redirect_uri: import.meta.env.VITE_APP_KAKAO_REDIRECT_URI,
      client_id: import.meta.env.VITE_APP_KAKAO_ID,
    });
    const KAKAO_URL = `https://kauth.kakao.com/oauth/authorize?${params.toString()}`;
  
    // 지정한 경로로 이동
    window.location.href = KAKAO_URL;
    
  };

  const loginStreak = async () => {
    await apiAxios.post("/auth/streak-count");
  };

  const callMyInfo = async () => {
    const res = await apiAxios.get("/auth/my-info");
    setMyInfo(res.data);
  };

  useEffect(() => {
    // 쿠키에서 액세스 토큰을 읽어서 로그인 상태를 확인합니다.
    if (cookies.accessToken) {
      setIsLoggedIn(true);
      loginStreak();
      callMyInfo();
    }
  }, [cookies.accessToken]);

  useEffect(() => {
    console.log("Updated myInfo:", myInfo); // 상태 업데이트 후 로그
  }, [myInfo]);

  return (
    <div className={style.container}>
      { isLoggedIn ? (
        // 로그인 후 다른 화면
        <div className={style.loginContainer}>
          <div className={style.loggedInInnerContainer}>
            <div className={style.myInfo}>
              <div className={style.thumb}>
                <img src={googleSymbol} alt="이미지" className={style.myInfoImg} />
              </div>
              <div className={style.myInfoText}>
                <strong className={style.nickname}>{myInfo.nickname}</strong>
                <p className={style.streak}>
                  <span>스트릭 : </span>
                  <span>{myInfo.streakCount}</span>
                  <span>일</span>
                </p>
              </div>
            </div>
          </div>
        </div> 
      ) : (
        <div className={style.loginContainer}>
          <div className={style.loginInnerContainer}>
          <div className={style.loginInputBox}>
            {/* 로그인 폼으로 이동시키기 */}
            <form onSubmit={handleLogin}>
              <div className={style.test}>
                <div className={style.inputGroup}>
                  <input 
                    name='email' 
                    placeholder='Email' 
                    value={loginForm.email} 
                    onChange={handleChange} 
                    className={style.inputField} 
                    required
                  />
                  <input 
                    type="password" 
                    name="password" 
                    placeholder='Password' 
                    value={loginForm.password} 
                    onChange={handleChange} 
                    className={style.inputField} 
                    required
                  />
                </div>
                <div className={style.buttonGroup}>
                  <button className={style.loginButton}>Login</button>
                </div>
              </div>
            </form>
          </div>
            {/* 회원가입 폼으로 이동시키기 */}
            <button className={style.signupButton} onClick={() => navigate("/")}>회원가입</button>
            {/* 구글 로그인 폼으로 이동시키기 */}
            <div className={style.googleContainer} onClick={() => handleGoogleLogin()}>
              <img src={googleSymbol} alt="구글 로그인" className={style.kakaoSymbolImg} />
              <p className={style.kakaoLabel}>구글 로그인</p>
            </div>
            {/* 카카오 폼으로 이동 */}
            <div className={style.kakaoLoginContainer} onClick={() => handleKakaoLogin()}>
              <img src={kakaoSymbol} alt="카카오심볼" className={style.kakaoSymbolImg} />
              <p className={style.kakaoLabel}>카카오 로그인</p>
            </div>
            </div>
        </div>
      )}
    </div>
  );
}
