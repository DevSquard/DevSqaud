import React from 'react';
import { ChangeEvent, useState } from "react";
import style from "./SignUp.module.css";

interface SignUpForm {
    name: string,
    nickName: string,
    email: string,
    password: string,
    birth: string,
}

export default function SignUp() {
  const [signUpForm, setSignUpForm] = useState<SignUpForm>({
    name: "",
    nickName: "",
    email: "",
    password: "",
    birth: ""
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setSignUpForm((pre: SignUpForm) => ({
      ...pre, [name] : value
    }));
    console.log(signUpForm);
  };

  const handleSubmit = await () => {
    await api
  };

  return (
    <div className={style.container}>
      <h2 className={style.titleText}>회원가입</h2>
      <div className={style.sign_up_container}>
        <div className={style.sign_up_container_mini}>
          <input
            type="email"
            name="email"
            value={signUpForm.email}
            onChange={handleChange}
            placeholder="이메일주소"
          />
          <input
            type="password"
            name="password"
            value={signUpForm.password}
            onChange={handleChange}
            placeholder="비밀번호"
          />
        </div>
        <div className={style.sign_up_container_mini}>
          <input
              type="text"
              name="name"
              value={signUpForm.name}
              onChange={handleChange}
              placeholder="이름"
          />
          <input
            type="text"
            name="nickName"
            value={signUpForm.nickName}
            onChange={handleChange}
            placeholder="사용할 닉네임"
          />
          <input
            type="text"
            name="birth"
            value={signUpForm.birth}
            onChange={handleChange}
            placeholder="생년월일 8자리, '-' 제외"
          />
        </div>
        <div>
          <button onClick={handleSubmit}>가입</button>
        </div>
      </div>
    </div> 
  );
};
