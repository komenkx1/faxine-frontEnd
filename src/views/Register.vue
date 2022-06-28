<template>
  <div>
    <main>
      <!-- breadcrumb section start -->
    
      <!-- breadcrumb section end -->

      <!-- Register -->
      <FormRegister />
      <!-- End Register -->
    </main>
  </div>
</template>
<script>
import FormRegister from '@/components/FormRegister.vue';
import CustomAlert from '@/components/CustomAlert.vue';
export default {
  name: 'LoginVue',
  components: {
    FormRegister,
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
    this.showAlert();
  },
};
</script>
