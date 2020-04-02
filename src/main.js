import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import styles from './styles/styles.scss'

// Globals components
import AlertCmp from './components/Share/Alert.vue'

Vue.config.productionTip = false

Vue.component('app-alert', AlertCmp)

new Vue({
  router,
  store,
  vuetify,
  styles,
  render: h => h(App)
}).$mount('#app')
