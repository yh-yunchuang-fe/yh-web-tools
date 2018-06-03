import Vue from 'vue'
import App from './App.vue'
import './assets/css/index.less'

window.onload = function () {
    new Vue({
        el: '#root',
        render: h => h(App)
    })
};
