import axios from 'axios';
const isLoginUser =JSON.parse(localStorage.getItem('userLoginInfo'));

export default axios.create({
  baseURL: 'https://mwhp.me/api',
  headers: {
    'Content-type': 'application/json',
    "Authorization" : isLoginUser != null ?  `Bearer ${isLoginUser.token}` : null
  },
});
