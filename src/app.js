import Vue from 'vue';
import App from './App.vue'
import store from './store'
import * as filters from './filters'

Object.keys(filters).forEach(key => { 
  Vue.filter(key, filters[key]);
});

const app = new Vue({
  store,
  ...App
});

export { app, store }