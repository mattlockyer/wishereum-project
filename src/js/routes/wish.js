

import template from '../templates/wish-template.js';

export default {
  
  data() {
    return {
      wishes: {}
    };
  },
  
  watch: {
    '$route.params.id': function() { this.load(); }
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
    //jshint ignore:start
    async update() {
      const { id } = this.$route.params;
      if (!id) return;
      
      //pending wish
      if (id === 'pending') {
        //with no promise pending, push them back
        if (!APP.wishPromise) {
          this.$parent.router.push('/');
          return;
        }
        //set wishes to pending
        this.wishes = {
          'pending': [
            'Wish Pending',
            'pending',
            APP.accounts[0]
          ]
        };
        this.$forceUpdate();
        //wait for the response from truffle-contract
        const res = await APP.wishPromise;
        console.log(res);
        APP.wishPromise = null;
        //get totalWishes
        const lastWish = (await APP.contract.totalWishes.call()).toNumber();
        //get block number of transaction
        const block = res.receipt.blockNumber;
        console.log('transaction block', block);
        //check block
        const check = () => {
          web3.eth.getBlockNumber((err, res) => {
            console.log('latest block', res);
            if (res > block) {
              this.$parent.router.push('/wish/' + (lastWish - 1));
              return;
            }
            setTimeout(check, 5000);
          });
        }
        check();
        return;
      }
      
      //regular wish viewing
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
        [id]: this.wishes[id]
      };
      this.$forceUpdate();
    }
    //jshint ignore:end
  },
  
  template
};