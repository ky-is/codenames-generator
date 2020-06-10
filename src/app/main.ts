import Vue from 'vue'
import App from './App.vue'

import store from '@/helpers/store'

import './registerServiceWorker'

Vue.config.productionTip = false

new Vue({
	data: store,
	render: h => h(App),
}).$mount('#app')
