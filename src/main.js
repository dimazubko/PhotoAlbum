import Vue from 'vue'
import App from './App.vue'
import _router from './router.js'

Vue.config.productionTip = false

new Vue(
  {
    router: _router,
    render: h => h(App),
  }
).$mount('#app')


