

import template from '../templates/wish-template.js';

export default {
  
  data() {
    return {
      wishes: {}
    };
  },
  
  created() {
    this.$parent.$on('finished', () => {
      localforage.getItem('wishereum-userwishes').then((wishes) => {
        this.wishes = wishes || {};
        this.update();
      });
    });
  },
  
  methods: {
    update() {
      let attempts = 0;
      const limit = 10;
      //jshint ignore:start
      const check = async() => {
        attempts++;
        const contract = APP.contract;
        if (!contract) {
          if (attempts === limit) return;
          console.log('checking again');
          setTimeout(check, 500);
          return;
        }
        
        const wishes = this.wishes;
        //go fetch remote wishes
        const indicies = await contract.getIndicies.call();
        //loop each user indicies
        for (let k in indicies) {
          const i = indicies[k].toNumber();
          //if we don't have the wish, fetch it remotely
          if (this.wishes[i] === undefined) {
            console.log('fetching wish', i);
            const wish = await contract.wishes.call(i);
            //convert contribution to ether amount
            wish[1] = web3.fromWei(wish[1], 'ether').toNumber();
            this.wishes[i] = wish;
          } else {
            console.log('local wish', i);
          }
        }
        
        localforage.setItem('wishereum-userwishes', this.wishes).then(() => {
          console.log('stored wishes locally');
        });
        this.$forceUpdate();
        
      };
      //jshint ignore:end
      check();
    }
  },
  
  template
};