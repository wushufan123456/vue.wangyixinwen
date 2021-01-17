import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import axios from 'axios' 

axios.defaults.baseURL = 'https://api.apiopen.top/getWangYiNews'
axios.interceptors.request.use(config=>{
  console.log(config);
  return config;
})
Vue.prototype.$http= axios
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
