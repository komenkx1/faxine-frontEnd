<template>
  <div id="form-add-berita">

    <AddBeritaForm :beritas="berita" v-if="isShowForm || isEdit" />
  </div>
  <!-- blog section start -->
  <section class="blog-area section-padding">
    <div class="container">
      <div class="row mtn-40">
        <div class="col-lg-3 order-2 blog-widget-wrapper">
          <!-- widget item start -->
          <div class="blog-widget mt-40">
            <h4 class="blog-widget-title">Recent Posts</h4>
            <ul class="recent-posts-inner">
              <BlogRecentSkeleton v-if="isLoading" />
              <li class="recent-posts" v-for="key in recentBerita" :key="key.id" v-else>
                <div class="recent-posts-image">
                  <router-link :to="'/Berita/' + key.slug">
                    <img :src="key.cover" alt="blog thumb">
                  </router-link>
                </div>
                <div class="recent-posts-body">
                  <span class="recent-posts-meta">{{ key.tanggal_pembuatan }}</span>
                  <h6 class="recent-posts-title">
                    <router-link :to="'/Berita/' + key.slug">{{ key.judul }}</router-link>
                  </h6>
                </div>
              </li>

            </ul>
          </div>
          <!-- widget item end -->
        </div>
        <div class="col-lg-9 order-1 pr-lg-45">
          <!-- item skeleton -->
          <div class="blog-item mt-40" v-if="isLoading">
            <div class="blog-thumb blog-thumb-detail-skeleton">
            </div>
            <div class="blog-content blog-details">
              <h3 class="blog-title blog-title-skeleton"></h3>
              <div class="blog-meta meta-blog-skeleton mb-3">
              </div>
              <p class="desc-blog-skeleton"></p>
            </div>
          </div>
          <!-- item -->
          <div class="blog-item mt-40" v-else>
            <div class="blog-thumb">
                <img :src="berita.cover" alt="blog thumb">
            </div>
            <div class="blog-content blog-details">
              <h3 class="blog-title">{{ berita.judul }}</h3>
              <div class="blog-meta">
                <a href="#">{{ berita.tanggal_pembuatan }}</a>
              </div>
              <p>{{ berita.content }}</p>
            </div>
            <div class="mt-3" v-if="isLogin">
              <button class="btn btn-success mr-2" @click="showAddForm()">
                Edit
              </button>
              <button class="btn btn-danger" @click="removeBerita(berita.id)">
                Remove
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- blog single post start -->


  <!-- Scroll to top start -->
  <div class="scroll-top not-visible">
    <i class="fa fa-angle-up"></i>
  </div>
  <!-- Scroll to Top End -->
</template>

<script>
import BeritaService from '@/services/BeritaService';
import AddBeritaForm from './AddBeritaForm.vue';
import IsLoginUser from '@/helper/CheckIsloginHelper';
import BlogRecentSkeleton from '@/components/BlogRecentSkeleton.vue';


export default {
  name: "BeritaListVue",
  data() {
    return {
      isLogin: IsLoginUser != null ? IsLoginUser.isLogin : false,
      berita: {},
      recentBerita: [],
      isShowForm: false,
      isEdit: false,
      isLoading: false,

    };
  },
  methods: {
    showAddForm() {
      this.isShowForm = true;
      //scroll to top
      var element = document.getElementById('form-add-berita');
      var headerOffset = 45;
      var elementPosition = element.getBoundingClientRect().top;
      var offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    },
    async loadData() {
      this.isLoading = true;
      BeritaService.getAll()
        .then((response) => {
          const sortKeys = BeritaService.sortByDate(response.data.data);
          for (const key of sortKeys) {
            key.tanggal_pembuatan = BeritaService.convertDate(key.tanggal_pembuatan)
          }
          this.recentBerita = sortKeys.slice(0, 4)
          this.isLoading = false;

        })
        .catch((e) => {
          console.log(e);
        });
    },
    getBySlug(slug) {
      this.isLoading = true;
      BeritaService.getBySlug(slug)
        .then((response) => {
          this.berita = response.data.data;
          this.berita.tanggal_pembuatan = BeritaService.convertDate(this.berita.tanggal_pembuatan);
          this.isLoading = false;

        })
        .catch((e) => {
          console.log(e);
        });
    },
    removeBerita(id) {
      this.$swal
        .fire({
          title: "Apakah anda yakin?",
          text: "Anda tidak dapat mengembalikan data yang sudah terhapus!",
          icon: "warning",
          buttons: true,
          showConfirmButton: true,
          showCancelButton: true,
          dangerMode: true,
        })
        .then((result) => {
          if (result.isConfirmed) {
            BeritaService.delete(id)
              .then(() => {
                this.$router.push({ path: "/Berita" })
              })
              .catch((e) => {
                console.log(e);
              });
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  created() {
    this.$watch(
      () => this.$route.params,
      (toParams, previousParams) => {
        if (toParams != previousParams) {
          location.reload()
        }
      }
    )
  },
  mounted() {
    this.loadData();
    this.getBySlug(this.$route.params.id);
  },
  components: { AddBeritaForm, BlogRecentSkeleton },
};
</script>