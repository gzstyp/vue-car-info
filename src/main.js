import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import axios from 'axios';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false;
//这个axios比较特殊,不能像element-ui那样使用Vue.use(ElementUI)哦!!!调用方式是 this.$axios.post(); | this.$axios.get();当然了,你要是不想用它$axios作为变量名你可以取成$xxx也行啦
Vue.prototype.$axios = axios;
Vue.use(ElementUI);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
