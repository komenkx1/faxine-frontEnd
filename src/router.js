import { createWebHistory, createRouter } from 'vue-router';
import Home from './views/Home.vue';
import Informasi from './views/Informasi.vue';
import Statistik from './views/Statistik.vue';
import Berita from './views/Berita.vue';
import BeritaDetail from './views/BeritaDetail.vue';
import TentangKami from './views/Tentang-Kami.vue';
import Login from './views/Login.vue';
import Register from './views/Register.vue';
import VueRouteMiddleware from 'vue-route-middleware';
import IsLoginUser from '@/helper/CheckIsloginHelper';
let auth = IsLoginUser != null ? IsLoginUser.isLogin : false;

const routes = [
  {
    path: '/',
    name: 'HomeVue',
    component: Home,
  },
  {
    path: '/Informasi',
    name: 'InformasiVue',
    component: Informasi,
  },
  {
    path: '/Statistik',
    name: 'StatistikVue',
    component: Statistik,
  },
  {
    path: '/Berita',
    name: 'BeritaVue',
    component: Berita,
  },
  {
    path: '/Tentang-Kami',
    name: 'TentangKamiVue',
    component: TentangKami,
  },
  {
    path: '/Login',
    name: 'Login',
    component: Login,
    meta: {
    middleware: (to, from, next) => {
      if(auth){
          next({ name: 'HomeVue' });
      }
    }
  }
  },
  {
    path: '/Register',
    name: 'Register',
    component: Register,
    meta: {
      middleware: (to, from, next) => {
          if(!auth){
              next({ name: 'Login' });
          }
        }
      }
  },
  {
    path: "/Berita/:id",
    name: "BeritaDetail",
    component: BeritaDetail,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(VueRouteMiddleware());
export default router;
