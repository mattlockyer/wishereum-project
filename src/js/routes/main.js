

export default {
  
  data() {
    return {
      wish: '',
      amount: 0.001,
      estimate: 0,
      costETH: 0,
      costUSD: 0
    };
  },
  
  created() {
    this.$parent.$off('updateCost');
    this.$parent.$on('updateCost', () => this.updateCost(''));
  },
  
  methods: {
    updateCost(value) {
      setTimeout(() => {
        const amount = parseFloat(this.$refs.amount.value);
        //get the estimated gas usage
        this.estimate = 150000 + value.length * 64 + Math.floor(value.length / 32) * 20000;
        //generate the cost in eth
        const cost = amount + web3.fromWei(this.estimate, 'gwei') * 21;
        //outputs
        this.costETH = cost.toFixed(3);
        this.costUSD = (cost * APP.ethusd).toFixed(2);
      }, 50);
    },
    //jshint ignore:start
    async submit() {
      try {
        const tx = await APP.contract.makeWish(this.wish, {
          from: APP.accounts[0],
          value: web3.toWei(this.amount, 'ether'),
          gas: 250000
        });
        console.log(tx);
      } catch (e) {
        console.log('user rejected or error', e);
      }
    }
    //jshint ignore:end
  },
  
  template: `
    <div class="page">
      <md-layout md-align="center" :md-gutter="true">
      
        <md-layout md-flex="35" md-flex-xsmall="80" md-align="center">
        
          <div>
            <md-image md-src="/img/well.jpg"></md-image>
          </div>
        
          <form novalidate @submit.stop.prevent="submit" class="width-100 center">
          
            <md-input-container md-theme="second">
              <label>Wish</label>
              <md-textarea v-model="wish" v-on:change="updateCost" type="text" placeholder="Wish"></md-textarea>
            </md-input-container>
            
            <md-input-container md-theme="second">
              <label>Amount (ETH)</label>
              <md-input ref="amount" v-model="amount" v-on:change="updateCost" type="number" step="0.001" placeholder="0.001"></md-input>
            </md-input-container>
            
            <md-button v-on:click="submit">Make Wish</md-button>
            
            <md-layout md-align="center">
              <md-layout md-flex="25">
                <div class="amount">Ξ{{ costETH }} ETH</div>
              </md-layout>
              <md-layout md-flex="25">
                <div class="amount">\${{ costUSD }} USD</div>
              </md-layout>
              <md-layout md-flex="50">
                <div class="amount">{{ estimate }} * 21 gwei</div>
              </md-layout>
            </md-layout>
            
            
          </form>
          
        </md-layout>
        
      </md-layout>
    </div>
  `
};