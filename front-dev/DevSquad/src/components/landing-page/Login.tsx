import { useNavigate } from 'react-router-dom';
import style from './styles/MainBox.module.css';
import kakaoSymbol from '/assets/mainpage/kakaoSymbol.png';
import { ChangeEvent, useState } from 'react';
import { apiAxios } from '../../apis/apiAxios';


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

    await apiAxios.post("/login", loginForm);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setLoginForm(pre => ({
      ...pre, [name] : value
    }));
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
          {/* 카카오 로그인 폼으로 이동시키기 */}
          <div className={style.kakaoLoginContainer}>
            <img src={kakaoSymbol} alt="카카오심볼" className={style.kakaoSymbolImg} />
            <p className={style.kakaoLabel}>카카오 로그인</p>
          </div>
      </div>
    </div>
  );
}
