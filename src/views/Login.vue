<template>
  <div>
    <main>
      <br>
      <!-- Login -->
      <FormLoginVue />
      <!-- End Login -->
    </main>
  </div>
</template>
<script>
import FormLoginVue from '@/components/FormLogin.vue';
import CustomAlert from '@/components/CustomAlert.vue';
export default {
  name: 'LoginVue',
  components: {
    FormLoginVue,
  },
  methods: {
    async showAlert() {
      // Use sweetalert2
      CustomAlert.fire({
        icon: 'success',
        title: 'Success',
      });
    },
  },
  mounted() {

  },
};
</script>
