<template>
  <div>
    <main>
      <!-- breadcrumb section start -->
      <div class="breadcrumb-area bg-img bg-img-informasi" id="informasi-section">
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
                    <li class="breadcrumb-item active" aria-current="page">Informasi</li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- breadcrumb section end -->
      <div class="container mt-5">
        <div id="form-lokasi">
          <AddLocationForm :lokasis="lokasi" v-if="isShowForm || isEdit" />
        </div>

        <div class="card">
          <div class="card-header">
            <div class="row  align-items-center justify-content-between">
              <div class="col-md-8 col-12">

                <button class="w-100 w-lg-50 btn btn-primary mb-2 mb-md-0" v-if="!isShowForm" @click="showAddForm">
                  Buat Lokasi Baru
                </button>
                <button class="w-100 w-lg-50 btn btn-danger" v-else @click="showAddForm">
                  Tutup Form
                </button>
              </div>
              <div class="col-md-4">
                <input type="text" class="w-100 form-control" placeholder="Tekan enter untuk mencari lokasi..." v-model="search"
                  @keyup.enter="searchData">
              </div>
            </div>
          </div>
        </div>
      </div>

      <LokasiList @isShowForm="setIsShowForm" @lokasis="setlokasiData" ref="lokasiData" :query="search"
        :is-home="false" />
    </main>
  </div>
</template>
<script>

import LokasiList from "@/components/LokasiList.vue";
import AddLocationForm from "@/components/AddLocationForm.vue";
import scrollToTop from "@/helper/ScrollToTopHelper";

export default {
  name: "InformasiVue",
  data() {
    return {
      isShowForm: false,
      isEdit: false,
      search: "",
      lokasi: {}
    };
  },
  components: { LokasiList, AddLocationForm },

  methods: {
    showAddForm() {
      if (this.isShowForm) {
        this.isShowForm = false;
      } else {
        this.lokasi = {};
        this.isShowForm = true;
        //scroll to top
        scrollToTop("form-lokasi")

      }
    },
    setIsShowForm(value) {
      this.isShowForm = value;
    },
    setlokasiData(value) {
      this.lokasi = value;
      //scroll to top
      scrollToTop("form-lokasi")
    },

    async refeshDataList() {
      //emit load function on list component
      await this.$refs.lokasiData.loadData();
    },
    async searchData() {
    await this.$refs.lokasiData.loadDataSearchData()
      //emit search function on list component
    }
  },
  mounted() {
    //scroll to top
    scrollToTop("informasi-section")
  },
};
</script>
