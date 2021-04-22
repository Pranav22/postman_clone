import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import App from './App.vue'
import VueAlertify from "vue-alertify"

Vue.use(BootstrapVue)
Vue.use(VueAlertify)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
