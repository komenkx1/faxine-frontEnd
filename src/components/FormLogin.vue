<template>
  <section class="form section-padding">
    <div class="container">
      <div class="row align-items-center">
        <div class="col-lg-5 order-2 order-lg-1">
          <div class="card">
            <form action="" class="p-3">
              <div class="form-group">
                <label for="">Email</label>
                <input type="text" class="form-control" placeholder="Masukan Email Anda" id="email" required
                  v-model="login.email" name="email" />
              </div>
              <div class="form-group">
                <label for="">Password</label>
                <input type="text" class="form-control" placeholder="Masukan Password" id="password" required
                  v-model="login.password" name="password" />
              </div>
              <button @click="isLogin" type="button" class="btn btn-primary">
                login
              </button>
            </form>
          </div>
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
          window.location.href = '/'
        })
        .catch((e) => {
          if (e.response.data.message != null) {
            CustomAlert.fire({
              icon: 'error',
              title: e.response.data.message,
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
