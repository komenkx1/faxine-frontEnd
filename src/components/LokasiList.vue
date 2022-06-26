
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
                    <a class="lokasi-item" href="#" @click="redirectToLink(lokasi.link_google_map)" target="_blank">

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

                    </a>
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
      </div>
    </div>
  </div>
</template>

<script>
import LokasiService from '@/services/LokasiService';
import CustomAlert from './CustomAlert.vue';
import LokasiSkeleton from './LokasiSkeleton.vue';
import IsLoginUser from '@/helper/CheckIsloginHelper';


export default {
  name: 'LokasiListVue',
  props: ["query", "itemCount", "isHome"],
  data() {
    return {
      isLogin: IsLoginUser != null ? IsLoginUser.isLogin : false,
      lokasiDatas: [],
      isLoading: false,

    };
  },
  methods: {

    async loadData() {
      this.isLoading = true;
      LokasiService.getAll()
        .then((response) => {
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
                this.loadData();
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

    this.loadData();
  },
  components: { LokasiSkeleton },
};
</script>
