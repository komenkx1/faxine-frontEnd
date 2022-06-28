<template>
<br>
  <section class="form section-padding mt-5">
    <div class="container">
      <div class="row">
        <div class="col-lg-12 d-flex justify-content-center">
          <form
            action=""
            class="border border-success p-3 w-100 rounded-lg"
          >
            <div class="form-group">
              <label class="sr-only" for="email">Email</label>
              <input
                type="email"
                class="form-control form-control-lg"
                placeholder="masukkan email"
                id="email"
                required
                v-model="register.email"
                name="email"
              />
            </div>
            <div class="form-group">
              <label class="sr-only" for="name">Nama</label>
              <input
                type="text"
                class="form-control form-control-lg"
                placeholder="masukkan nama"
                id="name"
                required
                v-model="register.name"
                name="name"
              />
            </div>
            <div class="form-group">
              <label class="sr-only" for="no_hp">No HP</label>
              <input
                type="number"
                class="form-control form-control-lg"
                placeholder="masukan no hp"
                id="no_hp"
                required
                v-model="register.no_hp"
                name="no_hp"
              />
            </div>
            <div class="form-group">
              <label class="sr-only" for="password">Password</label>
              <input
                type="password"
                class="form-control form-control-lg"
                placeholder="masukkan password"
                id="password"
                required
                v-model="register.password"
                name="password"
              />
            </div>
            <div class="d-flex justify-content-center">
              <button
                @click="isRegister"
                type="button"
                class="btn btn-primary btn-lg p-2"
              >
                register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import AuthServices from '@/services/AuthServices';
import CustomAlert from './CustomAlert.vue';

export default {
  name: 'FormRegisterVue',
  data() {
    return {
      register: {
        email: '',
        password: '',
        name: '',
        no_hp: '',
      },
      isEdit: false,
    };
  },
  methods: {
    isRegister() {
      var data = {
        email: this.register.email,
        password: this.register.password,
        name: this.register.name,
        no_hp: this.register.no_hp,
      };
      AuthServices.register(data)
        .then((response) => {
          //   AuthServices.setToken(response.data.access_token);
          //   console.log(response);
          if (response.status == 'error') {
            CustomAlert.fire({
              title: 'Error',
              text: response.message,
              icon: 'error',
              showConfirmButton: false,
              timer: 1500,
            });
          }
          CustomAlert.fire({
            title: 'Success',
            text: 'Register Success',
            icon: 'success',
            showConfirmButton: false,
            timer: 1500,
          });
          this.register = {};
          this.$router.push('/login');
          //   window.location.href = '/login';
        })
        .catch((e) => {
          console.log(e);
          if (e.response.data != null) {
            CustomAlert.fire({
              icon: 'error',
              title: e.response.data,
            });
          } else {
            CustomAlert.fire({
              icon: 'error',
              title:
                'register gagal, cek data - data anda, jika masih ada kesalahan hubungi admin',
            });
          }
        });
    },
  },
  mounted() {
    this.isRegister;
  },
};
</script>
