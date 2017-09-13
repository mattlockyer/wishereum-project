

import template from '../templates/wish-template.js';

export default {
  
  data() {
    return {
      wishes: {}
    };
  },
  
  
  created() {
    this.$parent.$off('update');
    this.$parent.$on('update', () => {
      localforage.getItem('wishereum-wishes').then((wishes) => {
        this.wishes = wishes || {};
        this.update();
      });
    });
  },
  
  methods: {
    //jshint ignore:start
    async update() {
      //get wishes
      const totalWishes = (await APP.contract.totalWishes.call()).toNumber();
      //loop through and fetch each wish from the blockchain, if we don't already have it stored locally
      for (let i = totalWishes - 1; i >= 0; i--) {
        if (this.wishes[i] === undefined) {
          console.log('fetching wish', i);
          const wish = await APP.contract.wishes.call(i);
          //convert contribution to ether amount
          wish[1] = web3.fromWei(wish[1], 'ether').toNumber();
          this.wishes[i] = wish;
        } else {
          console.log('local wish', i);
        }
      }
      localforage.setItem('wishereum-wishes', this.wishes).then(() => {
        console.log('stored wishes locally');
      });
      this.$forceUpdate();
    }
    //jshint ignore:end
  },
  
  template
};