import { createApp } from 'vue'
import App from './App.vue'
import router from './router.js'


import '../node_modules/bootstrap/dist/css/bootstrap.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle'
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'
import '@vuepic/vue-datepicker/dist/main.css'

import DatePicker from '@vuepic/vue-datepicker';
import LoadingSpinner from './components/ui/LoadingSpinner.vue'

const app = createApp(App)

app.component('date-picker', DatePicker);
app.component('loading-spinner', LoadingSpinner);
app.use(router)
app.mount('#app')
