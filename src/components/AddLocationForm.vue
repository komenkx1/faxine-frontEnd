<template>
  <section class="form section-padding">
    <div class="container">
      <div class="row align-items-center">
        <div class="col-lg-12 order-2 order-lg-1">
          <div class="card">
            <form action="" class="p-4 p-md-5">
              <div class="form-group">
                <label for="">Nama <small class="text-danger">*</small></label>
                <input type="text" :disabled="isLoadingform ? true : false" class="form-control"
                  placeholder="Masukan Nama Anda" id="nama_masyarakat" required v-model="lokasi.nama_masyarakat"
                  name="nama_masyarakat" />
              </div>
              <div class="form-group">
                <label for="">Lokasi Vaksin <small class="text-danger">*</small></label>
                <input type="text" :disabled="isLoadingform ? true : false" class="form-control"
                  placeholder="Masukan Lokasi Vaksinasi Belangsung" id="alamat" required v-model="lokasi.alamat"
                  name="alamat" />
              </div>
                <div class="form-group">
                <label for="">Link Google Map Lokasi</label>
                <input type="text" :disabled="isLoadingform ? true : false" class="form-control"
                  placeholder="Masukan Google Map Lokasi Vaksinasi Belangsung" id="alamat" required v-model="lokasi.link_google_map"
                  name="link_google_map" />
              </div>
              <div class="form-group">
                <label for="">Tanggal Mulai <small class="text-danger">*</small></label>
                <input type="datetime-local" :disabled="isLoadingform ? true : false" class="form-control"
                  placeholder="Masukan Tnggal Dimulainya Vaksinasi" id="tanggal_mulai" required
                  v-model="lokasi.tanggal_mulai" name="tanggal_mulai" />
              </div>
              <div class="form-group">
                <label for="">Tanggal Berakhir <small class="text-danger">*</small></label>
                <input type="datetime-local" :disabled="isLoadingform ? true : false" class="form-control"
                  placeholder="Masukan Tanggal Berakhirnya Vaksinasi" id="tanggal_berakhir" required
                  v-model="lokasi.tanggal_berakhir" name="tanggal_berakhir" />
              </div>
              <div class="form-group">
                <label for="">Kapasitas Vaksinasi <small class="text-danger">*</small></label>
                <input type="number" :disabled="isLoadingform ? true : false" class="form-control"
                  placeholder="Masukan Kapasitas Vaksin Tersedia" id="kapasitas" required v-model="lokasi.kapasitas"
                  name="kapasitas" />
              </div>
              <button v-if="isEdit" @click="updateLokasi" type="button" class="btn btn-primary">
                Update
              </button>
              <button v-else-if="!isEdit" @click="saveLokasi" type="button" class="btn btn-success p-2">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import LokasiService from "@/services/LokasiService";
import moment from "moment";
import CustomAlert from "./CustomAlert.vue";
export default {
  name: "AddLocationVue",
  props: ["lokasis"],

  data() {
    return {
      lokasi: {
        id: null,
        nama_masyarakat: "",
        alamat: "",
        tanggal_mulai: "",
        tanggal_berakhir: "",
        link_google_map:"",
        kapasitas: "",
      },
      isEdit: false,
      isLoadingform: false
    };
  },
  methods: {
    saveLokasi() {
      var data = {
        nama_masyarakat: this.lokasi.nama_masyarakat,
        alamat: this.lokasi.alamat,
        tanggal_mulai: this.lokasi.tanggal_mulai,
        tanggal_berakhir: this.lokasi.tanggal_berakhir,
        kapasitas: this.lokasi.kapasitas,
        link_google_map: this.lokasi.link_google_map,
      };
      this.isLoadingform = true;
      LokasiService.create(data)
        .then(() => {
          CustomAlert.fire({
            icon: "success",
            title: "Data Berhasil Ditambahkan",
          });
          this.isLoadingform = false;
          this.lokasi = {};
          this.$parent.refeshDataList();

        })
        .catch((e) => {
          this.isLoadingform = false;

          if (e.code === 'ERR_NETWORK') {
            return CustomAlert.fire({
              icon: "error",
              title:
                "Koneksi Internet Tidak Tersedia!",
            });
          }
          if (e.response.data.message != null) {
            CustomAlert.fire({
              icon: "error",
              title: e.response.data.message,
            });
          } else {
            CustomAlert.fire({
              icon: "error",
              title:
                "Terdapat Field Yang Belum lengkap! Silahkan Lengkapi Field Yang Tersedia",
            });
          }


        });
    },

    updateLokasi() {
      this.isLoadingform = true;
      LokasiService.update(this.lokasi.id, this.lokasi)
        .then(() => {
          CustomAlert.fire({
            icon: "success",
            title: "Data Berhasil Diperbarui",
          });
          this.lokasi = {};
          this.isLoadingform = false;
          this.$parent.refeshDataList();
          this.$parent.isShowForm = false;
          this.isEdit = false;

        })
        .catch((e) => {
          this.isLoadingform = false;
          if (e.code === 'ERR_NETWORK') {
            return CustomAlert.fire({
              icon: "error",
              title:
                "Koneksi Internet Tidak Tersedia!",
            });
          }
          if (e.response.data.message != null) {
            CustomAlert.fire({
              icon: "error",
              title: e.response.data.message,
            });
          } else {
            CustomAlert.fire({
              icon: "error",
              title:
                "Terdapat Field Yang Belum lengkap! Silahkan Lengkapi Field Yang Tersedia",
            });
          }

        });
    },
    formatDate(date) {
      return moment(date).format('YYYY-MM-DDTHH:mm');
    },
    loadEditData() {
      this.lokasi = {
        id: this.lokasis.id ?? null,
        nama_masyarakat: this.lokasis.nama_masyarakat ?? "",
        alamat: this.lokasis.alamat ?? "",
        tanggal_mulai: this.formatDate(this.lokasis.tanggal_mulai) ?? "",
        tanggal_berakhir: this.formatDate(this.lokasis.tanggal_berakhir) ?? "",
        kapasitas: this.lokasis.kapasitas ?? "",
      };
    },
  },

  mounted() {
    this.loadEditData();
    if (this.lokasi.id != null) {
      this.isEdit = true;
    } else {
      this.isEdit = false;
    }

  },
};
</script>
