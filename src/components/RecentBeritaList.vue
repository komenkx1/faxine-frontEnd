<template>
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
</template>

<script>

import BlogRecentSkeleton from '@/components/BlogRecentSkeleton.vue';
import BeritaService from '@/services/BeritaService';
import sessionExpired from '@/helper/SessionExpired';

// import { Swal } from "sweetalert2/dist/sweetalert2";

export default {
    name: 'RecentBeritaVue',
  data() {
    return {
      recentBerita: [],
      isLoading: false,
    };
  },
    components: {BlogRecentSkeleton},

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
          this.recentBerita = sortKeys.slice(0, 4)
          this.isLoading = false;


        })
        .catch((e) => {
            this.isLoading = false;
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
};
</script>