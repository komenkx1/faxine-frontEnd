import httpCommon from './http-common';

class LoginServices {
  login({ email, password }) {
    return httpCommon.post('/login', {
      email,
      password,
    });
  }

  setToken(token) {
    httpCommon.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }
}

export default new LoginServices();
