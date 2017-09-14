

import template from '../templates/wish-template.js';

export default {
  
  data() {
    return {
      wishes: {}
    };
  },
  
  
  created() {
    if (APP.initialized) this.load();
    else {
      this.$parent.$off('update');
      this.$parent.$on('update', this.load);
    }
  },
  
  methods: {
    load() {
      localforage.getItem('wishereum-wishes').then((wishes) => {
        this.wishes = wishes || {};
        this.update();
      });
    },
    refresh() {
      this.$forceUpdate();
    },
    //jshint ignore:start
    async update() {
      //get wishes
      const totalWishes = (await APP.contract.totalWishes.call()).toNumber();
      //loop through and fetch each wish from the blockchain, if we don't already have it stored locally
      for (let i = 0; i < totalWishes; i++) {
        if (this.wishes[i] === undefined) {
          console.log('fetching wish', i);
          const wish = await APP.contract.wishes.call(i);
          //convert contribution to ether amount
          wish[1] = web3.fromWei(wish[1], 'ether').toNumber();
          this.wishes[i] = wish;
          this.refresh();
        } else {
          //console.log('local wish', i);
        }
      }
      localforage.setItem('wishereum-wishes', this.wishes).then(() => {
        console.log('stored wishes locally');
      });
      this.refresh();
      
    }
    //jshint ignore:end
  },
  
  template
};