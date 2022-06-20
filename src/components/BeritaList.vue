<template>
  <AddBeritaForm :beritas="berita" v-if="isShowForm || isEdit" />

  <div class="container mb-5">
    <div class="row">
      <div class="col-md-12">
        <div class=" d-flex">
          <h4 class="w-100 card-title">Berita</h4>

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
                  <form class="widget-search-form">
                    <input placeholder="Search keyword" type="text" class="search-field" v-model="search">
                    <button type="button" @click="loadDataSearchData(search)" class="search-btn"><i
                        class="fa fa-search"></i></button>
                  </form>
                </div>
                <!-- widget item end -->

                <!-- widget item start -->
                <div class="blog-widget mt-40">
                  <h4 class="blog-widget-title">Recent Posts</h4>
                  <ul class="recent-posts-inner">
                    <BlogRecentSkeleton v-if="isLoading" />

                    <li class="recent-posts" v-for="berita in recentBerita" :key="berita.id">
                      <div class="recent-posts-image">
                        <router-link :to="'/Berita/' + berita.slug">
                          <img :src="berita.cover" alt="blog thumb">
                        </router-link>
                      </div>
                      <div class="recent-posts-body">
                        <span class="recent-posts-meta">{{ berita.tanggal_pembuatan }}</span>
                        <h6 class="recent-posts-title">
                          <router-link :to="'/Berita/' + berita.slug">{{ berita.judul }}</router-link>
                        </h6>
                      </div>
                    </li>
                  </ul>
                </div>
                <!-- widget item end -->

              </div>
              <div class="col-lg-9 order-1 order-lg-2 pl-lg-45 ">
                <div class="row" id="blog-section">

                  <BlogItemSkeleton v-if="isLoading" />
                  <!-- blog single post start -->
                  <div class="col-md-6" v-for="berita in beritaDatas" :key="berita.id" v-else>
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
                  <div class="col-12">
                    <div class="paginatoin-area text-center mt-40">
                      <ul class="pagination-box">

                        <li :class="currentPage == page ? 'active' : ''" v-for="page in pages" v-bind:key="page"><a
                            href="javascript:void(0)" @click="loadDataPerpage(page)">{{ page }}</a></li>


                      </ul>
                    </div>
                  </div>
                  <!-- end pagination area -->
                </div>
              </div>
            </div>
          </div>
        </section>
        <!-- blog section end -->
      </div>
    </div>
  </div>
</template>

<script>
import BeritaService from '@/services/BeritaService';
import AddBeritaForm from '@/components/AddBeritaForm.vue';
import BlogItemSkeleton from '@/components/BlogItemSkeleton.vue';
import BlogRecentSkeleton from '@/components/BlogRecentSkeleton.vue';
import IsLoginUser from '@/helper/CheckIsloginHelper';



export default {
  name: "BeritaListVue",
  data() {
    return {
      isLogin: IsLoginUser != null ? IsLoginUser.isLogin : false,
      beritaDatas: [],
      pages: 0,
      berita: {},
      recentBerita: [],
      isShowForm: false,
      isEdit: false,
      currentPage: 1,
      isLoading: false,
      search: "",
    };
  },
  methods: {
    showAddForm() {
      if (this.isShowForm) {
        this.isShowForm = false;
      } else {
        this.berita = {};
        this.isShowForm = true;
      }
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
          this.beritaDatas = keys
          this.recentBerita = sortKeys.slice(0, 4)
          this.pages = response.data.meta.last_page;
          this.isLoading = false;


        })
        .catch((e) => {
          console.log(e);
        });
    },
    async loadDataSearchData() {
      this.isLoading = true;
      BeritaService.search(this.search)
        .then((response) => {
          if (this.search) {
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
    // console.log(this.currentPage);
    this.loadData();
  },
  components: { AddBeritaForm, BlogItemSkeleton, BlogRecentSkeleton },
};
</script>