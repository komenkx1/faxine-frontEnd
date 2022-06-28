<template>
  <section class="form section-padding">
    <div class="container">
      <div class="row align-items-center">
        <div class="col-lg-12 order-2 order-lg-1">
          <div class="card">
            <form action="" class="p-4 p-md-5" style="margin:0;">
              <div class="form-group">
                <label for="">Judul Berita</label>
                <input :disabled="isLoading ? true : false" type="text" class="form-control"
                  placeholder="Masukkan Judul Berita" id="judul" required v-model="berita.judul" name="judul" />
              </div>
              <div class="form-group">
                <label for="">Content Berita</label>
                <editor api-key="xdw74o33z31pibmchix9b4rw8vmqy1jmea2ys7l4m7hovk5k" v-model="berita.content" toolbar="image italic link undo redo formatselect bold italic backcolor 
           alignleft aligncenter alignright alignjustify 
           bullist numlist outdent indent removeformat" plugins="image link" :disabled="isLoading ? true : false"
                  :initialValue="'test'"></editor>
              </div>
              <div class="form-group">
                <label for="">Cover</label>
                <input type="text" :disabled="isLoading ? true : false" class="form-control"
                  placeholder="Masukkan Url Gambar" id="cover" required v-model="berita.cover" name="cover" />
              </div>
              <button v-if="isEdit" @click="updateBerita" type="button" class="btn btn-primary">
                Update
              </button>
              <button v-else-if="!isEdit" @click="saveBerita" type="button" class="btn btn-success">
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
import BeritaService from "@/services/BeritaService";
import CustomAlert from "./CustomAlert.vue";
import AuthServices from "@/services/AuthServices";
import Editor from '@tinymce/tinymce-vue';

export default {
  name: "AddBeritaVue",
  props: ["beritas"],

  data() {
    return {
      berita: {
        judul: "",
        content: "",
        cover: "",
      },
      isEdit: false,
      id_user: 0,
      isLoading: false
    };
  },
  components: {
    'editor': Editor // <- Important part
  },
  methods: {
    saveBerita() {
      this.isLoading = true;
      var data = {
        id_user: this.id_user,
        judul: this.berita.judul,
        content: this.berita.content,
        cover: this.berita.cover,
      };
      BeritaService.create(data)
        .then(() => {
          CustomAlert.fire({
            icon: "success",
            title: "Data Berhasil Ditambahkan",
          });
          this.berita = {};
          this.isLoading = false;
          this.$emit("isShowForm", false);
          this.$parent.refeshDataList();

        })
        .catch(async (e) => {
          this.isLoading = false;
          if (e.response.data != null) {
            let errorValue = []
            let errorKey = []
            //convert error object value to array
            for (let i = 0; i < Object.keys(e.response.data).length; i++) {
              errorKey.push(Object.keys(e.response.data)[i])
              errorValue.push(Object.values(e.response.data[errorKey[i]]))
            }
            //itterate the error array to show the error message
            for (let i = 0; i < errorValue.length; i++) {
              await CustomAlert.fire({
                icon: "error",
                title: errorValue[i],
              });
            }
          } else {
            CustomAlert.fire({
              icon: "error",
              title:
                "Terdapat Field Yang Belum lengkap! Silahkan Lengkapi Field Yang Tersedia",
            });
          }
        });
    },
    updateBerita() {
      this.isLoading = true;
      BeritaService.update(this.berita.id, this.berita)
        .then(() => {
          CustomAlert.fire({
            icon: "success",
            title: "Data Berhasil Diperbarui",
          });
          this.berita = {};
          this.$router.push({ path: "/Berita" })
          this.isLoading = false;
        })
        .catch((e) => {
          this.isLoading = false;
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
    loadEditData() {
      this.berita = {
        id: this.beritas.id ?? null,
        judul: this.beritas.judul ?? "",
        slug: this.beritas.slug ?? "",
        content: this.beritas.content ?? "",
        cover: this.beritas.cover ?? "",
      };
    },
  },
  mounted() {
    AuthServices.profile().then((response) => {
      this.id_user = response.data.id
    }).catch((e) => {
      console.log(e);
    });
    this.loadEditData();
    if (this.berita.id != null) {
      this.isEdit = true;
    } else {
      this.isEdit = false;
    }

  },
};
</script>

