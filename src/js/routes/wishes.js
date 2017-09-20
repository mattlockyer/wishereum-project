

import template from '../templates/wish-template.js';

export default {
  
  data() {
    return {
      wishesObject: {},
      wishes: []
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
        this.wishesObject = wishes || {};
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
        if (this.wishesObject[i] === undefined) {
          console.log('fetching wish', i);
          const wish = await APP.contract.wishes.call(i);
          //convert contribution to ether amount
          wish[1] = web3.fromWei(wish[1], 'ether').toNumber();
          this.wishesObject[i] = wish;
          this.refresh();
        } else {
          //console.log('local wish', i);
        }
      }
      //store wishes as object
      localforage.setItem('wishereum-wishes', this.wishesObject).then(() => {
        console.log('stored wishes locally');
      });
      
      //create display array of wishes object
      this.wishes = Object.keys(this.wishesObject).map((k) => {
        const arr = this.wishesObject[k];
        arr[3] = k;
        return arr;
      }).sort((a, b) => b[1] - a[1]);
      
      console.log(this.wishes);
      
      this.refresh();
      
    }
    //jshint ignore:end
  },
  
  template
};