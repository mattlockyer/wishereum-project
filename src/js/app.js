

//app.js
import VueMaterial from 'vue-material';
import router from './router';
import Theme from './theme';

import utils from './web3-utils';

import wishJSON from '../../build/contracts/Wish.json';
//import deployer from './tests/deploy-wish';

Vue.use(VueRouter);
Vue.use(VueMaterial);
Theme.init();

const APP = window.APP = {
  network: {
    id: 4,
    name: 'rinkeby',
    url: 'https://rinkeby.infura.io/'
  },
  contractAddress: '0x6fD022CfF6d7512B6E662014662DCd467BBA9BcA'
};

console.log(router);

const VueApp = new Vue({
  el: '#app',
  router,
  data: {
    menu: router.options.routes
  },
  created() {
    setTimeout(() => this.init(), 500);
  },
  mounted() {
    this.$refs.loader.classList.add('hidden');
    this.$refs.content.classList.remove('hidden');
  },
  methods: {
    //jshint ignore:start
    async init() {
      console.log('init');
      
      const ethInfo = fetch('https://coinmarketcap-nexuist.rhcloud.com/api/eth').then((res) => res.json());
      
      utils.getWeb3(APP.network.url);
      //get network
      const network = await utils.getNetwork();
      if (network.id !== 4) {
        console.log('MetaMask: wrong network');
        utils.setWeb3(APP.network.url);
        this.noAccount();
      }
      try {
        APP.accounts = await utils.getAccounts();
      } catch(e) {
        APP.accounts = ['0x'];
        this.noAccount();
      }
      //check user
      let user = APP.user = await localforage.getItem('wishereum-user');
      if (user !== APP.accounts[0]) {
        console.log('user changed');
        user = APP.user = APP.accounts[0];
        await localforage.setItem('wishereum-user', user);
        await localforage.setItem('wishereum-userwishes', {});
      }
      
      APP.contract = await utils.getContract(wishJSON, APP.contractAddress);
      
      //window.deployWish = () => deployer.deploy(wishJSON, APP.accounts[0], 4000000);
      
      this.$emit('update');
      APP.ethusd = (await ethInfo).price.usd;
      this.$emit('updateCost');
      
      APP.initialized = true;
    },
    //jshint ignore:end
    noAccount() {
      this.menu[1].visible = false;
      this.menu[2].visible = false;
    },
    update() {
      this.$emit('update');
      this.$emit('updateCost');
    },
    updateRoute() {
      this.update();
      setTimeout(() => this.$refs.leftSidenav.close(), 150);
    },
    toggleLeftSidenav() {
      this.$refs.leftSidenav.toggle();
    },
  }
});