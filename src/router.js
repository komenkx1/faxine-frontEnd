import { createWebHistory, createRouter } from 'vue-router';
import Home from './views/Home.vue';
import Informasi from './views/Informasi.vue';
import Statistik from './views/Statistik.vue';
import Berita from './views/Berita.vue';
import BeritaDetail from './views/BeritaDetail.vue';
import TentangKami from './views/Tentang-Kami.vue';
import Login from './views/Login.vue';
import Register from './views/Register.vue';

// lazy-loaded
// const Profile = () => import("./components/Profile.vue")
// const BoardAdmin = () => import("./views/Admin.vue")
// const BoardModerator = () => import("./components/BoardModerator.vue")
// const BoardUser = () => import("./components/BoardUser.vue")

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
  },
  {
    path: '/Register',
    name: 'Register',
    component: Register,
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

export default router;
