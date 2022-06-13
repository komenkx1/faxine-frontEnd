import axios from 'axios';
const isLoginUser =JSON.parse(localStorage.getItem('userLoginInfo'));

export default axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
  headers: {
    'Content-type': 'application/json',
    "Authorization" : isLoginUser != null ?  `Bearer ${isLoginUser.token}` : null
  },
});
