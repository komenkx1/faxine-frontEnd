<template>
    <div>
        <main>
            <!-- breadcrumb section start -->
            <div class="breadcrumb-area bg-img bg-img-tentang-kami" id="about-section">
                <div class="container">
                    <div class="row">
                        <div class="col-12">
                            <div class="breadcrumb-wrap">
                                <nav aria-label="breadcrumb">
                                    <h2 class="breadcrumb-title">About Us</h2>
                                    <ul class="breadcrumb">
                                        <li class="breadcrumb-item"><router-link to="/">Home</router-link></li>
                                        <li class="breadcrumb-item active" aria-current="page">about us</li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- breadcrumb section end -->

            <!-- about section start -->
            <section class="about-wrapper-area section-padding">
                <div class="container">
                    <div class="row align-items-center">
                        <div class="col-lg-5 order-2 order-lg-1">
                            <div class="about-inner">
                                <h2 class="title-active">Faxine</h2>
                                <p>Faxine merupakan sebuah platform yang dibuat untuk membantu
                                    masyarakat yang ingin melakukan vaksinasi guna mencegah penyebaran covid-19.
                                    Platform Faxine ini memberikan layanan kepada masyarakat untuk menemukan
                                    lokasi vaksinasi dan juga untuk melakukan pendaftaran vaksinasi.
                                    Aplikasi Faxine ini akan sangat bermanfaat bagi masyarakat yang
                                    membutuhkan vaksin dalam keadaan mendesak dan juga seperti yang diketahui
                                    vaksin merupakan salah satu syarat agar masyarakat bisa melakukan perjalanan
                                    keluar kota ataupun keluar negeri. Dengan adanya aplikasi Faxine ini diharapkan
                                    dapat meningkatkan jumlah masyarakat yang melakukan vaksinasi dan mengurangi tingkat
                                    penyebaran covid 19.</p>
                            </div>
                        </div>
                        <div class="col-lg-6 offset-lg-1 order-1 order-lg-2">
                            <div class="about-thumb">
                                <img src="../assets/img/logo/faxine.png" class="moving-vertical">
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <!-- about section end -->

            <!-- fun fact section start -->
            <section class="funfacts-section gray-bg section-padding">
                <div class="container">
                    <div class="row align-items-center">
                        <div class="col-xl-6 order-2 order-xl-1">
                            <div class="about-thumb">
                                <img src="../assets/img/bg/our-team-thumb.png">
                            </div>
                        </div>
                        <div class="col-xl-5 offset-xl-1 order-1 order-xl-2">
                            <div class="team-content team-content--style_2 about-inner">
                                <h2 class="h1 title">Our <p class="title-active">Team</p></h2>
                                <p>Kami tergabung dalam tim dari CPSG-73 dalam program MSIB Dicoding Front End 
                                    dan Back End Developer. Website Faxine ini dapat dihasilkan dari kolaborasi 
                                    yang kami lakukan dalam tim ini. Tentunya diharapkan website ini dapat bermanfaat 
                                    bagi masyarakat dan juga dapat membantu mengurangi penyebaran Covid 19.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <!-- fun fact section end -->

            <!-- team section start -->
            <section class="team-wrapper team-wrapper--style_3 section-padding">
                <div class="container">
                    <div class="row">
                        <div class="col-12">
                            <div class="section-title text-center">
                                <h2 class="h1 title">Our<p class="title-active">Creative</p>Team</h2>
                            </div>
                        </div>
                    </div>
                    <div class="row team-member-inner">
                        <div class="col-xl-auto col-sm-3 col-6 flex-grow-1">
                            <div class="team-member team-member--hover-effect mt-40">
                                <div class="team-member-info">
                                    <h5 class="team-member-name">Komang Wahyu</h5>
                                </div>
                                <img src="../assets/img/team/wahyu.png">
                            </div>
                        </div>
                        <div class="col-xl-auto col-sm-3 col-6 flex-grow-1">
                            <div class="team-member team-member--hover-effect mt-40">
                                <div class="team-member-info">
                                    <h5 class="team-member-name">Andrian</h5>
                                </div>
                                <img src="../assets/img/team/Andrian.png">
                            </div>
                        </div>
                    </div>
                    <div class="row team-member-inner">
                        <div class="col-xl-auto col-sm-3 col-6 flex-grow-1">
                            <div class="team-member team-member--hover-effect mt-40">
                                <div class="team-member-info">
                                    <h5 class="team-member-name">Ananda Andra</h5>
                                </div>
                                <img src="../assets/img/team/andra.png">
                            </div>
                        </div>
                        <div class="col-xl-auto col-sm-3 col-6 flex-grow-1">
                            <div class="team-member team-member--hover-effect mt-40">
                                <div class="team-member-info">
                                    <h5 class="team-member-name">Gisela Sanggaria</h5>
                                </div>
                                <img src="../assets/img/team/gisela.png">
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <!-- team section end -->
        </main>
    </div>
</template>
<script>
import scrollToTop from "@/helper/ScrollToTopHelper";

export default {
    name: 'TentangKamiVue',
    mounted() {
        scrollToTop("about-section");
    }

}
</script>