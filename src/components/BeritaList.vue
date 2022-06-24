<template>

  <div class="row" id="blog-section">

    <BlogItemSkeleton v-if="isLoading" />
    <!-- blog single post start -->
    <div :class="isHome ? 'col-md-3' : 'col-md-6'" v-for="berita in beritaDatas" :key="berita.id" v-else>
      <div class="blog-item mt-40">
        <div class="blog-thumb">
          <router-link :to="'/Berita/' + berita.slug">
            <img :src="berita.cover" alt="blog thumb">
          </router-link>
        </div>
        <div class="blog-content">
          <h3 class="blog-title">
            <router-link :to="'/Berita/' + berita.slug">{{ berita.judul }}</router-link>
          </h3>
          <p>{{ berita.content }}</p>
          <div class="blog-meta">
            <router-link :to="'/Berita/' + berita.slug">{{ berita.tanggal_pembuatan }}</router-link>
          </div>
        </div>
      </div>
    </div>
    <!-- blog single post start -->

    <!-- start pagination area -->
    <div :class="isHome ? 'col-12  d-none' : 'col-12'">
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
          var element = document.getElementById('blog-section');
          var headerOffset = 45;
          var elementPosition = element.getBoundingClientRect().top;
          var offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
          });
          this.isLoading = false;

        })
        .catch((e) => {
          console.log(e);
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
        });
    },



  },
  mounted() {
    
    console.log(this.isItemHome);
    this.loadData();
  },
  components: { BlogItemSkeleton },
};
</script>