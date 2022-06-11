<template>
  <div>
    <main>
      <!-- breadcrumb section start -->
      <div class="breadcrumb-area bg-img" data-bg="../assets/img/banner/informasi-banner.jpg">
        <div class="container">
          <div class="row">
            <div class="col-12">
              <div class="breadcrumb-wrap">
                <nav aria-label="breadcrumb">
                  <h2 class="breadcrumb-title">Informasi</h2>
                  <ul class="breadcrumb">
                    <li class="breadcrumb-item">
                      <router-link to="/">Home</router-link>
                    </li>
                    <li class="breadcrumb-item active" aria-current="page">
                      Informasi
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- breadcrumb section end -->
      <LokasiList />
    </main>
  </div>
</template>
<script>

import LokasiList from "@/components/LokasiList.vue";
import CustomAlert from "@/components/CustomAlert.vue";
// import { Swal } from "sweetalert2/dist/sweetalert2";




export default {
  name: "InformasiVue",

  components: { LokasiList },

  methods: {
    async showAlert() {
      // Use sweetalert2
      CustomAlert.fire({
        icon: 'success',
        title: 'Success'
      })
    },
  },
  mounted() {
    this.showAlert();
  },
};
</script>
