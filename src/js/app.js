

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
    update() {
      this.$emit('update');
    },
    updateRoute() {
      this.update();
      setTimeout(() => this.$refs.leftSidenav.close(), 100);
    },
    toggleLeftSidenav() {
      this.$refs.leftSidenav.toggle();
    },
  }
});

//jshint ignore:start
APP.init = async() => {
  const ethInfo = fetch('https://coinmarketcap-nexuist.rhcloud.com/api/eth').then((res) => res.json());
  
  getWeb3();
  APP.accounts = await getAccounts();
  //check user
  let user = APP.user = await localforage.getItem('wishereum-user');
  if (user !== APP.accounts[0]) {
    console.log('user changed');
    user = APP.user = APP.accounts[0];
    await localforage.setItem('wishereum-user', user);
    await localforage.setItem('wishereum-userwishes', {});
  }
  //get network
  APP.network = await getNetwork();
  APP.contract = await getContract(wishJSON, network[APP.network.id]);
  //window.deployWish = () => deployer.deploy(wishJSON, APP.accounts[0], 4000000);
  
  VueApp.update();
  
  APP.ethusd = (await ethInfo).price.usd;
  
  VueApp.$emit('updateMain');
};
//jshint ignore:end
