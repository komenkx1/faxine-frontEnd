<template>
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
              type="text"
              class="form-control form-control-lg"
              placeholder="masukkan email"
              id="email"
              required
              v-model="login.email"
              name="email"
              autofocus
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
              v-model="login.password"
              name="password"
            />
          </div>
          <div class="d-flex justify-content-center">
            <button
              @click="isLogin"
              type="button"
              class="btn btn-primary btn-lg p-2"
            >
              login
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
  name: 'FormLoginVue',
  data() {
    return {
      login: {
        email: '',
        password: '',
      },
      isEdit: false,
    };
  },
  methods: {
    isLogin() {
      var data = {
        email: this.login.email,
        password: this.login.password,
      };
      AuthServices.login(data)
        .then((response) => {
          AuthServices.setToken(response.data.access_token);
          CustomAlert.fire({
            icon: 'success',
            title: `Login Berhasil! `,
          });
          this.login = {};
          window.location.href = '/';
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
                'Login gagal, cek email dan password anda, jika masih ada kesalahan hubungi admin',
            });
          }
        });
    },
  },
  mounted() {
    this.isLogin;
  },
};
</script>
