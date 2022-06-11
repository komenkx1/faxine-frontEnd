import { createApp } from 'vue';
import App from './App.vue';
import 'bootstrap/dist/css/bootstrap.css';
import router from './router';
import { library } from '@fortawesome/fontawesome-svg-core';
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

/* import specific icons */
import { faTwitter } from '@fortawesome/free-brands-svg-icons';

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

/* add icons to the library */
library.add(faTwitter);

createApp(App)
  .use(router)
  .use(VueSweetalert2)
  .component('font-awesome-icon', FontAwesomeIcon)
  .mount('#app');
