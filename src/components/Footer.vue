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
                    <img src="../assets/img/logo/faxine.png" />
                  </a>
                </div>
                <div class="widget-body">
                  <p class="desc">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
                    incididunt ut labore et dolore magna aliqua. 
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
                    <li><a href="#">Home</a></li>
                    <li><a href="#">Informasi Vaksin Covid</a></li>
                    <li><a href="#">Data Statistik Covid</a></li>
                    <li><a href="#">Berita</a></li>
                    <li><a href="#">Tentang Kami</a></li>
                  </ul>
                </div>
              </div>
              <!-- footer single widget start -->
            </div>

            <div class="col-lg-4 col-md-6">
              <!-- footer single widget start -->
              <div class="footer-single-widget mt-40">
                <h3 class="widget-title">Subscribe</h3>
                <div class="widget-body news-subtitle">
                  <div class="newsletter-inner">
                    <form id="mc-form">
                      <input
                        type="email"
                        class="news-field"
                        id="mc-email"
                        autocomplete="off"
                        placeholder="Input email disini"
                      />
                      <button class="btn btn-all" id="mc-submit">
                        Subscribe
                      </button>
                    </form>
                    <!-- mailchimp-alerts Start -->
                    <div class="mailchimp-alerts">
                      <div class="mailchimp-submitting"></div>
                      <!-- mailchimp-submitting end -->
                      <div class="mailchimp-success"></div>
                      <!-- mailchimp-success end -->
                      <div class="mailchimp-error"></div>
                      <!-- mailchimp-error end -->
                    </div>
                    <!-- mailchimp-alerts end -->
                  </div>
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
};
</script>