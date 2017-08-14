

//app.js
import Vue from 'vue';
import VueMaterial from 'vue-material';

import { getWeb3 } from './web3-utils';

Vue.use(VueMaterial);

var App = new Vue({
  el: '#app',
  methods: {
    toggleLeftSidenav() {
      this.$refs.leftSidenav.toggle();
    },
    open(ref) {
      console.log('Opened: ' + ref);
    },
    close(ref) {
      console.log('Closed: ' + ref);
    }
  }
});




console.log('Ether Wish');

const APP = {};

console.log(getWeb3());
