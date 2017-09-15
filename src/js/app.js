

//app.js
import router from './router';
import Theme from './theme';

import utils from './web3-utils';

import wishJSON from '../../build/contracts/Wish.json';
import deployer from './tests/deploy-wish';

Vue.use(VueRouter);
Vue.use(VueMaterial);

Theme.init();

const APP = window.APP = {
  connectedNetwork: null,
  messages: {
    connect: 'Please connect to the Rinkeby network using MetaMask, Parity, Mist or another DApp browser.'
  },
  network: {
    id: 4,
    name: 'rinkeby',
    url: 'https://rinkeby.infura.io/'
  },
  contractAddress: '0x66F5495e8e26Bb525A8CdAe9099d076326b966C3'
};

const VueApp = new Vue({
  el: '#app',
  router,
  data: {
    router,
    menu: router.options.routes,
    snackbarMessage: 'message'
  },
  watch: {
    $route: function() {
      this.update();
    }
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
      const network = APP.connectedNetwork = await utils.getNetwork();
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
      
      //if we need to deploy again
      window.deployWish = () => deployer.deploy(wishJSON, APP.accounts[0], 4000000);
      
      //check user
      let user = APP.user = await localforage.getItem('wishereum-user');
      if (user !== APP.accounts[0]) {
        console.log('user changed');
        user = APP.user = APP.accounts[0];
        await localforage.setItem('wishereum-user', user);
        await localforage.setItem('wishereum-userwishes', {});
      }
      
      APP.contract = await utils.getContract(wishJSON, APP.contractAddress);
      
      this.$emit('update');
      APP.ethusd = (await ethInfo).price.usd;
      this.$emit('updateCost');
      
      APP.initialized = true;
    },
    //jshint ignore:end
    snackMessage(msg) {
      this.snackbarMessage = msg;
      if (!this.$refs.snackbar.active) this.$refs.snackbar.open();
    },
    noAccount() {
      APP.offchain = true;
      console.log('OFF CHAIN');
      this.menu.find(m => m.path === '/wish').visible = false;
      this.menu.find(m => m.path === '/userwishes').visible = false;
      this.snackMessage(APP.messages.connect);
    },
    update() {
      this.$emit('update');
      this.$emit('updateCost');
    },
    updateRoute() {
      this.update();
      setTimeout(() => this.$refs.leftSidenav.close(), 150);
      if (APP.offchain) this.snackMessage(APP.messages.connect);
    },
    toggleLeftSidenav() {
      this.$refs.leftSidenav.toggle();
    },
  }
});
