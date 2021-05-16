import React from 'react';
import { GithubLoginButton } from 'react-social-login-buttons';
const login = () => {
  const clickHandler = () => {
    window.open('http://localhost:3050/auth/github', '_self');
  };
  return (
    <div>
      <GithubLoginButton onClick={clickHandler} />
    </div>
  );
};

export default login;
