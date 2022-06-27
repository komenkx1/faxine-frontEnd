<template>
    <header class="header-area">
        <div class="main-header d-none d-lg-block">
            <!-- main menu start -->
            <div class="main-menu-wrapper sticky header-transparent">
                <div class="container">
                    <div class="row align-items-center">
                        <div class="col-lg-2">
                            <!-- logo area start -->
                            <div class="brand-logo">
                                <a href="#">
                                    <img src="../assets/img/logo/faxine.png" />
                                </a>
                            </div>
                            <!-- logo area end -->
                        </div>
                        <div class="col-lg-10">
                            <div class="main-menu-inner">
                                <!-- main menu navbar start -->
                                <nav class="main-menu">
                                    <ul>
                                        <li :class="{ 'active': getRoutePath === '/' }">
                                            <router-link to="/">Home</router-link>
                                        </li>
                                        <li :class="{ 'active': getRoutePath === '/Informasi' }">
                                            <router-link to="/Informasi">Informasi Vaksin Covid</router-link>
                                        </li>
                                        <li :class="{ 'active': getRoutePath === '/Statistik' }">
                                            <router-link to="/Statistik">Data Statistik Covid</router-link>
                                        </li>
                                        <li :class="{ 'active': getRoutePath === '/Berita' }">
                                            <router-link to="/Berita">Berita</router-link>
                                        </li>
                                        <li :class="{ 'active': getRoutePath === '/Tentang-Kami' }">
                                            <router-link to="/Tentang-Kami">Tentang Kami</router-link>
                                        </li>
                                        <li class="btn btn-danger" v-if="isLogin" @click="logout">
                                            <button style="color:white;">Logout</button>
                                        </li>
                                    </ul>
                                </nav>
                                <!-- main menu navbar end -->
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- main menu end -->
        </div>

        <!-- mobile header start -->
        <!-- mobile header start -->
        <div class="mobile-header d-lg-none d-md-block sticky">
            <!--mobile header top start -->
            <div class="container">
                <div class="row align-items-center">
                    <div class="col-12">
                        <div class="mobile-main-header">
                            <div class="mobile-logo">
                                <a href="#">
                                    <img src="../assets/img/logo/faxine.png" />
                                </a>
                            </div>
                            <div @click="clickToggler = !clickToggler" class="mobile-menu-toggler">
                                <button class="mobile-menu-btn">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- mobile header top start -->
        </div>
        <!-- mobile header end -->
        <!-- mobile header end -->

        <!-- offcanvas mobile menu start -->
        <!-- off-canvas menu start -->
        <aside class="off-canvas-wrapper open" v-if="getToggler">
            <div class="off-canvas-overlay"></div>
            <div class="off-canvas-inner-content">
                <div class="btn-close-off-canvas" @click="this.clickToggler = false">
                    <i class="fa fa-close"></i>
                </div>

                <div class="off-canvas-inner">
                    <!-- mobile menu start -->
                    <div class="mobile-navigation">
                        <!-- mobile menu navigation start -->
                        <nav>
                            <ul class="mobile-menu">
                                <li :class="{ 'active': getRoutePath === '/' }" @click="this.clickToggler = false">
                                    <router-link to="/">Home</router-link>
                                </li>
                                <li :class="{ 'active': getRoutePath === '/Informasi' }"
                                    @click="this.clickToggler = false">
                                    <router-link to="/Informasi">Informasi Vaksin Covid</router-link>
                                </li>
                                <li :class="{ 'active': getRoutePath === '/Statistik' }"
                                    @click="this.clickToggler = false">
                                    <router-link to="/Statistik">Data Statistik Covid</router-link>
                                </li>
                                <li :class="{ 'active': getRoutePath === '/Berita' }"
                                    @click="this.clickToggler = false">
                                    <router-link to="/Berita">Berita</router-link>
                                </li>
                                <li :class="{ 'active': getRoutePath === '/Tentang-Kami' }"
                                    @click="this.clickToggler = false">
                                    <router-link to="/Tentang-Kami">Tentang Kami</router-link>
                                </li>
                                <li class="btn btn-danger" v-if="isLogin" @click="logout">
                                    <button style="color:white;">Logout</button>
                                </li>
                            </ul>
                        </nav>
                        <!-- mobile menu navigation end -->
                    </div>
                    <!-- mobile menu end -->
                </div>
            </div>
        </aside>
        <!-- off-canvas menu end -->
        <!-- offcanvas mobile menu end -->
    </header>
</template>

<script>
import AuthServices from '@/services/AuthServices';
import IsLoginUser from '@/helper/CheckIsloginHelper';
import sessionExpired from '@/helper/SessionExpired';
export default {
    name: "NavbarVue",
    data() {
        return {
            clickToggler: false,
            isLogin: false
        }
    },
    mounted() {

        this.isLogin = IsLoginUser != null ? IsLoginUser.isLogin : false;
    },
    methods: {
        async logout() {
            AuthServices.logout().then(response => {
                console.log(response);
                localStorage.removeItem('userLoginInfo')
                window.location.href = '/'
                // this.$router.push('/');
            }).catch(error => {
                this.clickToggler = false
                if (error.response.status === 401) {
                    sessionExpired();
                }
            })

            // console.log("terlogout")
        }
    },
    computed: {
        getRoutePath() {
            return this.$route.path;
        },
        getToggler() {
            return this.clickToggler
        }
    }
};
</script>
