import { useNavigate } from 'react-router-dom';
import style from './styles/MainBox.module.css';
import kakaoSymbol from '/assets/mainpage/kakaoSymbol.png';
import { ChangeEvent, useState } from 'react';
import { apiAxios } from '../../apis/apiAxios';
import googleSymbol from '../../assets/google.png';


interface LoginForm {
  email: string,
  password: string
};

export default function Login() {
  const [ loginForm, setLoginForm ] = useState<LoginForm>({ email: '', password: '' });
  const navigate = useNavigate();

  // 로그인 폼 제출 처리 함수
  const handleLogin = async () => {
    console.log('API Base URL:', process.env.REACT_APP_REST_SERVER);

    // await apiAxios.post("/login", loginForm);
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
      redirect_uri: "http://localhost:5173/oauth/google",
      client_id: "1060643141913-qg5cp9eff1ct5msu51ii7g5nkmvfo8rf.apps.googleusercontent.com",
    });
    const GOOGLE_URL = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
  
    // 지정한 경로로 이동
    window.location.href = GOOGLE_URL;
    
  };

  return (
    <div className={style.container}>
      <div className={style.loginContainer}>
        <h4 className={style.loginTitle}>뭐라 써야할까요</h4>
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
          <div className={style.googleLoginContainer}>
            <button onClick={() => handleGoogleLogin()} className={style.googleButton}>
              <img src={googleSymbol} alt="구글 로그인" className={style.googleLogin}/>
            </button>
          </div>
      </div>
    </div>
  );
}
