import { createWebHistory, createRouter } from "vue-router";
import Home from "./views/Home.vue";
import Informasi from "./views/Informasi.vue";
import Statistik from "./views/Statistik.vue";
import Berita from "./views/Berita.vue";
import TentangKami from "./views/Tentang-Kami.vue";
// lazy-loaded
// const Profile = () => import("./components/Profile.vue")
// const BoardAdmin = () => import("./views/Admin.vue")
// const BoardModerator = () => import("./components/BoardModerator.vue")
// const BoardUser = () => import("./components/BoardUser.vue")

const routes = [
  {
    path: "/",
    name: "HomeVue",
    component: Home,
  },
  {
    path: "/Informasi",
    name: "InformasiVue",
    component: Informasi,
  },
  {
    path: "/Statistik",
    name: "StatistikVue",
    component: Statistik,
  },
  {
    path: "/Berita",
    name: "BeritaVue",
    component: Berita,
  },
  {
    path: "/Tentang-Kami",
    name: "TentangKamiVue",
    component: TentangKami,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;