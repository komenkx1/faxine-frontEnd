<template>
  <section class="form section-padding">
    <div class="container">
      <div class="row align-items-center">
        <div class="col-lg-5 order-2 order-lg-1">
          <div class="card">
            <form action="" class="p-3">
              <div class="form-group">
                <label for="">Nama</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Masukan Nama Anda"
                  id="nama_masyarakat"
                  required
                  v-model="lokasi.nama_masyarakat"
                  name="nama_masyarakat"
                />
              </div>
              <div class="form-group">
                <label for="">Lokasi Vaksin</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Masukan Lokasi Vaksinasi Belangsung"
                  id="alamat"
                  required
                  v-model="lokasi.alamat"
                  name="alamat"
                />
              </div>
              <div class="form-group">
                <label for="">Tanggal Mulai</label>
                <input
                  type="datetime-local"
                  class="form-control"
                  placeholder="Masukan Tnggal Dimulainya Vaksinasi"
                  id="tanggal_mulai"
                  required
                  v-model="lokasi.tanggal_mulai"
                  name="tanggal_mulai"
                />
              </div>
              <div class="form-group">
                <label for="">Tanggal Berakhir</label>
                <input
                  type="datetime-local"
                  class="form-control"
                  placeholder="Masukan Tanggal Berakhirnya Vaksinasi"
                  id="tanggal_berakhir"
                  required
                  v-model="lokasi.tanggal_berakhir"
                  name="tanggal_berakhir"
                />
              </div>
              <div class="form-group">
                <label for="">Kapasitas Vaksinasi</label>
                <input
                  type="number"
                  class="form-control"
                  placeholder="Masukan Kapasitas Vaksin Tersedia"
                  id="kapasitas"
                  required
                  v-model="lokasi.kapasitas"
                  name="kapasitas"
                />
              </div>
              <button
                v-if="isEdit"
                @click="updateLokasi"
                type="button"
                class="btn btn-primary"
              >
                Update
              </button>
              <button
                v-else-if="!isEdit"
                @click="saveLokasi"
                type="button"
                class="btn btn-success"
              >
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
        kapasitas: "",
      },
      isEdit: false,
    };
  },
  methods: {
    saveLokasi() {
      console.log(this.$parent);
      var data = {
        nama_masyarakat: this.lokasi.nama_masyarakat,
        alamat: this.lokasi.alamat,
        tanggal_mulai: this.lokasi.tanggal_mulai,
        tanggal_berakhir: this.lokasi.tanggal_berakhir,
        kapasitas: this.lokasi.kapasitas,
      };
      LokasiService.create(data)
        .then(() => {
          CustomAlert.fire({
            icon: "success",
            title: "Data Berhasil Ditambahkan",
          });
          this.lokasi = {};
          this.$parent.loadData();
        })
        .catch((e) => {
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
      LokasiService.update(this.lokasi.id, this.lokasi)
        .then(() => {
          CustomAlert.fire({
            icon: "success",
            title: "Data Berhasil Diperbarui",
          });
          this.lokasi = {};
          this.$parent.loadData();
          this.$parent.isShowForm = false;
          this.isEdit = false;

        })
        .catch((e) => {
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
