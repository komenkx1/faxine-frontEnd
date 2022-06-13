<template>
  <div>
    <main>
      <!-- breadcrumb section start -->
      <div
        class="breadcrumb-area bg-img"
        data-bg="assets/img/banner/page-banner.jpg"
      >
        <div class="container">
          <div class="row">
            <div class="col-12">
              <div class="breadcrumb-wrap">
                <nav aria-label="breadcrumb">
                  <h2 class="breadcrumb-title">About Us</h2>
                  <ul class="breadcrumb">
                    <li class="breadcrumb-item">
                      <a href="index.html">Home</a>
                    </li>
                    <li class="breadcrumb-item active" aria-current="page">
                      about us
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- breadcrumb section end -->

      <!-- Register -->
      <FormRegister />
      <!-- End Register -->
    </main>
  </div>
</template>
<script>
import FormRegister from '@/components/FormRegister.vue';
import CustomAlert from '@/components/CustomAlert.vue';
export default {
  name: 'LoginVue',
  components: {
    FormRegister,
  },
  methods: {
    async showAlert() {
      // Use sweetalert2
      CustomAlert.fire({
        icon: 'success',
        title: 'Success',
      });
    },
  },
  mounted() {
    this.showAlert();
  },
};
</script>
