<template>
<AddBeritaForm :beritas="berita" v-if="isShowForm || isEdit" />
 <!-- blog section start -->
        <section class="blog-area section-padding">
            <div class="container">
                <div class="row mtn-40">
                    <div class="col-lg-3 order-2 blog-widget-wrapper">
                        <!-- widget item start -->
                        <div class="blog-widget mt-40">
                            <h4 class="blog-widget-title">Search</h4>
                            <form class="widget-search-form">
                                <input placeholder="Search keyword" type="text" class="search-field">
                                <button type="submit" class="search-btn"><i class="fa fa-search"></i></button>
                            </form>
                        </div>
                        <!-- widget item end -->


                        <!-- widget item start -->
                            <div class="blog-widget mt-40">
                                <h4 class="blog-widget-title">Recent Posts</h4>
                                <ul class="recent-posts-inner">
                                    <li class="recent-posts" v-for="key in recentBerita" :key="key.id">
                                        <div class="recent-posts-image">
                                             <router-link :to="'/Berita/'+ key.id">
                                                <img :src= "key.cover" alt="blog thumb">
                                            </router-link>
                                        </div>
                                        <div class="recent-posts-body">
                                            <span class="recent-posts-meta">{{key.tanggal_pembuatan}}</span>
                                            <h6 class="recent-posts-title"><router-link :to="'/Berita/'+ key.id">{{key.judul}}</router-link>
                                            </h6>
                                        </div>
                                    </li>
                                
                                </ul>
                            </div>
                        <!-- widget item end -->

                    </div>
                    <div class="col-lg-9 order-1 pr-lg-45">
                        <!-- blog single post start -->
                        <div class="blog-item mt-40">
                            <div class="blog-thumb">
                                <a href="blog-details.html">
                                    <img :src="berita.cover" alt="blog thumb">
                                </a>
                            </div>
                            <div class="blog-content blog-details">
                                <h3 class="blog-title">{{berita.judul}}</h3>
                                <div class="blog-meta">
                                    <a href="#">{{berita.tanggal_pembuatan}}</a>
                                </div>
                                <p>{{berita.content}}</p>
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


export default {
  name: "BeritaListVue",
  data() {
    return {
      isLogin: IsLoginUser != null ? IsLoginUser.isLogin : false,
      berita: {},
      recentBerita:[],
      isShowForm: false,
      isEdit: false,

    };
  },
  methods: {
    showAddForm() {
        this.isShowForm = true;
    },
    async loadData() {
      BeritaService.getAll()
        .then((response) => {
          const sortKeys = BeritaService.sortByDate(response.data.data);
          for(const key of sortKeys) {
            key.tanggal_pembuatan = BeritaService.convertDate(key.tanggal_pembuatan)
          }
          this.recentBerita = sortKeys.slice(0,4)
        })
        .catch((e) => {
          console.log(e);
        });
    },
    getById(id) {
      BeritaService.get(id)
        .then((response) => {
          this.berita = response.data.data;
          this.berita.tanggal_pembuatan = BeritaService.convertDate(this.berita.tanggal_pembuatan)
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
                this.$router.push({path:"/Berita"})
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
        if (toParams != previousParams){
          location.reload()
        }
      }
    )
  },
  mounted() {
    this.loadData();
    this.getById(this.$route.params.id);
  },
  components: { AddBeritaForm },
};
</script>