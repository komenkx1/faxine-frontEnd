<template>
  <div id="app">
    <navbar-vue />
    <router-view />
    <footer-vue />
  </div>
</template>

<script>
import NavbarVue from './components/Navbar.vue'
import FooterVue from './components/Footer.vue'

export default {
  name: 'App',
  components: {
    NavbarVue,
    FooterVue,
  },
  
}
</script>


