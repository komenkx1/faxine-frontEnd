import httpCommon from './http-common';

class AuthServices {
  login({ email, password }) {
    return httpCommon.post('/login', {
      email,
      password,
    });
  }

 async setToken(token) {
    const userLoginInfo = {
      isLogin: true,
      token: token,
    };
    localStorage.setItem('userLoginInfo', JSON.stringify(userLoginInfo))
    // const isLoginUser = await JSON.parse(localStorage.getItem('userLoginInfo'));
    // httpCommon.defaults.headers.common['Authorization'] = `Bearer ${isLoginUser.token}`;
  }

  logout(){
    return httpCommon.post("/logout");
  }
}

export default new AuthServices();
