import { createApp } from 'vue'
import App from './App.vue'
import 'bootstrap-css-only/css/bootstrap.min.css'
import 'mdbvue/lib/css/mdb.min.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import router from './router'
import store from './store'
// import Clipboard from 'v-clipboard'

//Create application
const app = createApp(App)

//Init Plugins
//app.use(Clipboard)
app.use(router)
app.use(store)

store.dispatch('init_store');

// Mount the app
app.mount('#app');

