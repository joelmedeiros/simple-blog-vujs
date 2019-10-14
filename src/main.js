import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource'
import vuetify from './plugins/vuetify';


Vue.config.productionTip = false;
Vue.use(VueResource);
Vue.http.options.root = process.env.VUE_APP_ROOT_API;

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app');
