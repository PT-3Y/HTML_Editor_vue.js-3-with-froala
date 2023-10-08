
//Import Froala Editor 

import App from './App.vue'
import { createApp } from 'vue'
import VueFroala from 'vue-froala-wysiwyg';
import './assets/oak-form.css';

const app = createApp(App);   

app.use(VueFroala);
app.mount('#app');

