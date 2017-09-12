

export default {
  
  data() {
    return {
      wishes: {}
    };
  },
  
  created() {
    this.update();
  },
  
  methods: {
    update() {
      localforage.getItem('wishereum-wishes').then((wishes) => {
        this.wishes = wishes || {};
        this.fetch();
      });
    },
    fetch() {
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
        //get wishes
        const totalWishes = (await contract.totalWishes.call()).toNumber();
        //loop through and fetch each wish from the blockchain, if we don't already have it stored locally
        for (let i = totalWishes - 1; i >= 0; i--) {
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
        localforage.setItem('wishereum-wishes', this.wishes).then(() => {
          console.log('stored wishes locally');
        });
        this.$forceUpdate();
      };
      //jshint ignore:end
      check();
    }
  },
  
  template: `
    <div class="page">
      <md-layout md-align="center" :md-gutter="true">
      
        <md-layout md-flex="35" md-flex-xsmall="80" md-align="center">
        
          <div>
            <md-image md-src="/img/well.jpg"></md-image>
          </div>
      
          
          <md-whiteframe md-elevation="1" v-for="(wish, key) in wishes" class="whiteframe">
            <div class="wish">{{ wish[0] }}</div>
            <div class="amount">{{ wish[1] }} ETH</div>
            <div class="address">From: {{ wish[2] }}</div>
          </md-whiteframe>
          
        </md-layout>
      </md-layout>
    </div>
  `
};