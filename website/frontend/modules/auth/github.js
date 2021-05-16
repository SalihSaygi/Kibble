import axi from './axios';

async function login() {
  try {
    const { data } = await axi.get('/auth/login/success', {
      withCredentials: true,
    });
    return data;
  } catch (err) {
    console.error(err);
  }
}

async function logout() {
  try {
    const { data } = await axi.get(`${server}/auth/logout`, {
      withCredentials: true,
    });
    return data;
  } catch (err) {
    console.error(err);
  }
}

export { login, logout };
