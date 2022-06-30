
<template>

  <div class="container mb-5" id="lokasi-section">
    <div class="row">
      <div class="col-md-12">

        <div class="item-lokasi mt-4 ">
          <LokasiSkeleton v-if="isLoading" />
          <h3 class="text-center" v-else-if="lokasiDatas.length == 0">Data Tidak Ditemukan</h3>
          <div class="card mt-3" v-for="(lokasi) in lokasiDatas" :key="lokasi.id" v-else>
            <div class="card-body">
              <div class="container">
                <div class="row">
                  <div class="col-md-10">
                    <div class="lokasi-item" @click="redirectToLink(lokasi.link_google_map)" target="_blank">

                      <div class="d-flex align-items-center mt-2">
                        <i class="fa-solid fa-map-pin"></i>
                        <p class="ml-4 font-weight-bolder">{{ lokasi.alamat }}</p>
                      </div>
                      <div class="d-flex align-items-center mt-2">
                        <i class="fa-solid fa-clock"></i>
                        <p class="ml-3"> {{ lokasi.tanggal_mulai }} - {{ lokasi.tanggal_berakhir }}</p>
                      </div>
                      <div class="d-flex align-items-center mt-2">
                        <i class="fa-solid fa-syringe"></i>
                        <p class="ml-3"> {{ `${lokasi.kapasitas} Orang` }}</p>
                      </div>
                      <div class="d-flex align-items-center mt-2">
                        <i class="fa-solid fa-user"></i>
                        <p class="ml-3"> {{ lokasi.nama_masyarakat }}</p>
                      </div>

                    </div>
                  </div>
                  <div class="col-12 col-lg-1 col-md-2" v-if="isLogin && !isHome">
                    <hr class="d-md-none d-block">
                    <div class="action-button">
                      <button class="btn btn-success m-md-2 mt-2 w-100 p-2" @click="getById(lokasi.id)"><i
                          class="fa-solid fa-pen"></i></button>
                      <button class="btn btn-danger m-md-2 mt-2 w-100 p-2" @click="removeLokasi(lokasi.id)"><i
                          class="fa-solid fa-trash"></i></button>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="width-100 d-flex justify-content-center m-4" v-if="pageCount != currentPage && !isHome">
          <button @click="loadMore" class="btn btn-primary text-center">Load More</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LokasiService from '@/services/LokasiService';
import CustomAlert from './CustomAlert.vue';
import LokasiSkeleton from './LokasiSkeleton.vue';
import IsLoginUser from '@/helper/CheckIsloginHelper';
import sessionExpired from '@/helper/SessionExpired';


export default {
  name: 'LokasiListVue',
  props: ["query", "itemCount", "isHome"],
  data() {
    return {
      isLogin: IsLoginUser != null ? IsLoginUser.isLogin : false,
      lokasiDatas: [],
      isLoading: false,
      pageCount: 0,
      currentPage: 1,

    };
  },
  methods: {

    loadMore() {
      if (this.currentPage < this.pageCount) {
        this.isLoading = true;
        this.currentPage++;
        LokasiService.getPerPage(this.currentPage)
          .then((response) => {

            this.lokasiDatas = this.lokasiDatas.concat(response.data.data);
            this.isLoading = false;
          })

          .catch((e) => {
            this.isLoading = false;
            console.log(e);
            if (e.response.status === 401) {
              sessionExpired();
            }
          },
          )
      }
    },
    async loadData(page) {
      this.isLoading = true;
      LokasiService.getPerPage(page)
        .then((response) => {
          this.pageCount = response.data.meta.last_page;
          if (this.itemCount > 0) {
            this.itemCount + 1;
            this.lokasiDatas = response.data.data.slice(0, this.itemCount)
          } else {
            this.lokasiDatas = response.data.data
          }
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
      LokasiService.search(this.query)
        .then((response) => {
          if (this.query) {

            this.lokasiDatas = response.data.data
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
    getById(id) {
      this.$emit('isShowForm', false);
      LokasiService.get(id)
        .then((response) => {
          this.$emit('lokasis', response.data.data);
          this.$emit('isShowForm', true);
        })
        .catch((e) => {
          console.log(e);
          if (e.response.status === 401) {
            sessionExpired();
          }
        });
    },

    removeLokasi(id) {
      this.$swal
        .fire({
          title: 'Apakah anda yakin?',
          text: 'Anda tidak dapat mengembalikan data yang sudah terhapus!',
          icon: 'warning',
          buttons: true,
          showConfirmButton: true,
          showCancelButton: true,
          dangerMode: true,
        })
        .then((result) => {
          if (result.isConfirmed) {
            LokasiService.delete(id)
              .then((response) => {
                CustomAlert.fire({
                  icon: 'warning',
                  title: response.data.message,
                });
          this.$emit('isShowForm', false);
                this.loadData();
              })
              .catch((e) => {
                console.log(e);
              });
          }
        })
        .catch((e) => {
          console.log(e);
          if (e.response.status === 401) {
            sessionExpired();
          }
        });
    },
    async redirectToLink(link) {
      if (link) {
        return window.open(link, '_blank');
      }
      return CustomAlert.fire({
        icon: 'warning',
        title: 'Link Tidak Ditemukan',
      });
    },
  },
  mounted() {

    this.loadData(this.currentPage);
  },
  components: { LokasiSkeleton },
};
</script>
