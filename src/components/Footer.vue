<template>
  <div>
    <footer>
      <div class="footer-widget-area gray-bg section-padding pb-125">
        <div class="container">
          <div class="row mtn-40">
            <div class="col-lg-4 col-md-6">
              <!-- footer single widget start -->
              <div class="footer-single-widget mt-40">
                <div class="widget-logo">
                  <a href="#">
                    <img src="../assets/img/logo/faxine.png" alt="logo"/>
                  </a>
                </div>
                <div class="widget-body">
                  <p class="desc">
                    Faxine merupakan sebuah platform yang dibuat untuk membantu
                    masyarakat yang ingin melakukan vaksinasi guna mencegah penyebaran covid-19.
                  </p>
                </div>
              </div>
              <!-- footer single widget start -->
            </div>

            <div class="col-lg-4 col-md-6">
              <!-- footer single widget start -->
              <div class="footer-single-widget mt-40">
                <h3 class="widget-title">Tautan Terkait</h3>
                <div class="widget-body">
                  <ul class="useful-link">
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
                  </ul>
                </div>
              </div>
              <!-- footer single widget start -->
            </div>

            <div class="col-lg-4 col-md-6">
              <!-- footer single widget start -->
              <div class="footer-single-widget mt-40">
                <h3 class="widget-title">Social Media</h3>
                <div class="widget-body news-subtitle">
                  <ul class="d-flex social-media-icon">
                    <li>
                      <div class="card "><a class="icon-facebook" href="https://www.facebook.com/dicoding"
                          target="_blank"> <i class="fa-brands fa-facebook-square p-2"></i></a></div>
                    </li>
                    <li>
                      <div class="card ml-2"><a class="icon-twitter" href="https://www.twitter.com/dicoding"
                          target="_blank"> <i class="fa-brands fa-twitter-square p-2"></i></a></div>
                    </li>
                    <li>
                      <div class="card ml-2"><a class="icon-instagram" href="https://www.instagram.com/dicoding"
                          target="_blank"> <i class="fa-brands fa-instagram-square p-2"></i></a></div>
                    </li>
                  </ul>
                </div>
              </div>
              <!-- footer single widget start -->
            </div>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <div class="container">
          <div class="copyright-text text-center">
            <p>
              &copy; 2022 <b>Faxine</b> Made with
              <i class="fa fa-heart text-danger"></i> by
              <a href="#"><b>Faxine Team</b></a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: "FooterVue",
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
