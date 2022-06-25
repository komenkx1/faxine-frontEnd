import { createApp } from 'vue';
import App from './App.vue';
import './assets/css/styles.scss';
import router from './router';
import { library } from '@fortawesome/fontawesome-svg-core';
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css' // import styles
import 'quill/dist/quill.snow.css' // for snow theme
import 'quill/dist/quill.bubble.css' // for bubble theme

/* import specific icons */
import { faTwitter } from '@fortawesome/free-brands-svg-icons';

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import './registerServiceWorker';

/* add icons to the library */
library.add(faTwitter);

createApp(App)
  .use(router)
  .use(VueSweetalert2)
  .use(VueQuillEditor)
  .component('font-awesome-icon', FontAwesomeIcon)
  .mount('#app');
