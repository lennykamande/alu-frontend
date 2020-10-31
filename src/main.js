import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'

import router from './router'
import store from './store'

axios.defaults.baseURL = 'http://127.0.0.1:5000'
axios.defaults.headers.get['Accept'] = 'application/json'   // default header for all get request
axios.defaults.headers.post['Accept'] = 'application/json'  // default header for all POST request
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
