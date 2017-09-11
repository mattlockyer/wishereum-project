

//app.js
import VueMaterial from 'vue-material';
import { router } from './router';
import Theme from './theme';

import { getWeb3, getNetwork, getAccounts, getContract } from './web3-utils';
import wishJSON from '../../build/contracts/Wish.json';
//import deployer from './tests/deploy-wish';

const network = {
  4: '0x6fD022CfF6d7512B6E662014662DCd467BBA9BcA'
};

Vue.use(VueRouter);
Vue.use(VueMaterial);

Theme.init();

const APP = window.APP = {};
//jshint ignore:start
APP.init = async() => {
  getWeb3();
  APP.accounts = await getAccounts();
  APP.network = await getNetwork();
  APP.contract = getContract(wishJSON, network[APP.network.id]);
  //window.deployWish = () => deployer.deploy(wishJSON, APP.accounts[0], 4000000);
};
//jshint ignore:end

const VueApp = new Vue({
  el: '#app',
  router,
  data: {
    menu: []
  },
  created() {
    setTimeout(() => APP.init(), 500);
  },
  methods: {
    closeNav() {
      setTimeout(() => this.$refs.leftSidenav.close(), 100);
    },
    toggleLeftSidenav() {
      this.$refs.leftSidenav.toggle();
    },
  }
});

