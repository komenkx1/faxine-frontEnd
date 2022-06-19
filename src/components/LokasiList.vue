
<template>
  <AddLocationForm :lokasis="lokasi" v-if="isShowForm || isEdit" />

  <div class="container mb-5">
    <div class="row">
      <div class="col-md-12">
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
              <input type="text" class="w-100 form-control" placeholder="cari lokasi" v-model="search"
                @keyup="loadDataSearchData">
            </div>
            </div>
          </div>
        </div>
        <div class="item-lokasi mt-4 ">
          <LokasiSkeleton v-if="isLoading" />
          <div class="card mt-3" v-for="(lokasi) in lokasiDatas" :key="lokasi.id" v-else>
            <div class="card-body">
              <div class="container">
                <div class="row">
                  <div class="col-md-10">
                    <div class="d-flex align-items-center mt-2">
                      <i class="fa-solid fa-map-pin"></i>
                      <p class="ml-4 font-weight-bolder">{{ lokasi.alamat }}</p>
                    </div>
                    <div class="d-flex align-items-center mt-2">
                      <i class="fa-solid fa-clock"></i>
                      <p class="ml-3"> {{ lokasi.tanggal_mulai }} - {{ lokasi.tanggal_berakhir }}</p>
                    </div>
                    <div class="d-flex align-items-center mt-2">
                      <i class="fa-solid fa-user"></i>
                      <p class="ml-3"> {{ lokasi.nama_masyarakat }}</p>
                    </div>

                  </div>
                  <div class="col-12 col-lg-1 col-md-2" v-if="isLogin">
                    <hr class="d-md-none d-block">
                    <div class="action-button">
                      <button class="btn btn-success m-md-2 mt-2 w-100" @click="getById(lokasi.id)"><i
                          class="fa-solid fa-pen"></i></button>
                      <button class="btn btn-danger m-md-2 mt-2 w-100" @click="removeLokasi(lokasi.id)"><i
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
import AddLocationForm from '@/components/AddLocationForm.vue';
import CustomAlert from './CustomAlert.vue';
import LokasiSkeleton from './LokasiSkeleton.vue';
import IsLoginUser from '@/helper/CheckIsloginHelper';
undefined

export default {
  name: 'LokasiListVue',
  data() {
    return {
      isLogin: IsLoginUser != null ? IsLoginUser.isLogin : false,
      lokasiDatas: [],
      lokasi: {},
      isShowForm: false,
      isEdit: false,
      search: "",
      isLoading: false,
    };
  },
  methods: {
    showAddForm() {
      if (this.isShowForm) {
        this.isShowForm = false;
      } else {
        this.lokasi = {};
        this.isShowForm = true;
      }
    },

    async loadData() {
      this.isLoading = true;
      LokasiService.getAll()
        .then((response) => {
          this.lokasiDatas = response.data.data;
          this.isLoading = false;
        })
        .catch((e) => {
          console.log(e);
        });
    },

    async loadDataSearchData() {
      this.isLoading = true;
      LokasiService.search(this.search)
        .then((response) => {
          if (this.search) {

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
      this.isShowForm = false;
      LokasiService.get(id)
        .then((response) => {
          this.lokasi = response.data.data;
          this.isShowForm = true;
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
  },
  mounted() {
    this.loadData();
  },
  components: { AddLocationForm, LokasiSkeleton },
};
</script>
