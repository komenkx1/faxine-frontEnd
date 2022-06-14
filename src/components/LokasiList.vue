<template>
  <AddLocationForm :lokasis="lokasi" v-if="isShowForm || isEdit" />

  <div class="container mb-5">
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-header d-flex">
            <h4 class="w-100 card-title">Lokasi Vaksin</h4>
            <button
              class="w-25 btn btn-primary"
              v-if="!isShowForm"
              @click="showAddForm"
            >
              Buat Informasi Baru
            </button>
            <button class="w-25 btn btn-danger" v-else @click="showAddForm">
              Tutup Form
            </button>
          </div>
          <div class="card-body">
            <div class="table-responsive">
              <table class="table">
                <thead class="text-body">
                  <th>No</th>
                  <th>Lokasi Vaksin</th>
                  <th>Tanggal Mulai</th>
                  <th v-if="isLogin">Action</th>
                </thead>
                <tbody>
                  <tr v-for="(lokasi, index) in lokasiDatas" :key="lokasi.id">
                    <td>
                      {{ index + 1 }}
                    </td>

                    <td>
                      {{ lokasi.alamat }}
                    </td>
                    <td>
                      {{ lokasi.tanggal_mulai }}
                    </td>
                    <td v-if="isLogin">
                      <button
                        class="btn btn-success"
                        @click="getById(lokasi.id)"
                      >
                        Edit
                      </button>
                      <button
                        class="btn btn-danger"
                        @click="removeLokasi(lokasi.id)"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
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
import IsLoginUser from '@/helper/CheckIsloginHelper';

export default {
  name: 'LokasiListVue',
  data() {
    return {
      isLogin: IsLoginUser != null ? IsLoginUser.isLogin : false,
      lokasiDatas: [],
      lokasi: {},
      isShowForm: false,
      isEdit: false,
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
      LokasiService.getAll()
        .then((response) => {
          this.lokasiDatas = response.data.data;
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
  components: { AddLocationForm },
};
</script>
