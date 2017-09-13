

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
      const { id } = this.$route.params;
      
      if (this.wishes[id] === undefined) {
        console.log('fetching wish', id);
        const wish = await APP.contract.wishes.call(id);
        //convert contribution to ether amount
        wish[1] = web3.fromWei(wish[1], 'ether').toNumber();
        this.wishes[id] = wish;
      } else {
        console.log('local wish', id);
      }
      localforage.setItem('wishereum-wishes', this.wishes).then(() => {
        console.log('stored wishes locally');
      });
      this.wishes = {
        id: this.wishes[id]
      };
      this.$forceUpdate();
    }
    //jshint ignore:end
  },
  
  template
};