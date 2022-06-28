<template>
    <div>
        <main>
            <!-- hero slider section start -->
            <section class="hero-slider hero-transparent-bg gray-bg fix" id="home-section">
                <div class="hero-slider-active slick-arrow-style  slick-dot-style">
                    <!-- single slider item start -->
                    <div class="hero-single-slide">
                        <div class="hero-slider-item">
                            <div class="container">
                                <div class="row align-items-center">
                                    <div class="col-xl-5 col-sm-6">
                                        <div class="hero-slider-content">
                                            <h1 class="slide-title">Ayo Segera Lakukan Vaksinasi Covid-19</h1>
                                            <a href="#informasi" class="btn btn-danger mt-4 p-3">Selengkapnya</a>
                                        </div>
                                    </div>
                                    <div class="col-xl-7 col-sm-6">
                                        <div class="slider-thumb moving-vertical">
                                            <img src="../assets/img/hero/hero-home.png" alt="slider thumb">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- single slider item start -->
                </div>
            </section>
            <!-- hero slider section end -->

            <!-- fast menu start -->
            <section class="policy-area section-padding pb-125 fix wow fadeInUp" data-wow-duration="1s"
                data-wow-delay=".5s">
                <div class="container">
                    <div class="row mtn-30">
                        <!-- single item start -->
                        <div class="col-lg-4 col-md-6">
                            <div class="service-policy-item mt-30">
                                <div class="service-policy-icon">
                                    <img src="../assets/img/icon/vaccination.png">
                                </div>
                                <h3 class="service-policy-title">Info Vaksinasi</h3>
                            </div>
                        </div>
                        <!-- single item end -->
                        <!-- single item start -->
                        <div class="col-lg-4 col-md-6">
                            <div class="service-policy-item mt-30">
                                <div class="service-policy-icon">
                                    <img src="../assets/img/icon/analysis.png">
                                </div>
                                <h3 class="service-policy-title">Statistik Covid-19</h3>
                            </div>
                        </div>
                        <!-- single item end -->
                        <!-- single item start -->
                        <div class="col-lg-4 col-md-6">
                            <div class="service-policy-item mt-30">
                                <div class="service-policy-icon">
                                    <img src="../assets/img/icon/news.png">
                                </div>
                                <h3 class="service-policy-title">Berita Terkini</h3>
                            </div>
                        </div>
                        <!-- single item end -->
                    </div>
                </div>
            </section>
            <!-- fast menu end -->

            <!-- informasi vaksin section start -->
            <section class="service-wrapper gray-bg section-padding fix">
                <div class="container wow fadeInUp" data-wow-duration="1s" data-wow-delay=".5s">
                    <div class="row">
                        <div class="col-12">
                            <div class="section-title text-center">
                                <h2 class="h1 title" id="informasi">Informasi Vaksin<p class="title-active"> Covid-19</p>
                                </h2>
                                <br>
                                <router-link to="/Informasi" style="color:white;"><button class="btn btn-primary mt-5 p-3">Buat Lokasi Baru</button></router-link>
                            </div>
                        </div>
                    </div>
                    <LokasiList :item-count="4" :is-home="true"/>
                </div>
            </section>
            <!-- informasi vaksin section end -->

            <!-- berita section start -->
            <section class="blog-area section-padding pb-0 fix wow fadeInUp" data-wow-duration="1s"
                data-wow-delay=".5s">
                <div class="container">
                    <div class="row">
                        <div class="col-12">
                            <div class="section-title text-center">
                                <h2 class="title-active">Berita <h2 class="h1 title">Terkini</h2>
                                </h2>
                            </div>
                        </div>
                    </div>

                       <BeritaList :item-count="3" :is-home="true"/>
                       <br>
                       <router-link to="/Berita" style="color: #00baa0; font-weight: bold;" class="d-flex justify-content-around">Lihat Selengkapnya >></router-link>

                </div>
            </section>
            <br>
            <br>
            <!-- berita section end -->

        </main>
    </div>
</template>

<script>

import LokasiList from "@/components/LokasiList.vue";
import BeritaList from "@/components/BeritaList.vue";
import scrollToTop from "@/helper/ScrollToTopHelper";

export default {
    name: 'HomeVue',
    components: { LokasiList, BeritaList },
    mounted() {
        scrollToTop("home-section");
    }
}

</script>