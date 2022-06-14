<template>
  <section class="form section-padding">
    <div class="container">
      <div class="row align-items-center">
        <div class="col-lg-5 order-2 order-lg-1">
          <div class="card">
            <form action="" class="p-3">
              <div class="form-group">
                <label for="">Email</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Masukan Email Anda"
                  id="email"
                  required
                  v-model="register.email"
                  name="email"
                />
              </div>
              <div class="form-group">
                <label for="">Nama</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Masukan name"
                  id="name"
                  required
                  v-model="register.name"
                  name="name"
                />
              </div>
              <div class="form-group">
                <label for="">No HP</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Masukan No HP"
                  id="no_hp"
                  required
                  v-model="register.no_hp"
                  name="no_hp"
                />
              </div>
              <div class="form-group">
                <label for="">Password</label>
                <input
                  type="password"
                  class="form-control"
                  placeholder="Masukan Password"
                  id="password"
                  required
                  v-model="register.password"
                  name="password"
                />
              </div>
              <button @click="isRegister" type="button" class="btn btn-primary">
                register
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
