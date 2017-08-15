

//app.js
import Vue from 'vue';
import VueMaterial from 'vue-material';
import { getWeb3, getContract } from './web3-utils';
import Wish from '../../build/contracts/Wish.json';

Vue.use(VueMaterial);

const App = {};

const VueApp = new Vue({
  el: '#app',
  data: {
    menu: []
  },
  methods: {
    init() {
      App.web3 = getWeb3();
      getContract(Wish).then((wish) => {
        App.contract = wish;
        // Object.keys(wish).forEach((k) => {
        //   if (typeof wish[k] === 'function') this.menu.push({ title: k });
        // });
      });
    },
    callFunc(fn) {
      App.contract[fn].call().then((res) => {
        console.log(res);
      });
    },
    toggleLeftSidenav() {
      this.$refs.leftSidenav.toggle();
    },
  }
});

window.onload = () => VueApp.init();
