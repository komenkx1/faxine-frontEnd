<template>
    <div>
        <main>
            <!-- breadcrumb section start -->
            <div class="breadcrumb-area bg-img bg-img-berita">
                <div class="container">
                    <div class="row">
                        <div class="col-12">
                            <div class="breadcrumb-wrap">
                                <nav aria-label="breadcrumb">
                                    <h2 class="breadcrumb-title">Berita</h2>
                                    <ul class="breadcrumb">
                                        <li class="breadcrumb-item"><router-link to="/">Home</router-link></li>
                                        <li class="breadcrumb-item active" aria-current="page">Berita</li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- breadcrumb section end -->
              <AddBeritaForm :beritas="berita" v-if="isShowForm" />

  <div class="container mb-5">
    <div class="row">
      <div class="col-md-12">
        <div class=" d-flex">
          <button class="w-25 btn btn-primary" v-if="!isShowForm && isLogin" @click="showAddForm">
            Tambahkan Berita Baru
          </button>
          <button class="w-25 btn btn-danger" v-else-if="isShowForm && isLogin" @click="showAddForm">
            Tutup Form
          </button>
        </div>

        <!-- blog section start -->
        <section class="blog-area section-padding">
          <div class="container">
            <div class="row mtn-40">
              <div class="col-lg-3 order-2 order-lg-1 blog-widget-wrapper">
                <!-- widget item start -->
                <div class="blog-widget mt-40">
                  <h4 class="blog-widget-title">Search</h4>
                  <form class="widget-search-form" id="myForm" v-on:submit.prevent="searchData">
                    <input placeholder="Search keyword" type="text" class="search-field" v-model="search">
                    <button type="button" @click="searchData()" class="search-btn"><i
                        class="fa fa-search"></i></button>
                  </form>
                </div>
                <!-- widget item end -->

          <RecentBeritaList/>

              </div>
              <div class="col-lg-9 order-1 order-lg-2 pl-lg-45 ">
            <BeritaList ref="lokasiData" :query="search" :is-home="false" />
               </div>
            </div>
          </div>
        </section>
        <!-- blog section end -->
      </div>
    </div>
  </div>
        </main>
    </div>
</template>
<script>
import BeritaList from '@/components/BeritaList.vue';
import AddBeritaForm from '@/components/AddBeritaForm.vue';
import RecentBeritaList from '@/components/RecentBeritaList.vue';
import IsLoginUser from '@/helper/CheckIsloginHelper';


export default {
    name: 'BeritaVue',
    components: { BeritaList, AddBeritaForm, RecentBeritaList  },
data() {
    return {
      isLogin: IsLoginUser != null ? IsLoginUser.isLogin : false,

      beritaDatas: [],
      berita: {},
      isShowForm: false,
      isLoading: false,
      search: "",
    };
  },
    methods: {
          async refeshDataList() {
      //emit load function on list component
      await this.$refs.lokasiData.loadData();
    },
        showAddForm() {
      if (this.isShowForm) {
        this.isShowForm = false;
      } else {
        this.berita = {};
        this.isShowForm = true;
      }
    },
        async searchData() {
      //emit search function on list component
      await this.$refs.lokasiData.loadDataSearchData();
    },

    mounted() {
    },
}
}
</script>