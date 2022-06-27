<template>

  <div class="row" id="blog-section">

    <BlogItemSkeleton v-if="isLoading" />
    <!-- blog single post start -->
    <h3 v-else-if="beritaDatas.length == 0" class="text-center col-md-12">Data Tidak Ditemukan</h3>
    <div :class="isHome ? 'col-md-4' : 'col-md-6'" v-for="berita in beritaDatas" :key="berita.id" v-else>
      <div class="blog-item mt-40">
        <div class="blog-thumb">
          <router-link :to="'/Berita/' + berita.slug">
            <img :src="berita.cover" alt="blog thumb" class="center-cropped">
          </router-link>
        </div>
        <div class="blog-content">
          <h3 class="blog-title  pb-0">
            <router-link :to="'/Berita/' + berita.slug">{{ truncate(berita.judul, 25) }}</router-link>
          </h3>
          <!-- <p style="height: 75px;" >{{ truncate(berita.content,120) }}</p> -->
          <div class="content" v-html="truncate(berita.content, 120)"></div>
          <div class="blog-meta">
            <router-link :to="'/Berita/' + berita.slug">{{ berita.tanggal_pembuatan }}</router-link>
          </div>
        </div>
      </div>
    </div>
    <!-- blog single post start -->

    <!-- start pagination area -->
    <div :class="isHome || beritaDatas.length == 0 ? 'col-12  d-none' : 'col-12'">
      <div class="paginatoin-area text-center mt-40">
        <ul class="pagination-box">

          <li :class="currentPage == page ? 'active' : ''" v-for="page in pages" v-bind:key="page"><a
              href="javascript:void(0)" @click="loadDataPerpage(page)">{{ page }}</a></li>


        </ul>
      </div>
    </div>
    <!-- end pagination area -->
  </div>

</template>

<script>
import BeritaService from '@/services/BeritaService';
import BlogItemSkeleton from '@/components/BlogItemSkeleton.vue';
import IsLoginUser from '@/helper/CheckIsloginHelper';
import scrollToTop from "@/helper/ScrollToTopHelper";
import sessionExpired from '@/helper/SessionExpired';


export default {
  name: "BeritaListVue",
  props: ["query", "itemCount", "isHome"],
  data() {
    return {
      isLogin: IsLoginUser != null ? IsLoginUser.isLogin : false,
      beritaDatas: [],
      pages: 0,
      currentPage: 1,
      isItemHome: this.isHome,
      isLoading: false,
    };
  },
  methods: {
    truncate(str, n) {
      return (str.length > n) ? str.substr(0, n - 1) + '...' : str;
    },
    async loadData() {
      this.isLoading = true;
      BeritaService.getAll()
        .then((response) => {
          const keys = response.data.data;
          const sortKeys = BeritaService.sortByDate(keys);
          for (const key of keys) {
            key.tanggal_pembuatan = BeritaService.convertDate(key.tanggal_pembuatan)
          }
          for (const key of sortKeys) {
            key.tanggal_pembuatan = BeritaService.convertDate(key.tanggal_pembuatan)
          }
          if (this.itemCount > 0) {
            this.itemCount + 1;
            this.beritaDatas = keys.slice(0, this.itemCount);

          } else {

            this.beritaDatas = keys
          }
          this.pages = response.data.meta.last_page;
          this.isLoading = false;


        })
        .catch((e) => {
          console.log(e);
          if (e.response.status === 401) {
            sessionExpired();
          }
        });
    },
    async loadDataSearchData() {
      this.isLoading = true;
      BeritaService.search(this.query)
        .then((response) => {
          if (this.query) {
            const keys = response.data.data;
            const sortKeys = BeritaService.sortByDate(keys);
            for (const key of keys) {
              key.tanggal_pembuatan = BeritaService.convertDate(key.tanggal_pembuatan)
            }
            for (const key of sortKeys) {
              key.tanggal_pembuatan = BeritaService.convertDate(key.tanggal_pembuatan)
            }
            this.beritaDatas = keys
            this.isLoading = false;


          } else {
            this.loadData();
          }
        })
        .catch((e) => {
          console.log(e);
          if (e.response.status === 401) {
            sessionExpired();
          }
        });
    },

    loadDataPerpage(page) {
      this.currentPage = page;
      this.isLoading = true;

      BeritaService.getPerPage(page)
        .then((response) => {

          const keys = response.data.data;
          const sortKeys = BeritaService.sortByDate(keys);
          for (const key of keys) {
            key.tanggal_pembuatan = BeritaService.convertDate(key.tanggal_pembuatan)
          }
          for (const key of sortKeys) {
            key.tanggal_pembuatan = BeritaService.convertDate(key.tanggal_pembuatan)
          }
          this.beritaDatas = keys
          //scroll to top
          scrollToTop('blog-section')
          this.isLoading = false;

        })
        .catch((e) => {
          console.log(e);
          if (e.response.status === 401) {
            sessionExpired();
          }
        });
    },
    getBySlug(slug) {
      this.isShowForm = false;
      BeritaService.getBySlug(slug)
        .then((response) => {
          this.berita = response.data.data;
          this.isShowForm = true;
        })
        .catch((e) => {
          console.log(e);
          if (e.response.status === 401) {
            sessionExpired();
          }
        });
    },



  },
  mounted() {
    this.loadData();
  },
  components: { BlogItemSkeleton },
};
</script>