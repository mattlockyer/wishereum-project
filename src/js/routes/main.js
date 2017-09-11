

export default {
  
  data() {
    return {
      wish: 'Test Wish ' + Date.now(),
      amount: 0.001,
    };
  },
  
  methods: {
    submit() {
      //jshint ignore:start
      (async() => {
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
      })();
      //jshint ignore:end
    }
  },
  
  template: `
    <div class="margin-16">
      <md-layout md-align="center" :md-gutter="true">
      
        <md-layout md-flex="35" md-flex-xsmall="80">
        
          <div>
            <md-image md-src="/img/well.jpg"></md-image>
          </div>
        
          <form novalidate @submit.stop.prevent="submit" class="width-100 center">
          
            <md-input-container md-theme="second">
              <label>Wish</label>
              <md-input v-model="wish" type="text" placeholder="Wish"></md-input>
            </md-input-container>
            
            <md-input-container md-theme="second">
              <label>Amount (ETH)</label>
              <md-input v-model="amount" type="number" step="0.001" placeholder="0.001"></md-input>
            </md-input-container>
            
            <md-button v-on:click="submit">Make Wish</md-button>
            
          </form>
          
        </md-layout>
        
      </md-layout>
    </div>
  `
};